import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import prisma from "@/lib/prismaClient";
import { z } from "zod";
import { getToken } from "next-auth/jwt";
import giveOverviewOfBloodPressure from "@/core/bloodPressureSummary";

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

interface BloodPressureReading {
    systolic: number;
    diastolic: number;
    timestamp: string;
}

interface DailyBloodPressure {
    date: string;
    readings: BloodPressureReading[];
    averageSystolic: number;
    averageDiastolic: number;
    minSystolic: number;
    maxSystolic: number;
    minDiastolic: number;
    maxDiastolic: number;
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

async function fetchBloodPressureData(
    accessToken: string,
    startTime: number,
    endTime: number
): Promise<any> {
    const requestBody = {
        aggregateBy: [{ dataTypeName: "com.google.blood_pressure" }],
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
        console.error("Failed to fetch blood pressure data:", error.message);
        throw new Error("Failed to fetch blood pressure data from Google");
    }
}

function processBloodPressureData(response: any): DailyBloodPressure[] {
    if (!response?.bucket) {
        console.warn("Unexpected response structure:", response);
        return [];
    }

    return response.bucket.map((bucket: any) => {
        const readings: BloodPressureReading[] = [];
        const systolicReadings: number[] = [];
        const diastolicReadings: number[] = [];

        // Process each reading in the bucket
        bucket.dataset[0]?.point?.forEach((point: any) => {
            const values = point.value;
            
            // Google Fit returns 3 identical values for systolic (0-2)
            // and 3 identical values for diastolic (3-5)
            if (values && values.length >= 6) {
                const systolic = values[0]?.fpVal ?? 0;  // Taking first systolic value
                const diastolic = values[3]?.fpVal ?? 0; // Taking first diastolic value
                
                // Only add valid readings
                if (systolic > 0 && diastolic > 0) {
                    const timestamp = new Date(
                        parseInt(point.startTimeNanos) / 1000000
                    ).toISOString();

                    readings.push({
                        systolic,
                        diastolic,
                        timestamp,
                    });

                    systolicReadings.push(systolic);
                    diastolicReadings.push(diastolic);
                }
            }
        });

        // Calculate statistics only if we have valid readings
        const readingCount = readings.length;
        const averageSystolic = readingCount > 0
            ? Math.round(systolicReadings.reduce((a, b) => a + b, 0) / readingCount)
            : 0;
        const averageDiastolic = readingCount > 0
            ? Math.round(diastolicReadings.reduce((a, b) => a + b, 0) / readingCount)
            : 0;

        return {
            date: new Date(parseInt(bucket.startTimeMillis))
                .toISOString()
                .split("T")[0],
            readings,
            averageSystolic,
            averageDiastolic,
            minSystolic: readingCount > 0 ? Math.min(...systolicReadings) : null,
            maxSystolic: readingCount > 0 ? Math.max(...systolicReadings) : null,
            minDiastolic: readingCount > 0 ? Math.min(...diastolicReadings) : null,
            maxDiastolic: readingCount > 0 ? Math.max(...diastolicReadings) : null,
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
        const email = token?.email || "kr.pratyushsharma2374@gmail.com";
        console.log(
            `email: ${email} accessToken: ${accessToken} accessTokenExpiry: ${accessTokenExpiry}`
        );

        // if (!token) {
        //     return NextResponse.json(
        //         { message: "Unauthorized: Please log in" },
        //         { status: 401 }
        //     );
        // }

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

        let bloodPressureData;
        const startTime = getStartOfFifteenDaysAgo();
        const endTime = getEndOfToday();

        if (accessTokenExpiry! > Date.now()) {
            console.log("Using existing access token");
            bloodPressureData = await fetchBloodPressureData(
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

            bloodPressureData = await fetchBloodPressureData(
                accessTokenReceivedFromGoogle,
                startTime,
                endTime
            );
             
            // const overview = await giveOverviewOfBloodPressure(bloodPressureData);
            // Return new token with response
            return NextResponse.json(
                {
                    success: true,
                    data: processBloodPressureData(bloodPressureData),
                    // overview,
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

        // const overview = await giveOverviewOfBloodPressure(bloodPressureData);
        // Process and return the data
        return NextResponse.json(
            {
                success: true,
                data: processBloodPressureData(bloodPressureData),
                // overview,
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
