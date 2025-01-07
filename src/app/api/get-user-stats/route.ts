import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios, { AxiosError } from "axios";
import prisma from "@/lib/prismaClient";

// Helper function to create consistent error responses
const createErrorResponse = (message: string, status: number = 500) => {
    return NextResponse.json(
        {
            error: message,
            timestamp: new Date().toISOString(),
        },
        { status }
    );
};

export async function POST(req: NextRequest) {
    try {
        const { email, accessToken, accessTokenExpiry } = await req.json();
        // Fetch user data with error handling
        if (!email) {
            return createErrorResponse("You are not logged in", 401);
        }

        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, lastPlanGeneratedOn: true },
        });

        if (!user) {
            return createErrorResponse("User not found", 404);
        }

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const isPlanGeneratedToday =
            user.lastPlanGeneratedOn?.toISOString().slice(0, 10) ===
            today.toISOString().slice(0, 10);

        if (isPlanGeneratedToday) {
            try {
                if (accessToken && accessTokenExpiry) {
                    console.log("You have sent access token and its expiry");
                    
                    const now = Date.now();
                    const accessTokenIssueTime = accessTokenExpiry - (10 * 60 * 1000);
                    
                    if (now - accessTokenIssueTime < 10 * 60 * 1000) {
                        console.log(
                            "You have requested new data within 10 min"
                        );
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
                        });

                        if (!dailyStats) {
                            return createErrorResponse(
                                "Daily stats not found",
                                404
                            );
                        }

                        return NextResponse.json({
                            success: true,
                            dailyStats,
                            accessToken,
                            accessTokenExpiry,
                            statsId: dailyStats.id,
                            timestamp: new Date().toISOString(),
                        });
                    }

                    console.log(
                        "You have sent access token and its expiry, but it's been over 10 mins so we need to update it"
                    );
                    // Update existing stats with new Google Fit data
                    const updatedGFitData = await axios.post(
                        `${process.env.NEXTAUTH_URL}/api/get-gfit-data`,
                        { email, accessToken, accessTokenExpiry }
                    );

                    const updatedStats = await prisma.dailyStat.updateMany({
                        where: {
                            email,
                            date: {
                                gte: startOfDay,
                                lte: endOfDay,
                            },
                        },
                        data: {
                            stepCount: updatedGFitData.data.data.steps,
                            caloriesBurnt: updatedGFitData.data.data.calories,
                            totalHoursSlept:
                                updatedGFitData.data.data.sleepData,
                            averageHeartRate:
                                updatedGFitData.data.data.averageHeartRate,
                        },
                    });

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
                    });

                    return NextResponse.json({
                        success: true,
                        dailyStats,
                        accessToken: updatedGFitData.data.accessToken,
                        accessTokenExpiry:
                            updatedGFitData.data.accessTokenExpiry,
                        statsId: dailyStats?.id,
                        timestamp: new Date().toISOString(),
                    });
                }

                console.log("You have not sent access token and its expiry");
                // Update existing stats with new Google Fit data where in the user has not sent access token
                const updatedGFitData = await axios.post(
                    `${process.env.NEXTAUTH_URL}/api/get-gfit-data`,
                    { email }
                );

                await prisma.dailyStat.updateMany({
                    where: {
                        email,
                        date: {
                            gte: startOfDay,
                            lte: endOfDay,
                        },
                    },
                    data: {
                        stepCount: updatedGFitData.data.data.steps,
                        caloriesBurnt: updatedGFitData.data.data.calories,
                        totalHoursSlept: updatedGFitData.data.data.sleepData,
                        averageHeartRate:
                            updatedGFitData.data.data.averageHeartRate,
                    },
                });

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
                });

                return NextResponse.json({
                    success: true,
                    dailyStats,
                    accessToken: updatedGFitData.data.accessToken,
                    accessTokenExpiry: updatedGFitData.data.accessTokenExpiry,
                    statsId: dailyStats?.id,
                    timestamp: new Date().toISOString(),
                });
            } catch (error) {
                console.error("Error updating daily stats:", error);
                return createErrorResponse("Failed to update daily stats");
            }
        }

        // Generate new plans and fetch Google Fit data
        try {
            console.log("Generating plans and fetching Google Fit data");

            const [gfitResponse, exerciseResponse, dietResponse] =
                await Promise.all([
                    axios.post(
                        `${process.env.NEXTAUTH_URL}/api/get-gfit-data`,
                        { email }
                    ),
                    axios.post(
                        `${process.env.NEXTAUTH_URL}/api/generate-exercise-plan`,
                        { email }
                    ),
                    axios.post(
                        `${process.env.NEXTAUTH_URL}/api/generate-diet-plan`,
                        { email }
                    ),
                ]).catch((error) => {
                    if (error instanceof AxiosError) {
                        throw new Error(
                            `API call failed: ${
                                error.response?.data?.error || error.message
                            }`
                        );
                    }
                    throw error;
                });

            const gfitData = gfitResponse.data?.data;
            const exercisePlan = exerciseResponse.data?.data;
            const dietPlan = dietResponse.data?.data;

            if (!gfitData || !exercisePlan || !dietPlan) {
                throw new Error("Missing required data from API responses");
            }

            // Create daily stats with transaction to ensure data consistency
            const dailyStat = await prisma.$transaction(async (prisma) => {
                const newDailyStat = await prisma.dailyStat.create({
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
                            create: exercisePlan.exercises.map(
                                (exercise: any) => ({
                                    exerciseName: exercise.exerciseName,
                                    exerciseType: exercise.exerciseType,
                                    primaryMuscle: exercise.primaryMuscleTarget,
                                    secondaryMuscle:
                                        exercise.secondaryMuscleTarget,
                                    duration: exercise.exerciseDuration,
                                    equipment: exercise.equipmentRequired,
                                    calorieBurn: exercise.calorieBurn,
                                    sets: exercise.sets,
                                    reps: exercise.reps
                                        ? exercise.reps.toString()
                                        : "0",
                                    restTime: exercise.restTime,
                                    advice: exercise.adviseWhenDoingExercise,
                                })
                            ),
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

                await prisma.user.update({
                    where: { email },
                    data: { lastPlanGeneratedOn: today },
                });

                return newDailyStat;
            });

            const streakUpdate = await updateUserStreak(user.id, user.email);

            const dailyStatsFromDB = await prisma.dailyStat.findFirst({
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
            });

            return NextResponse.json({
                success: true,
                dailyStats: dailyStatsFromDB,
                accessToken: gfitResponse.data.accessToken,
                accessTokenExpiry: gfitResponse.data.accessTokenExpiry,
                statsId: dailyStat.id,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            console.error("Error generating plans:", error);
            return createErrorResponse("Failed to generate plans");
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return createErrorResponse("An unexpected error occurred");
    }
}

async function updateUserStreak(userId: string, email: string) {
    try {
        const stats = await prisma.stats.findUnique({
            where: { userId },
            include: {
                daily: {
                    orderBy: { date: "desc" },
                    take: 2,
                },
            },
        });

        if (!stats) {
            console.error(`No stats found for user ${userId}`);
            return { currentStreak: 0, highestStreak: 0 };
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);

        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        const sortedDailyStats = stats.daily.sort(
            (a, b) => b.date.getTime() - a.date.getTime()
        );

        let newCurrentStreak = stats.currentStreak;
        let newHighestStreak = stats.highestStreak;

        if (sortedDailyStats.length === 1) {
            newCurrentStreak = 1;
            newHighestStreak = 1;
        } else if (sortedDailyStats.length > 1) {
            const previousStatDate = new Date(sortedDailyStats[1].date);
            previousStatDate.setHours(0, 0, 0, 0);

            if (previousStatDate.getTime() === yesterday.getTime()) {
                newCurrentStreak += 1;
                newHighestStreak = Math.max(newCurrentStreak, newHighestStreak);
            } else if (previousStatDate.getTime() < yesterday.getTime()) {
                newCurrentStreak = 1;
            }
        }

        await prisma.stats.update({
            where: { userId },
            data: {
                currentStreak: newCurrentStreak,
                highestStreak: newHighestStreak,
            },
        });

        return {
            currentStreak: newCurrentStreak,
            highestStreak: newHighestStreak,
        };
    } catch (error) {
        console.error(`Error updating user streak:, ${error}`);
        return { currentStreak: 0, highestStreak: 0 };
    }
}
