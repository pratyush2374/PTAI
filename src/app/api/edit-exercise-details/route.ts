import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getToken } from "next-auth/jwt";

const ACTIVITY_LEVELS = [
    "Sedentary",
    "Light",
    "Moderate",
    "Active",
    "Very active",
];
const EXERCISE_TYPES = [
    "Cardio",
    "Strength",
    "Weightlifting",
    "HIIT",
    "Pilates",
    "Aerobics",
    "Yoga",
    "Running",
    "Cycling",
    "Swimming",
];
const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced"];
const DURATIONS = ["15-30", "30-45", "45-60", "60+"];
const FREQUENCIES = ["1-2", "3-4", "5-6", "Daily"];
const PACES = ["Slow", "Moderate", "Fast"];
const EQUIPMENT = [
    "No Equipment",
    "Dumbbell",
    "Treadmills",
    "Ellipticals",
    "Rowing Machines",
    "Stair Climbers",
    "Weight Plates",
    "Leg Press Machine",
    "Chest Press Machine",
    "Lat Pulldown Machine",
    "Seated Row Machine",
    "Adjustable Bench",
    "Flat Bench",
    "Squat Rack",
    "Barbell",
    "Resistance Bands",
    "Kettlebell",
    "Exercise Ball",
    "Medicine Ball",
    "Pull-Up Bar",
    "Jump Rope",
    "Treadmill",
    "Stationary Bike",
    "Rowing Machine",
    "Elliptical Machine",
    "Bench",
    "Yoga Mat",
    "Battle Ropes",
    "Smith Machine",
    "Cable Machine",
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
        const {
            activityLevel,
            exerciseType,
            experience,
            duration,
            frequency,
            pace,
            equipment,
        } = body;

        // Input validation
        if (!activityLevel || !ACTIVITY_LEVELS.includes(activityLevel)) {
            return NextResponse.json(
                { error: "Invalid activity level" },
                { status: 400 }
            );
        }

        if (
            !Array.isArray(exerciseType) ||
            !exerciseType.every((type) => EXERCISE_TYPES.includes(type))
        ) {
            return NextResponse.json(
                { error: "Invalid exercise types" },
                { status: 400 }
            );
        }

        if (!experience || !EXPERIENCE_LEVELS.includes(experience)) {
            return NextResponse.json(
                { error: "Invalid experience level" },
                { status: 400 }
            );
        }

        if (!duration || !DURATIONS.includes(duration)) {
            return NextResponse.json(
                { error: "Invalid duration" },
                { status: 400 }
            );
        }

        if (!frequency || !FREQUENCIES.includes(frequency)) {
            return NextResponse.json(
                { error: "Invalid frequency" },
                { status: 400 }
            );
        }

        if (!pace || !PACES.includes(pace)) {
            return NextResponse.json(
                { error: "Invalid pace" },
                { status: 400 }
            );
        }

        if (
            !Array.isArray(equipment) ||
            !equipment.every((item) => EQUIPMENT.includes(item))
        ) {
            return NextResponse.json(
                { error: "Invalid equipment" },
                { status: 400 }
            );
        }

        // Get the user
        const user = await prisma.user.findUnique({
            where: { email: email as string },
            include: {
                preferences: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Update preferences
        const updatedPreferences = await prisma.userPreferences.update({
            where: { userId: user.id },
            data: {
                activityLevel,
                preferredExerciseType: exerciseType,
                exerciseExperience: experience,
                workoutDuration: duration,
                exerciseFrequency: frequency,
                pace,
                availableEquipments: equipment,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Exercise details updated successfully",
            data: updatedPreferences,
        });
    } catch (error: any) {
        console.error("Error updating exercise details:", error);
        return NextResponse.json(
            {
                error: "Failed to update exercise details",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
