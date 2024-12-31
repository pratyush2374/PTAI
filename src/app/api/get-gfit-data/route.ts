import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import prisma from "@/lib/prismaClient";
import { z } from "zod";

// Type definitions
interface StepValue {
    intVal: number;
}

interface FitnessDataPoint {
    startTimeMillis: string;
    endTimeMillis: string;
    value: StepValue[];
}

interface FitnessDataset {
    dataSourceId: string;
    point: FitnessDataPoint[];
}

interface FitnessBucket {
    startTimeMillis: string;
    endTimeMillis: string;
    dataset: FitnessDataset[];
}

interface FitnessResponse {
    data: {
        bucket: FitnessBucket[];
    };
}

interface GoogleTokenResponse {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
}

interface ProcessedStepData {
    startTime: Date;
    endTime: Date;
    steps: number;
    hasData: boolean;
}

// Constants
const GOOGLE_FITNESS_API =
    "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate";
const GOOGLE_TOKEN_API = "https://oauth2.googleapis.com/token";
const DAY_IN_MS = 86400000;

// Input validation schema
const requestSchema = z.object({
    email: z.string().email("Invalid email format"),
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
): Promise<FitnessResponse> {
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
        const response = await axios.post<FitnessResponse>(
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

function processStepsData(response: FitnessResponse): ProcessedStepData[] {
    if (!response?.data?.bucket) {
        console.warn("Unexpected response structure:", response);
        return [];
    }

    return response.data.bucket.map((bucket) => {
        if (!bucket.dataset || bucket.dataset.length === 0) {
            return {
                startTime: new Date(parseInt(bucket.startTimeMillis)),
                endTime: new Date(parseInt(bucket.endTimeMillis)),
                steps: 0,
                hasData: false,
            };
        }

        const dataset = bucket.dataset[0];
        let totalSteps = 0;

        if (dataset.point && dataset.point.length > 0) {
            totalSteps = dataset.point.reduce((sum, point) => {
                if (point.value && point.value.length > 0) {
                    return sum + (point.value[0]?.intVal || 0);
                }
                return sum;
            }, 0);
        }

        return {
            startTime: new Date(parseInt(bucket.startTimeMillis)),
            endTime: new Date(parseInt(bucket.endTimeMillis)),
            steps: totalSteps,
            hasData: dataset.point.length > 0,
        };
    });
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
        const { email } = requestSchema.parse(body);

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

        // Get new access token
        const accessToken = await getGoogleAccessToken(user.refreshToken);

        const startTime = getStartOfDay();
        const fitnessResponse = await fetchFitnessData(accessToken, startTime);

        // Process the response
        const processedData = processStepsData(fitnessResponse);

        return NextResponse.json(
            {
                success: true,
                data: processedData,
                raw: fitnessResponse, // Include raw data for debugging
            },
            { status: 200 }
        );
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
