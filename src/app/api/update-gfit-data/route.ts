import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import prisma from "@/lib/prismaClient";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });
        const email = token?.email;

        // if (!token) {
        //     return NextResponse.json(
        //         { error: "Unauthorized: Please log in" },
        //         { status: 401 }
        //     );
        // }

        const response: any = await axios.post(
            `${process.env.NEXTAUTH_URL}/api/get-gfit-data`,
            { email: "kr.pratyushsharma2374@gmail.com" }
        );

        const data = response.data?.data;

        const gfitData = {
            success: true,
            dailyStats: [
                {
                    stepCount: data.steps,
                    caloriesBurnt: data.calories,
                    totalHoursSlept: data.sleepData,
                    averageHeartRate: data.averageHeartRate,
                },
            ],
            timestamp: Date.now().toString(),
        };

        const updatedUserStats = await prisma.dailyStat.updateMany({
            where: {
                email: email,
            },
            data: {
                stepCount: gfitData.dailyStats[0].stepCount,
                caloriesBurnt: gfitData.dailyStats[0].caloriesBurnt,
                totalHoursSlept: gfitData.dailyStats[0].totalHoursSlept,
                averageHeartRate: gfitData.dailyStats[0].averageHeartRate,
            },
        });
        console.log("Updated user stats");

        return NextResponse.json(gfitData, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update GFit data" },
            { status: 500 }
        );
    }
}
