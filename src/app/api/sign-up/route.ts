import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {
            fullName,
            email,
            password,
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

        return NextResponse.json({ message: "Received data" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
