import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getToken } from "next-auth/jwt";

const VALID_GOALS = [
    "Lose Weight",
    "Gain Weight",
    "Build Muscle",
    "Stay Fit",
    "Increase Stamina",
    "Improve Flexibility",
    "Boost Overall Strength",
    "Improve Mobility and Joint Health",
    "Increase Endurance",
    "Build Core Strength",
];

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });
        const email = token?.email;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized: Please log in" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { fitnessGoals, stepsGoal, sleepGoal } = body;

        // Validate input
        if (!Array.isArray(fitnessGoals)) {
            return NextResponse.json(
                { error: "Invalid input: fitnessGoals must be an array" },
                { status: 400 }
            );
        }

        // Validate steps and sleep goals
        if (stepsGoal < 1000 || stepsGoal > 50000) {
            return NextResponse.json(
                { error: "Steps goal must be between 1,000 and 50,000" },
                { status: 400 }
            );
        }

        if (sleepGoal < 4 || sleepGoal > 12) {
            return NextResponse.json(
                { error: "Sleep goal must be between 4 and 12 hours" },
                { status: 400 }
            );
        }

        // Validate that all goals are from the allowed list
        const invalidGoals = fitnessGoals.filter(
            (goal) => !VALID_GOALS.includes(goal)
        );
        if (invalidGoals.length > 0) {
            return NextResponse.json(
                {
                    error: "Invalid goals detected",
                    invalidGoals,
                },
                { status: 400 }
            );
        }

        // Get the user and check if they exist
        const user = await prisma.user.findUnique({
            where: { email: email as string },
            include: {
                preferences: true,
                stats: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Update both preferences and stats in a transaction
        const updatedUser = await prisma.$transaction(async (prisma) => {
            // Update only fitnessGoals in preferences
            if (user.preferences) {
                await prisma.userPreferences.update({
                    where: { userId: user.id },
                    data: { fitnessGoals },
                });
            }

            // Update only stepsGoal and sleepGoal in stats
            if (user.stats) {
                await prisma.stats.update({
                    where: { userId: user.id },
                    data: {
                        stepsGoal,
                        sleepGoal,
                    },
                });
            }

            // Return updated user data
            return prisma.user.findUnique({
                where: { id: user.id },
                include: {
                    preferences: {
                        select: { fitnessGoals: true },
                    },
                    stats: {
                        select: {
                            stepsGoal: true,
                            sleepGoal: true,
                        },
                    },
                },
            });
        });

        if (!updatedUser) {
            throw new Error("Failed to update user data");
        }

        return NextResponse.json({
            success: true,
            message: "Goals updated successfully",
            data: {
                fitnessGoals: updatedUser.preferences?.fitnessGoals,
                stepsGoal: updatedUser.stats?.stepsGoal,
                sleepGoal: updatedUser.stats?.sleepGoal,
            },
        });
    } catch (error: any) {
        console.error("Error updating goals:", error);
        return NextResponse.json(
            {
                error: "Failed to update goals",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
