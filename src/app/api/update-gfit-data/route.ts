import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import prisma from "@/lib/prismaClient";

export const runtime = 'nodejs'
export const maxDuration = 300

export async function POST(req: NextRequest) {
    try {
        const { accessToken, accessTokenExpiry } = await req.json();
        const token = await getToken({ req });
        const email = token?.email;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized: Please log in" },
                { status: 401 }
            );
        }

        const response: any = await axios.post(
            `${process.env.CLIENT_URL}/api/get-gfit-data`,
            { email, accessToken, accessTokenExpiry }
        );

        const data = response.data?.data;

        const gfitData = {
            stepCount: data.steps,
            caloriesBurnt: data.calories,
            totalHoursSlept: data.sleepData,
            averageHeartRate: data.averageHeartRate,
            accessToken: data.accessToken,
            accessTokenExpiry: data.accessTokenExpiry,
        };

        // Update the database with new values
        await prisma.dailyStat.updateMany({
            where: {
                email: email,
            },
            data: {
                stepCount: gfitData.stepCount,
                caloriesBurnt: gfitData.caloriesBurnt,
                totalHoursSlept: gfitData.totalHoursSlept,
                averageHeartRate: gfitData.averageHeartRate,
            },
        });

        return NextResponse.json({
            success: true,
            gfitData,
            message: "Data updated successfully"
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error updating GFit data:", error.message);
        return NextResponse.json(
            { 
                error: "Failed to update GFit data",
                details: error.message 
            },
            { status: 500 }
        );
    }
}