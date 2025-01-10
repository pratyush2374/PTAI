import { NextRequest, NextResponse } from "next/server";
import generateDietPlan from "@/core/generateDietPlan";
import prisma from "@/lib/prismaClient";
import { Prisma, MealType } from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                preferences: true,
                healthAndDietary: true,
                weights: {
                    orderBy: { date: "desc" },
                    take: 1,
                },
                stats: {
                    include: {
                        daily: {
                            include: {
                                meals: true,
                            },
                            orderBy: { date: "desc" },
                            take: 7,
                        },
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const previous7DaysMeals = 
            user.stats?.daily
                .flatMap((day) => 
                    day.meals.map((meal) => meal.type)
                ) || [];

        const userData = {
            age: user.age,
            height: user.height,
            weight: user.weights[0]?.weight || 65,
            gender: user.gender.toLowerCase(),
            activityLevel: user.preferences?.activityLevel || "sedentary",
            macronutrientPreferences: user.preferences?.macronutrientPreferences || [],
            dietaryPreferences: user.healthAndDietary?.dietaryPreferences || [],
            allergies: user.healthAndDietary?.allergies || [],
            healthProblems: user.healthAndDietary?.healthProblems || [],
            fitnessGoals: user.preferences?.fitnessGoals || [],
            previous7DaysMeals,
        };

        const plan = await generateDietPlan(userData);

        return NextResponse.json(
            {
                data: plan,
                message: "Diet plan generated and stored successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(`Error generating diet plan: ${error}`);
        return NextResponse.json(
            {
                error: "Failed to generate diet plan",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}