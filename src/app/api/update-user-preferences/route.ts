import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Updated from getSession
import connectToDB from "@/lib/dbConnection";
import User from "@/models/user.model";
import UserPreferences from "@/models/userPreferences.model";
import { z } from "zod";

// Preferences validation schema
const preferencesSchema = z.object({
    activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]),
    preferredExerciseType: z.array(z.string()).optional(),
    exerciseExperience: z.enum(["beginner", "intermediate", "advanced"]),
    workoutDuration: z.enum(["15-30", "30-45", "45-60", "60+"]),
    exerciseFrequency: z.enum(["1-2", "3-4", "5-6", "daily"]),
    macronutrientPreferences: z.array(z.string()).optional(),
    fitnessGoals: z.array(z.enum([
        "weight_loss", 
        "muscle_gain", 
        "endurance", 
        "flexibility", 
        "overall_fitness"
    ])).optional(),
    pace: z.enum(["slow", "moderate", "fast"]),
    availableEquipments: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
    try {
        // Verify user authentication
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized: Please log in" }, 
                { status: 401 }
            );
        }

        // Parse and validate request body
        const body = await req.json();
        const validatedData = preferencesSchema.parse(body);

        // Connect to database
        await connectToDB();

        // Find the user
        const user = await User.findById(token.sub);
        
        if (!user) {
            return NextResponse.json(
                { message: "User not found" }, 
                { status: 404 }
            );
        }

        // Find or create user preferences
        let userPreferences = await UserPreferences.findById(user.preferences);
        
        if (!userPreferences) {
            // Create new preferences if not exists
            userPreferences = new UserPreferences({
                ...validatedData,
                preferredExerciseType: validatedData.preferredExerciseType || [],
                macronutrientPreferences: validatedData.macronutrientPreferences || [],
                fitnessGoals: validatedData.fitnessGoals || [],
                availableEquipments: validatedData.availableEquipments || [],
            });
        } else {
            // Update existing preferences
            userPreferences.set({
                ...validatedData,
                preferredExerciseType: validatedData.preferredExerciseType || [],
                macronutrientPreferences: validatedData.macronutrientPreferences || [],
                fitnessGoals: validatedData.fitnessGoals || [],
                availableEquipments: validatedData.availableEquipments || [],
            });
        }

        // Save preferences
        await userPreferences.save();

        // Update user reference if needed
        if (!user.preferences) {
            user.preferences = userPreferences._id as any;
            await user.save();
        }

        return NextResponse.json(
            { 
                message: "User preferences updated successfully",
                preferences: userPreferences 
            }, 
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating preferences:", error);

        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { 
                    message: "Validation error",
                    errors: error.errors 
                }, 
                { status: 400 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            { message: "Internal Server Error" }, 
            { status: 500 }
        );
    }
}