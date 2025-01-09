import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getToken } from "next-auth/jwt";

const HEALTH_PROBLEMS = [
    "None",
    "Diabetes",
    "Hypertension",
    "High Cholesterol",
    "Heart Disease",
    "Obesity",
    "Asthma",
    "Arthritis",
    "Lactose Intolerance",
    "Gluten Intolerance",
    "Acid Reflux",
    "Irritable Bowel Syndrome (IBS)",
    "Insomnia",
    "Thyroid Disorders",
    "PCOS",
];

const ALLERGIES = [
    "None",
    "Peanuts",
    "Tree Nuts",
    "Shellfish",
    "Fish",
    "Eggs",
    "Milk",
    "Soy",
    "Wheat",
    "Seeds",
    "Mustard",
    "Legumes",
    "Gluten",
    "Pollen",
    "Dust Mites",
    "Mold",
];

export async function POST(req: NextRequest) {
    try {
        // Verify user authentication
        const token = await getToken({ req });
        const email = token?.email;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized: Please log in" },
                { status: 401 }
            );
        }

        // Parse request body
        const body = await req.json();
        const { problems, allergies } = body;

        // Validate input types
        if (!Array.isArray(problems) || !Array.isArray(allergies)) {
            return NextResponse.json(
                {
                    error: "Invalid input: problems and allergies must be arrays",
                },
                { status: 400 }
            );
        }

        // Validate health problems
        const invalidProblems = problems.filter(
            (problem) => !HEALTH_PROBLEMS.includes(problem)
        );
        if (invalidProblems.length > 0) {
            return NextResponse.json(
                {
                    error: "Invalid health problems detected",
                    invalidProblems,
                },
                { status: 400 }
            );
        }

        // Validate allergies
        const invalidAllergies = allergies.filter(
            (allergy) => !ALLERGIES.includes(allergy)
        );
        if (invalidAllergies.length > 0) {
            return NextResponse.json(
                {
                    error: "Invalid allergies detected",
                    invalidAllergies,
                },
                { status: 400 }
            );
        }

        // Validate "None" selections
        if (problems.includes("None") && problems.length > 1) {
            return NextResponse.json(
                {
                    error: "'None' cannot be selected with other health problems",
                },
                { status: 400 }
            );
        }
        if (allergies.includes("None") && allergies.length > 1) {
            return NextResponse.json(
                { error: "'None' cannot be selected with other allergies" },
                { status: 400 }
            );
        }

        // Get the user
        const user = await prisma.user.findUnique({
            where: { email: email as string },
            include: {
                healthAndDietary: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Update health information
        const updatedData = await prisma.$transaction(async (prisma) => {
            // Update or create healthAndDietary record
            const healthAndDietary = await prisma.healthAndDietary.upsert({
                where: { userId: user.id },
                create: {
                    userId: user.id,
                    healthProblems: problems,
                    allergies: allergies,
                },
                update: {
                    healthProblems: problems,
                    allergies: allergies,
                },
            });

            return healthAndDietary;
        });

        return NextResponse.json({
            success: true,
            message: "Health information updated successfully",
            data: {
                problems: updatedData.healthProblems,
                allergies: updatedData.allergies,
            },
        });
    } catch (error: any) {
        console.error("Error updating health information:", error);
        return NextResponse.json(
            {
                error: "Failed to update health information",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
