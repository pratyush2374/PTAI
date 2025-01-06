import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import prisma from "@/lib/prismaClient";
import calculateCalories from "@/core/calculateCalories";
import { date } from "zod";

const data = [
    // January
    { date: "2025-01-04T14:11:50.968Z", weight: 83, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-01-08T10:15:30.123Z", weight: 82.5, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-01-15T09:20:45.456Z", weight: 82.8, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-01-22T16:30:20.789Z", weight: 82.2, userId: "677941a7af0b05227a1144d4" },

    // February
    { date: "2025-02-01T08:45:12.234Z", weight: 82.0, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-02-08T11:25:40.567Z", weight: 81.7, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-02-15T13:15:55.890Z", weight: 81.5, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-02-22T15:40:30.123Z", weight: 81.2, userId: "677941a7af0b05227a1144d4" },

    // March
    { date: "2025-03-01T09:10:25.456Z", weight: 81.0, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-03-08T12:30:45.789Z", weight: 80.8, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-03-15T14:20:15.012Z", weight: 80.5, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-03-22T16:45:35.345Z", weight: 80.2, userId: "677941a7af0b05227a1144d4" },

    // April
    { date: "2025-04-01T10:05:50.678Z", weight: 80.0, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-04-08T13:25:20.901Z", weight: 79.8, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-04-15T15:40:45.234Z", weight: 79.5, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-04-22T17:55:10.567Z", weight: 79.3, userId: "677941a7af0b05227a1144d4" },

    // May
    { date: "2025-05-01T08:15:30.890Z", weight: 79.0, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-05-08T11:35:55.123Z", weight: 78.8, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-05-15T14:50:20.456Z", weight: 78.5, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-05-22T16:10:45.789Z", weight: 78.2, userId: "677941a7af0b05227a1144d4" },

    // June
    { date: "2025-06-01T09:25:15.012Z", weight: 78.0, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-06-08T12:40:35.345Z", weight: 77.8, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-06-15T15:55:50.678Z", weight: 77.5, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-06-22T17:15:20.901Z", weight: 77.3, userId: "677941a7af0b05227a1144d4" },

    // July
    { date: "2025-07-01T10:30:45.234Z", weight: 77.0, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-07-08T13:45:10.567Z", weight: 76.8, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-07-15T16:05:30.890Z", weight: 76.5, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-07-22T18:20:55.123Z", weight: 76.3, userId: "677941a7af0b05227a1144d4" },

    // August
    { date: "2025-08-01T08:35:20.456Z", weight: 76.0, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-08-08T11:50:45.789Z", weight: 75.8, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-08-15T14:10:15.012Z", weight: 75.5, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-08-22T16:25:35.345Z", weight: 75.3, userId: "677941a7af0b05227a1144d4" },

    // September
    { date: "2025-09-01T09:40:50.678Z", weight: 75.0, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-09-08T12:55:20.901Z", weight: 74.8, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-09-15T15:15:45.234Z", weight: 74.5, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-09-22T17:30:10.567Z", weight: 74.3, userId: "677941a7af0b05227a1144d4" },

    // October
    { date: "2025-10-01T10:45:30.890Z", weight: 74.0, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-10-08T13:05:55.123Z", weight: 73.8, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-10-15T15:20:20.456Z", weight: 73.5, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-10-22T17:35:45.789Z", weight: 73.3, userId: "677941a7af0b05227a1144d4" },

    // November
    { date: "2025-11-01T08:50:15.012Z", weight: 73.0, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-11-08T11:10:35.345Z", weight: 72.8, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-11-15T14:25:50.678Z", weight: 72.5, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-11-22T16:40:20.901Z", weight: 72.3, userId: "677941a7af0b05227a1144d4" },

    // December
    { date: "2025-12-01T09:55:45.234Z", weight: 72.0, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-12-08T12:15:10.567Z", weight: 71.8, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-12-15T14:30:30.890Z", weight: 71.5, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-12-22T16:45:55.123Z", weight: 71.3, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-12-29T19:00:20.456Z", weight: 71.0, userId: "677941a7af0b05227a1144d4" },
    { date: "2025-12-31T23:59:59.999Z", weight: 71.0, userId: "677941a7af0b05227a1144d4" }
];


export async function GET(req: NextRequest) {
    try {
        
        for (const weightData of data) {
            await prisma.weight.create({
                data: {
                    date: new Date(weightData.date),
                    weight: weightData.weight,
                    userId: weightData.userId
                }
            });
        }


        return NextResponse.json({
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                error: "Failed to generate plans",
                details:
                    error instanceof Error ? error.message : "Unknown error",
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
}
