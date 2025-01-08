import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import prisma from "@/lib/prismaClient";
import { z } from "zod";
import { getToken } from "next-auth/jwt";

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

interface BloodGlucoseReading {
    glucoseLevel: number;
    timestamp: string;
}

interface DailyBloodGlucose {
    date: string;
    readings: BloodGlucoseReading[];
    averageGlucose: number;
    minGlucose: number;
    maxGlucose: number;
    readingCount: number;
}

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
    } catch (error: any) {
        console.error("Failed to refresh Google access token:", error.message);
        throw new Error("Failed to refresh Google access token");
    }
}

async function fetchBloodGlucoseData(
    accessToken: string,
    startTime: number,
    endTime: number
): Promise<any> {
    const requestBody = {
        aggregateBy: [{ dataTypeName: "com.google.blood_glucose" }],
        bucketByTime: { durationMillis: DAY_IN_MS },
        startTimeMillis: startTime,
        endTimeMillis: endTime,
    };

    try {
        const response = await axios.post(GOOGLE_FITNESS_API, requestBody, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch blood glucose data:", error.message);
        throw new Error("Failed to fetch blood glucose data from Google");
    }
}

function processBloodGlucoseData(response: any): DailyBloodGlucose[] {
    if (!response?.bucket) {
        console.warn("Unexpected response structure:", response);
        return [];
    }

    return response.bucket.map((bucket: any) => {
        const readings: BloodGlucoseReading[] = [];
        const glucoseReadings: number[] = [];

        // Process each reading in the bucket
        bucket.dataset[0]?.point?.forEach((point: any) => {
            const values = point.value;
            
            if (values && values.length > 0) {
                const glucoseLevel = values[0]?.fpVal ?? 0;
                
                // Only add valid readings
                if (glucoseLevel > 0) {
                    const timestamp = new Date(
                        parseInt(point.startTimeNanos) / 1000000
                    ).toISOString();

                    readings.push({
                        glucoseLevel,
                        timestamp,
                    });

                    glucoseReadings.push(glucoseLevel);
                }
            }
        });

        // Calculate statistics only if we have valid readings
        const readingCount = readings.length;
        const averageGlucose = readingCount > 0
            ? Math.round(glucoseReadings.reduce((a, b) => a + b, 0) / readingCount)
            : 0;

        return {
            date: new Date(parseInt(bucket.startTimeMillis))
                .toISOString()
                .split("T")[0],
            readings,
            averageGlucose,
            minGlucose: readingCount > 0 ? Math.min(...glucoseReadings) : null,
            maxGlucose: readingCount > 0 ? Math.max(...glucoseReadings) : null,
            readingCount
        };
    });
}

function getStartOfFifteenDaysAgo(): number {
    const date = new Date();
    date.setDate(date.getDate() - 14); // Go back 14 days to get 15 days of data
    date.setHours(0, 0, 0, 0);
    return date.getTime();
}

function getEndOfToday(): number {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date.getTime();
}

export async function POST(req: NextRequest) {
    try {
        const { accessToken, accessTokenExpiry } = await req.json();
        const token = await getToken({ req });
        const email = token?.email;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized: Please log in" },
                { status: 401 }
            );
        }

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

        let bloodGlucoseData;
        const startTime = getStartOfFifteenDaysAgo();
        const endTime = getEndOfToday();

        if (accessTokenExpiry! > Date.now()) {
            console.log("Using existing access token");
            bloodGlucoseData = await fetchBloodGlucoseData(
                accessToken as string,
                startTime,
                endTime
            );
        } else {
            console.log("Getting new access token and then getting data");
            const accessTokenReceivedFromGoogle = await getGoogleAccessToken(
                user.refreshToken
            );
            const accessTokenExpiryNew = new Date().getTime() + 3600 * 1000;

            bloodGlucoseData = await fetchBloodGlucoseData(
                accessTokenReceivedFromGoogle,
                startTime,
                endTime
            );
            
            return NextResponse.json(
                {
                    success: true,
                    data: processBloodGlucoseData(bloodGlucoseData),
                    metadata: {
                        startDate: new Date(startTime).toISOString(),
                        endDate: new Date(endTime).toISOString(),
                        totalDays: 15,
                    },
                    accessToken: accessTokenReceivedFromGoogle,
                    accessTokenExpiry: accessTokenExpiryNew,
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: processBloodGlucoseData(bloodGlucoseData),
                metadata: {
                    startDate: new Date(startTime).toISOString(),
                    endDate: new Date(endTime).toISOString(),
                    totalDays: 15,
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error in POST handler:", error.message);

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