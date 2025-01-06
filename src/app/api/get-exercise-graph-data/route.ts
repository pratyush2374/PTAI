import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import prisma from "@/lib/prismaClient";
import calculateCalories from "@/core/calculateCalories";

interface WeightEntry {
    date: Date;
    weight: number;
}

interface MonthlyAverages {
    [key: string]: number;
}

function calculateMonthlyWeightAverages(data: WeightEntry[]): MonthlyAverages {
    const monthlyTotals: { [key: string]: { sum: number; count: number } } = {};

    // Array of month names for converting numeric months to names
    const monthNames = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
    ];

    // Loop through each weight entry
    data.forEach((entry) => {
        const date = new Date(entry.date);
        const monthName = monthNames[date.getMonth()];

        if (!monthlyTotals[monthName]) {
            monthlyTotals[monthName] = { sum: 0, count: 0 };
        }

        // Add to the month's running total
        monthlyTotals[monthName].sum += entry.weight;
        monthlyTotals[monthName].count += 1;
    });

    // Calculate averages for each month
    const monthlyAverages: MonthlyAverages = {};

    Object.entries(monthlyTotals).forEach(([month, { sum, count }]) => {
        monthlyAverages[month] = Number((sum / count).toFixed(2));
    });

    return monthlyAverages;
}

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req });
        const email = token?.email || "kr.pratyushsharma2374@gmail.com";

        // if (!token) {
        //     return NextResponse.json(
        //         { error: "Unauthorized: Please log in" },
        //         { status: 401 }
        //     );
        // }

        // Fetch weight data
        let weight = null;
        weight = await prisma.weight.findMany({
            where: {
                userId: token?.id,
            },
        });

        if (!weight) {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            weight = await prisma.weight.findMany({
                where: {
                    userId: user?.id,
                },
                select: {
                    date: true,
                    weight: true,
                },
            });
        }

        const monthlyWeightAvg = calculateMonthlyWeightAverages(weight);
        const recentWeight = weight[weight.length - 1].weight;
        const averageWeightLong = Object.values(monthlyWeightAvg).reduce(
            (total, weight) => total + weight,
            0
        )/ Object.values(monthlyWeightAvg).length;
        const averageWeight = Number(averageWeightLong.toFixed(2));
        const lastMonthChangeLong = monthlyWeightAvg["december"] - monthlyWeightAvg["november"];
        const lastMonthChange = Number(lastMonthChangeLong.toFixed(2));

        return NextResponse.json({
            success: true,
            data: {monthlyWeightAvg, recentWeight, averageWeight, lastMonthChange},
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
