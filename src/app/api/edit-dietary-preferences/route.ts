import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getToken } from "next-auth/jwt";

const DIETARY_PREFERENCES = [
    "Chicken", "Lamb", "Fish", "Eggs", "Dairy", "Shellfish", "Tofu",
    "Nuts", "Seeds", "Gluten", "Soy", "Wheat", "Legumes", "Raw Food"
];

const MACRO_PREFERENCES = [
    "Balanced", "High Protein", "High Carb", "High Fat", "Low Carb",
    "Low Fat", "Low Sugar", "Vegan", "Strict Vegetarian", "Gluten Free",
    "Dairy Free", "Low Sodium", "High Fiber", "Keto", "Paleo",
    "Intermittent Fasting"
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
        const { preferences, macroPreferences } = body;

        
        // Validate input types
        if (!Array.isArray(preferences) || !Array.isArray(macroPreferences)) {
            return NextResponse.json(
                { error: "Invalid input: preferences and macroPreferences must be arrays" },
                { status: 400 }
            );
        }

        // Get the user
        const user = await prisma.user.findUnique({
            where: { email: email as string },
            include: {
                preferences: true,
                healthAndDietary: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Update both preferences and healthAndDietary in a transaction
        const updatedData = await prisma.$transaction(async (prisma) => {
            // Update macroPreferences in UserPreferences
            if (user.preferences) {
                await prisma.userPreferences.update({
                    where: { userId: user.id },
                    data: {
                        macronutrientPreferences: macroPreferences,
                    },
                });
            }

            // Update dietary preferences in HealthAndDietary
            if (user.healthAndDietary) {
                await prisma.healthAndDietary.update({
                    where: { userId: user.id },
                    data: {
                        dietaryPreferences: preferences,
                    },
                });
            }

            // Return updated user data
            return prisma.user.findUnique({
                where: { id: user.id },
                include: {
                    preferences: {
                        select: { macronutrientPreferences: true },
                    },
                    healthAndDietary: {
                        select: { dietaryPreferences: true },
                    },
                },
            });
        });

        if (!updatedData) {
            throw new Error("Failed to update preferences");
        }

        return NextResponse.json({
            success: true,
            message: "Dietary preferences updated successfully",
            data: {
                preferences: updatedData.healthAndDietary?.dietaryPreferences,
                macroPreferences: updatedData.preferences?.macronutrientPreferences,
            },
        });

    } catch (error: any) {
        console.error("Error updating dietary preferences:", error);
        return NextResponse.json(
            {
                error: "Failed to update dietary preferences",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}