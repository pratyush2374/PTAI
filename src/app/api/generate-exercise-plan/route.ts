import { NextRequest, NextResponse } from "next/server";
import generateExercisePlan from "@/core/generateExercisePlan";
import prisma from "@/lib/prismaClient";

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
                                exercises: true,
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

        console.log(user);

        const previous7DaysExerciseFocusAreas =
            user.stats?.daily
                .flatMap((day) =>
                    day.exercises.map((exercise) => exercise.primaryMuscle)
                )
                .filter((muscle): muscle is string => !!muscle) || [];

        console.log(previous7DaysExerciseFocusAreas);

        const userData = {
            age: user.age,
            height: user.height,
            weight: user.weights[0]?.weight || 65,
            gender: user.gender.toLowerCase(),
            activityLevel: user.preferences?.activityLevel || "sedentary",
            preferredExerciseType:
                user.preferences?.preferredExerciseType || [],
            exerciseExperience:
                user.preferences?.exerciseExperience || "intermediate",
            workoutDuration: user.preferences?.workoutDuration || "30-45",
            exerciseFrequency: user.preferences?.exerciseFrequency || "4-5",
            fitnessGoals: user.preferences?.fitnessGoals || [],
            pace: user.preferences?.pace || "medium",
            availableEquipments: user.preferences?.availableEquipments || [],
            healthProblems: user.healthAndDietary?.healthProblems || [],
            previous7DaysExerciseFocusAreas,
        };

        const plan = await generateExercisePlan(userData);
        console.log(plan);

        return NextResponse.json(
            {
                data: plan,
                message: "Exercise plan generated and stored successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(`Error generating exercise plan: ${error}`);
        return NextResponse.json(
            {
                error: "Failed to generate exercise plan",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
