import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import prisma from "@/lib/prismaClient";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
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

        const isPlanGeneratedToday =
            user.lastPlanGeneratedOn?.toISOString().slice(0, 10) ===
            today.toISOString().slice(0, 10);

        if (isPlanGeneratedToday) {
            // Fetch already existing daily stats
            console.log("Fetching existing daily stats");
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
                orderBy: { date: "desc" },
                take: 1,
            });

            console.log(dailyStats);
            return NextResponse.json({
                success: true,
                dailyStats,
                timestamp: new Date().toISOString(),
            });
        }

        console.log("Generating plans and fetching Google Fit data");

        // Concurrent API calls to generate plans and fetch Google Fit data
        const [gfitResponse, exerciseResponse, dietResponse] =
            await Promise.all([
                axios.post(`${process.env.NEXTAUTH_URL}/api/get-gfit-data`, {
                    email,
                }),
                axios.post(
                    `${process.env.NEXTAUTH_URL}/api/generate-exercise-plan`,
                    { email }
                ),
                axios.post(
                    `${process.env.NEXTAUTH_URL}/api/generate-diet-plan`,
                    { email }
                ),
            ]);

        const gfitData = gfitResponse.data?.data;
        const exercisePlan = exerciseResponse.data?.data;
        const dietPlan = dietResponse.data?.data;

        // console.log(`GfitData : ${JSON.stringify(gfitData)}`);
        // console.log(`ExercisePlan : ${JSON.stringify(exercisePlan)}`);
        // console.log(`DietPlan : ${JSON.stringify(dietPlan)}`);

        // Save daily stats only if all APIs succeed
        const dailyStat = await prisma.dailyStat.create({
            data: {
                stats: {
                    connect: { userId: user.id },
                },
                email: user.email,
                date: today,
                minutesWorkedOut:
                    exercisePlan.approxDurationToCompleteinMinutes,
                caloriesToBurn: exercisePlan.totalApproxCaloriesBurn,
                focusArea: exercisePlan.focusArea,
                approxDurationToCompleteinMinutes:
                    exercisePlan.approxDurationToCompleteinMinutes,
                equipmentRequired: exercisePlan.equipmentRequired,
                exerciseType: exercisePlan.exerciseType,
                totalExercises: exercisePlan.totalExercises,
                difficultyLevel: exercisePlan.difficultyLevel,
                exercises: {
                    create: exercisePlan.exercises.map((exercise: any) => ({
                        exerciseName: exercise.exerciseName,
                        exerciseType: exercise.exerciseType,
                        primaryMuscle: exercise.primaryMuscleTarget,
                        secondaryMuscle: exercise.secondaryMuscleTarget,
                        duration: exercise.exerciseDuration,
                        equipment: exercise.equipmentRequired,
                        calorieBurn: exercise.calorieBurn,
                        sets: exercise.sets,
                        reps: exercise.reps ? exercise.reps.toString() : "0",
                        restTime: exercise.restTime,
                        advice: exercise.adviseWhenDoingExercise,
                    })),
                },
                caloriesToGain: dietPlan.totalCalories,
                proteinGrams: dietPlan.proteinGrams,
                carbsGrams: dietPlan.carbsGrams,
                fatsGrams: dietPlan.fatsGrams,
                fibreGrams: dietPlan.fibreGrams,
                numberOfMeals: dietPlan.numberOfMeals,
                specialConsiderations: dietPlan.specialConsiderations,
                meals: {
                    create: dietPlan.meals.map((meal: any) => ({
                        type: meal.type,
                        name: meal.name,
                        category: meal.category,
                        weight: meal.weight,
                        calories: meal.calories,
                        protein: meal.protein,
                        carbs: meal.carbs,
                        fats: meal.fats,
                        fibre: meal.fibre,
                        otherNutrients: meal.otherNutrients,
                        ingredients: meal.ingredients,
                        allergens: meal.allergens,
                        cookingTime: meal.cookingTime,
                        recipe: meal.recipe,
                    })),
                },

                caloriesBurnt: gfitData?.calories,
                stepCount: gfitData?.steps,
                averageHeartRate: gfitData?.averageHeartRate,
                totalHoursSlept: gfitData?.sleepData,
            },
        });

        // Update user's last plan generation date
        await prisma.user.update({
            where: { email },
            data: { lastPlanGeneratedOn: today },
        });

        const dailyStatsFromDBNewOneForConsistency =
            await prisma.dailyStat.findFirst({
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
                orderBy: { date: "desc" },
                take: 1,
            });

        console.log(dailyStatsFromDBNewOneForConsistency);

        return NextResponse.json({
            success: true,
            dailyStatsFromDBNewOneForConsistency,
            statsId: dailyStat.id,
            timestamp: new Date().toISOString(),
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
