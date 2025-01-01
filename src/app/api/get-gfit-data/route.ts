import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import prisma from "@/lib/prismaClient";
import { z } from "zod";

interface GoogleTokenResponse {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
}

// Constants
const GOOGLE_FITNESS_API =
    "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate";
const GOOGLE_TOKEN_API = "https://oauth2.googleapis.com/token";
const DAY_IN_MS = 86400000;

// Input validation schema
const requestSchema = z.object({
    email: z.string().email("Invalid email format"),
    accessToken: z.string().optional(),
    accessTokenExpiry: z.number().optional(),
});

async function getGoogleAccessToken(refreshToken: string): Promise<string> {
    try {
        const response = await axios.post<GoogleTokenResponse>(
            GOOGLE_TOKEN_API,
            {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                refresh_token: refreshToken,
                grant_type: "refresh_token",
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        return response.data.access_token;
    } catch (error) {
        console.error("Failed to refresh Google access token:", error);
        throw new Error("Failed to refresh Google access token");
    }
}

async function fetchFitnessData(
    accessToken: string,
    startTime: number
): Promise<any> {
    const requestBody = {
        aggregateBy: [
            { dataTypeName: "com.google.step_count.delta" }, // Steps
            { dataTypeName: "com.google.calories.expended" }, // Calories
            { dataTypeName: "com.google.sleep.segment" }, // Sleep
            { dataTypeName: "com.google.heart_rate.bpm" }, // Heart rate
        ],
        bucketByTime: { durationMillis: DAY_IN_MS },
        startTimeMillis: startTime,
        endTimeMillis: Date.now(),
    };

    try {
        const response = await axios.post<any>(
            GOOGLE_FITNESS_API,
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Failed to fetch fitness data:", error);
        throw new Error("Failed to fetch fitness data from Google");
    }
}

function processData(response: any): any {
    if (!response?.bucket) {
        console.warn("Unexpected response structure:", response);
        return [];
    }

    const steps = response.bucket[0]?.dataset[0]?.point[0]?.value[0]?.intVal;
    const calories = response.bucket[0]?.dataset[1]?.point[0]?.value[0]?.fpVal;
    const sleepData =
        response.bucket[0]?.dataset[2]?.point[0]?.value[0]?.intVal;
    const heartRateArray = response.bucket[0]?.dataset[3]?.point[0]?.value;
    const averageHeartRate =
        heartRateArray.reduce((sum: any, obj: any) => sum + obj?.fpVal, 0) /
        heartRateArray.length;

    const dataToSend = {
        steps,
        calories,
        sleepData,
        // heartRateArray, Didnt feel to include this 
        averageHeartRate,
    };

    return dataToSend;
}

function getStartOfDay(): number {
    const now = new Date();
    const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
    );
    return startOfDay.getTime();
}

export async function POST(req: NextRequest) {
    try {
        // Validate request body
        const body = await req.json();
        const { email, accessToken, accessTokenExpiry } =
            requestSchema.parse(body);

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
            select: { refreshToken: true },
        });

        if (!user?.refreshToken) {
            return NextResponse.json(
                { message: "User has not signed up with Google" },
                { status: 401 }
            );
        }

        let fitnessResponse;
        if (accessTokenExpiry! > Date.now()) {
            const startTime = getStartOfDay();
            fitnessResponse = await fetchFitnessData(
                accessToken as string,
                startTime
            );
            // Process the response
            const processedData = processData(fitnessResponse);
            return NextResponse.json(
                {
                    success: true,
                    data: processedData,
                    accessToken,
                    accessTokenExpiry,
                },
                { status: 200 }
            );
        } else {
            // Get new access token
            const accessTokenReceivedFromGoogle = await getGoogleAccessToken(
                user.refreshToken
            );
            const accessTokenExpiryNew = new Date().getTime() + 3600 * 1000;

            const startTime = getStartOfDay();
            fitnessResponse = await fetchFitnessData(
                accessTokenReceivedFromGoogle,
                startTime
            );

            // Process the response
            const processedData = processData(fitnessResponse);

            return NextResponse.json(
                {
                    success: true,
                    data: processedData,
                    accessTokenReceivedFromGoogle,
                    accessTokenExpiryNew,
                },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error("Error in POST handler:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid request data",
                    details: error.errors,
                },
                { status: 400 }
            );
        }

        if (error instanceof AxiosError) {
            const status = error.response?.status || 500;
            return NextResponse.json(
                {
                    success: false,
                    error: "External API error",
                    message: error.message,
                    details: error.response?.data,
                },
                { status }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: "Internal server error",
                message:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
