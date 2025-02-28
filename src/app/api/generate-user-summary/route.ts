import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prismaClient";
import generateUserSummary from "@/core/generateUserSummary";

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req });
        const email = token?.email;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized: Please log in" },
                { status: 401 }
            );
        }

        const userData = await prisma.user.findUnique({
            where: { email },
            include: {
                preferences: true,
                healthAndDietary: true,
                weights: {
                    orderBy: { date: "desc" },
                    take: 1,
                },
                stats: {
                    include: {
                        daily: {
                            orderBy: { date: "desc" },
                            take: 7,
                        },
                    },
                },
            },
        });

        const summary = await generateUserSummary(userData);

        return NextResponse.json({ success: true, summary }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            {
                error: "Failed to generate summary",
                details:
                    error instanceof Error ? error.message : "Unknown error",
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
}
