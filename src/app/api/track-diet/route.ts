import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import prisma from "@/lib/prismaClient";
import calculateCalories from "@/core/calculateCalories";

async function processMealData(
    responses: any,
    alternateFood: any,
    mealArray: any,
    calculateCalories: any
) {
    const result = [];

    for (const meal of mealArray) {
        const response = responses[meal.name];

        if (response === "didNotEat") {
            // Check if there's an alternate food
            const alternate = alternateFood[meal.name];
            if (alternate) {
                // Calculate calories for alternate food
                const alternateCalories = await calculateCalories(alternate);
                result.push({
                    name: alternate,
                    calories: alternateCalories,
                });
            }
            // If no alternate food, skip this meal
        } else {
            // If they ate the original meal, add it to result
            result.push({
                name: meal.name,
                calories: meal.calories,
            });
        }
    }
    const totalCal = result.reduce((acc, curr) => acc + curr.calories, 0);
    return totalCal;
}

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });
        const email = token?.email;
        const {
            alternateFood,
            responses,
            statsId: statsIdFromRequest,
        } = await req.json();

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized: Please log in" },
                { status: 401 }
            );
        }

        // Fetch user data
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, lastPlanGeneratedOn: true },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        // Fetch already existing daily stats

        const dailyStats = await prisma.dailyStat.findFirst({
            where: {
                email,
                date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            include: {
                meals: true,
            },
        });

        const mealArray = dailyStats?.meals.map((meal) => ({
            name: meal.name,
            calories: meal.calories,
        }));

        const totalCalories = await processMealData(
            responses,
            alternateFood,
            mealArray,
            calculateCalories
        );

        await prisma.dailyStat.update({
            where: {
                id: statsIdFromRequest,
            },
            data: {
                caloriesGained: totalCalories,
            },
        });
        return NextResponse.json({
            success: true,
            message: `Total calories calculated for the day: ${totalCalories} cal`,
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
