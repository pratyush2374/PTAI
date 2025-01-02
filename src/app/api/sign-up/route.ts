import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const {
            fullName,
            email,
            password,
            googleId,
            refreshToken,
            height,
            weight,
            dob,
            gender,
            activityLevel,
            preferredExerciseType,
            workoutDuration,
            exerciseFrequency,
            availableEquipments,
            experience,
            pace,
            goal,
            macroNutrientPreferences,
            dietaryPreferences,
            healthProblems,
            allergies,
            additionalInfo,
        } = await req.json();

        // Deriving username from email and calculating age
        const username = email.split("@")[0];
        const age = new Date().getFullYear() - new Date(dob).getFullYear();

        // Check if email or username already exists
        const existingUser = await prisma.user.findFirst({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "Email or Username already taken" },
                { status: 400 }
            );
        }

        // Ensure height and weight are stored as numbers
        const parsedHeight = parseFloat(height);
        const parsedWeight = parseFloat(weight);
        const hashedPassword = await bcrypt.hash(password, 11);

        // Ensure gender is stored in uppercase
        const formattedGender = gender.toUpperCase();

        const googleIdToInsertInDB = googleId?.trim() || null;
        const refreshTokenToInsertInDB = refreshToken?.trim() || null;

        // Create a new user with the provided details
        const newUser = await prisma.user.create({
            data: {
                fullName,
                userName: username,
                email,
                password: hashedPassword,
                googleId: googleIdToInsertInDB,
                refreshToken: refreshTokenToInsertInDB,
                dob: new Date(dob),
                age,
                gender: formattedGender,
                height: parsedHeight,
                weights: {
                    create: {
                        date: new Date(),
                        weight: parsedWeight,
                    },
                }, // Add weight record
                additionalInfo,
                preferences: {
                    create: {
                        activityLevel,
                        preferredExerciseType,
                        exerciseExperience: experience,
                        workoutDuration,
                        exerciseFrequency,
                        macronutrientPreferences: macroNutrientPreferences,
                        fitnessGoals: goal,
                        pace,
                        availableEquipments,
                    },
                },
                healthAndDietary: {
                    create: {
                        dietaryPreferences,
                        healthProblems,
                        allergies,
                    },
                },
            },
        });

        return NextResponse.json(
            { message: "User created successfully", userId: newUser.id },
            { status: 200 }
        );
    } catch (error) {
        console.log(`Error creating user: ${error}`);
        return NextResponse.json(
            { message: "Internal Server Error", error },
            { status: 500 }
        );
    }
}
