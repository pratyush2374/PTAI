import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });
        if (!token?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // const email = "kr.pratyushsharma2374@gmail.com";
        const email = token.email;

        // Make API calls concurrent
        const [gfitData, exercisePlan, dietPlan] = await Promise.allSettled([
            axios.post(`${process.env.NEXTAUTH_URL}/api/get-gfit-data`, { email }),
            axios.post(`${process.env.NEXTAUTH_URL}/api/generate-exercise-plan`, { email }),
            axios.post(`${process.env.NEXTAUTH_URL}/api/generate-diet-plan`, { email })
        ]);

        // Process results and handle partial failures
        const response = {
            gfitData: processResult(gfitData, "Google Fit data"),
            exercisePlan: processResult(exercisePlan, "exercise plan"),
            dietPlan: processResult(dietPlan, "diet plan"),
            timestamp: new Date().toISOString(),
            success: false
        };

        // Check if all requests succeeded
        response.success = [gfitData, exercisePlan, dietPlan]
            .every(result => result.status === "fulfilled");

        return NextResponse.json(response);

    } catch (error) {
        return NextResponse.json({
            error: "Failed to get user stats",
            details: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}

function processResult(result: PromiseSettledResult<any>, dataType: string) {
    if (result.status === "fulfilled") {
        return {
            status: "success",
            data: result.value.data
        };
    }
    return {
        status: "error",
        error: `Failed to fetch ${dataType}: ${result.reason?.message || "Unknown error"}`
    };
}