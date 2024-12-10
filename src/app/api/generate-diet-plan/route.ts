import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import connectToDB from "@/lib/dbConnection";
import User from "@/models/user.model";
import Diet from "@/models/diet.model";
import DailyDiet from "@/models/dailyDiet.model";
import generateDietPlan from "@/core/generateDietPlan";

export async function POST(req: NextRequest) {
    try {
        // Connect to database
        await connectToDB();

        // Authenticate user
        const token = await getToken({ req });
        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Find user and populate necessary references
        const user = await User.findById(token.sub)
            .populate("preferences")
            .populate("healthAndDietary")
            .lean(); // Use lean for performance

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Remove unwanted populated fields
        const {
            dietId,
            exerciseId,
            userStats,
            fullName,
            userName,
            email,
            password,
            googleId,
            profilePic,
            ...userForDietPlan
        } = user;

        // Generate diet plan
        const dietPlanResult = await generateDietPlan(userForDietPlan as any);

        // Store diets from the generated plan
        const savedMeals = await Promise.all([
            new Diet({
                ...dietPlanResult.meals.breakfast,
            }).save(),
            new Diet({
                ...dietPlanResult.meals.lunch,
            }).save(),
            new Diet({
                ...dietPlanResult.meals.snacks,
            }).save(),
            new Diet({
                ...dietPlanResult.meals.dinner,
            }).save(),
        ]);

        // Create daily diet entry
        const dailyDiet = new DailyDiet({
            userId: user._id,
            date: new Date(),
            dietPlanResult,
        });

        await dailyDiet.save();

        return NextResponse.json({
            message: "Diet plan generated successfully",
            dietPlan: dietPlanResult,
            dailyDietId: dailyDiet._id,
            savedMealIds: savedMeals.map((meal) => meal._id),
        });
    } catch (error) {
        console.error("Diet plan generation error:", error);
        return NextResponse.json(
            {
                error: "Failed to generate diet plan",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
