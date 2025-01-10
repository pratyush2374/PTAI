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
const GOOGLE_FITNESS_API = "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate";
const GOOGLE_TOKEN_API = "https://oauth2.googleapis.com/token";
const DAY_IN_MS = 86400000;

interface SleepSegment {
    startTime: string;
    endTime: string;
    duration: number; // in minutes
    sleepStage: string;
}

interface DailySleep {
    date: string;
    segments: SleepSegment[];
    totalSleepTime: number; // in minutes
    deepSleepTime: number;
    lightSleepTime: number;
    remSleepTime: number;
    awakeTime: number;
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

async function fetchSleepData(
    accessToken: string,
    startTime: number,
    endTime: number
): Promise<any> {
    const requestBody = {
        aggregateBy: [
            { dataTypeName: "com.google.sleep.segment" }
        ],
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
        console.error("Failed to fetch sleep data:", error.message);
        throw new Error("Failed to fetch sleep data from Google");
    }
}

function getSleepStage(value: number): string {
    // Sleep stages according to Google Fit API
    switch (value) {
        case 1:
            return "AWAKE";
        case 2:
            return "SLEEP_LIGHT";
        case 3:
            return "SLEEP_DEEP";
        case 4:
            return "SLEEP_REM";
        default:
            return "UNKNOWN";
    }
}

function processSleepData(response: any): DailySleep[] {
    if (!response?.bucket) {
        console.warn("Unexpected response structure:", response);
        return [];
    }

    return response.bucket.map((bucket: any) => {
        const segments: SleepSegment[] = [];
        let deepSleepTime = 0;
        let lightSleepTime = 0;
        let remSleepTime = 0;
        let awakeTime = 0;

        // Process each sleep segment in the bucket
        bucket.dataset[0]?.point?.forEach((point: any) => {
            const startTimeNanos = parseInt(point.startTimeNanos);
            const endTimeNanos = parseInt(point.endTimeNanos);
            const sleepStage = getSleepStage(point.value[0]?.intVal ?? 0);
            
            const durationMinutes = Math.round((endTimeNanos - startTimeNanos) / (60 * 1000000000));
            
            // Update sleep stage totals
            switch (sleepStage) {
                case "SLEEP_DEEP":
                    deepSleepTime += durationMinutes;
                    break;
                case "SLEEP_LIGHT":
                    lightSleepTime += durationMinutes;
                    break;
                case "SLEEP_REM":
                    remSleepTime += durationMinutes;
                    break;
                case "AWAKE":
                    awakeTime += durationMinutes;
                    break;
            }

            segments.push({
                startTime: new Date(startTimeNanos / 1000000).toISOString(),
                endTime: new Date(endTimeNanos / 1000000).toISOString(),
                duration: durationMinutes,
                sleepStage
            });
        });

        return {
            date: new Date(parseInt(bucket.startTimeMillis))
                .toISOString()
                .split("T")[0],
            segments: segments.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()),
            totalSleepTime: deepSleepTime + lightSleepTime + remSleepTime,
            deepSleepTime,
            lightSleepTime,
            remSleepTime,
            awakeTime
        };
    });
}

function getStartOfFifteenDaysAgo(): number {
    const date = new Date();
    date.setDate(date.getDate() - 14);
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

        let sleepData;
        const startTime = getStartOfFifteenDaysAgo();
        const endTime = getEndOfToday();

        if (accessTokenExpiry! > Date.now()) {
            sleepData = await fetchSleepData(
                accessToken as string,
                startTime,
                endTime
            );
        } else {
            const accessTokenReceivedFromGoogle = await getGoogleAccessToken(
                user.refreshToken
            );
            const accessTokenExpiryNew = new Date().getTime() + 3600 * 1000;

            sleepData = await fetchSleepData(
                accessTokenReceivedFromGoogle,
                startTime,
                endTime
            );
            
            return NextResponse.json(
                {
                    success: true,
                    data: processSleepData(sleepData),
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
                data: processSleepData(sleepData),
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
                message: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}