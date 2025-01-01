import { NextRequest, NextResponse } from "next/server";
import generateExercisePlan from "@/core/generateExercisePlan";
import prisma from "@/lib/prismaClient";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                preferences: true,
                healthAndDietary: true,
                weight: true,
                // WeeklyExercise : {
                //     select : {dailyPlans : true},
                //     include : {
                //         dailyPlans : true
                //     }
                // }
            },
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        console.log(user);

        const userData = {
            age: user?.age || 0,
            height: user?.height || 0,
            weight: user?.weight[user.weight.length - 1]?.weight || 65,
            gender: user?.gender || "male",
            activityLevel: user?.preferences?.activityLevel || "sedentary",
            preferredExerciseType:
                user?.preferences?.preferredExerciseType || [],
            exerciseExperience:
                user?.preferences?.exerciseExperience || "intermediate",
            workoutDuration: user?.preferences?.workoutDuration || "30-45",
            exerciseFrequency: user?.preferences?.exerciseFrequency || "4-5",
            fitnessGoals: user?.preferences?.fitnessGoals || [],
            pace: user?.preferences?.pace || "medium",
            availableEquipments: user?.preferences?.availableEquipments || [],
            healthProblems: user?.healthAndDietary?.healthProblems || [],
            previous7DaysExerciseFocusAreas: ["legs", "core"],
        };

        const responseDataReceivedFromGenerateExercisePlan =
            await generateExercisePlan(userData);

        //Creating daily exercise plan
        const dailyExercise = await prisma.dailyExercise.create({
            data: {
                date: new Date(),
                focusArea:
                    responseDataReceivedFromGenerateExercisePlan.focusArea,
                equipmentRequired:
                    responseDataReceivedFromGenerateExercisePlan.equipmentRequired,
                exerciseType:
                    responseDataReceivedFromGenerateExercisePlan.exerciseType,
                duration:
                    responseDataReceivedFromGenerateExercisePlan.approxDurationToCompleteinMinutes,
                totalExercises:
                    responseDataReceivedFromGenerateExercisePlan.totalExercises,
                calorieBurn:
                    responseDataReceivedFromGenerateExercisePlan.totalApproxCaloriesBurn,
                difficultyLevel:
                    responseDataReceivedFromGenerateExercisePlan.difficultyLevel,
                userId: user.id,
            },
        });

        console.log(dailyExercise);

        // Creating individual exercises ans storing in DB
        const exercises = await prisma.exercise.createMany({
            data: responseDataReceivedFromGenerateExercisePlan.exercises.map(
                (exercise: any) => ({
                    exerciseName: exercise.exerciseName,
                    exerciseType: exercise.exerciseType,
                    primaryMuscleTarget: exercise.primaryMuscleTarget,
                    secondaryMuscleTarget: exercise.secondaryMuscleTarget,
                    exerciseDuration: exercise.exerciseDuration,
                    equipmentRequired: exercise.equipmentRequired,
                    calorieBurn: exercise.calorieBurn,
                    sets: exercise.sets,
                    reps: exercise.reps,
                    restTime: exercise.restTime,
                    adviseWhenDoingExercise: exercise.adviseWhenDoingExercise,
                    exerciseId: dailyExercise.id,
                })
            ),
        });

        // const weeklyExercise = await prisma.weeklyExercise.create({
        //     data: {
        //         userId: user.id,
        //         weekStart: new Date(),
        //         weekEnd: new Date(),
        //         dailyPlans: {
        //             connect: [{ id: dailyExercise.id }],
        //         },
        //     },
        // });

        console.log(exercises);

        return NextResponse.json(
            {
                data: responseDataReceivedFromGenerateExercisePlan,
                message: "Exercise plan generated successfully",
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
