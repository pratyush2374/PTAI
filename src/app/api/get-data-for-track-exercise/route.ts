import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import prisma from "@/lib/prismaClient";

export const runtime = 'nodejs'
export const maxDuration = 59

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req });
        const email = token?.email;

        if(!token) {
            return NextResponse.json(
                { error: "Unauthorized: Please log in" },
                { status: 401 }
            );
        }

        // Fetch user data
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, lastPlanGeneratedOn: true },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const isPlanGeneratedToday =
            user.lastPlanGeneratedOn?.toISOString().slice(0, 10) ===
            today.toISOString().slice(0, 10);

        let dailyStats = null;
        let exerciseArray = null;
        if (isPlanGeneratedToday) {
            // Fetch already existing daily stats
            ("Fetching existing daily stats");
            dailyStats = await prisma.dailyStat.findFirst({
                where: {
                    email,
                    date: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
                include: {
                    exercises: true,
                },
            });

            exerciseArray = dailyStats?.exercises.map(
                (exercise) => exercise.exerciseName
            );

            return NextResponse.json({
                success: true,
                exerciseArray,
                timestamp: new Date().toISOString(),
            });
        }

        const response: any = await axios.post(
            `${process.env.CLIENT_URL}/api/get-user-stats`,
            { email }
        );

        const dailyStatsId = response.data?.statsId;
        dailyStats = await prisma.dailyStat.findFirst({
            where: { id: dailyStatsId },
            include: {
                exercises: true,
            },
        });

        exerciseArray = dailyStats?.exercises.map(
            (exercise) => exercise.exerciseName
        );

        return NextResponse.json({
            success: true,
            dailyStats,
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                error: "Failed to generate plans",
                details:
                    error instanceof Error ? error.message : "Unknown error",
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
}
