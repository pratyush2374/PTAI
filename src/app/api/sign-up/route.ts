import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/lib/dbConnection";
import bcrypt from "bcryptjs";
import { z } from "zod";
import signupSchema from "@/schemas/signup.schema";
import User from "@/models/user.model";
import UserPreferences from "@/models/userPreferences.model";
import HealthAndDietary from "@/models/healthAndDietary.model";

export async function POST(req: NextRequest) {
    await connectToDB();

    try {
        const body = await req.json();
        const {
            // User
            fullName,
            userName,
            email,
            password,
            age,
            gender,
            height,
            weight,

            // UserPreferences
            activityLevel,
            preferredExerciseType,
            exerciseExperience,
            workoutDuration,
            exerciseFrequency,
            macronutrientPreferences,
            fitnessGoal,
            pace,
            availableEquipments,

            // HealthAndDietary
            dietaryPreferences,
            healthProblems,
            allergies,
        } = signupSchema.parse(body);

        // Check for existing user
        const existingUserByEmail = await User.findOne({ email });
        const existingUserByUsername = await User.findOne({ userName });

        if (existingUserByEmail) {
            return NextResponse.json(
                { success: false, message: "Email already exists" }, 
                { status: 400 }
            );
        }

        if (existingUserByUsername) {
            return NextResponse.json(
                { success: false, message: "Username already exists" }, 
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create associated documents
        const newUserPreferences = new UserPreferences({
            activityLevel,
            preferredExerciseType: preferredExerciseType || [],
            exerciseExperience,
            workoutDuration,
            exerciseFrequency,
            macronutrientPreferences: macronutrientPreferences || [],
            fitnessGoals: [fitnessGoal],
            pace,
            availableEquipments: availableEquipments || [],
        });

        const newHealthAndDietary = new HealthAndDietary({
            dietaryPreferences: dietaryPreferences || [],
            healthProblems: healthProblems || [],
            allergies: allergies || [],
        });

        // Save associated documents
        await newUserPreferences.save();
        await newHealthAndDietary.save();

        // Create new user
        const newUser = new User({
            fullName,
            userName,
            email,
            password: hashedPassword,
            age,
            gender,
            height,
            weight: [{ date: new Date().toISOString(), weight }],
            preferences: newUserPreferences._id,
            healthAndDietary: newHealthAndDietary._id,
            fitnessGoal,
            pace,
            activityLevel,
            availableEquipments: availableEquipments || [],
            exerciseExperience,
            preferredExerciseType: preferredExerciseType || [],
            workoutDuration,
            exerciseFrequency,
            macronutrientPreferences: macronutrientPreferences || [],
            dietaryPreferences: dietaryPreferences || [],
            healthProblems: healthProblems || [],
            allergies: allergies || [],
        });

        // Save user
        await newUser.save();

        return NextResponse.json(
            { 
                success: true, 
                message: "User registration successful",
                userId: newUser._id
            }, 
            { status: 201 }
        );

    } catch (error) {
        console.error("Error registering user: ", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: "Validation error",
                    errors: error.errors 
                }, 
                { status: 400 }
            );
        }

        return NextResponse.json(
            { 
                success: false, 
                message: "Error registering user" 
            }, 
            { status: 500 }
        );
    }
}