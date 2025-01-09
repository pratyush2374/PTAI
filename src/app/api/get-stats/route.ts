import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prismaClient";


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

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let userStats = null;

        if (token?.id) {
            userStats = await prisma.stats.findFirst({
                where: {
                    userId: token?.id,
                },
                include: {
                    daily: {
                        where: {
                            date: {
                                gte: today,
                                lt: new Date(
                                    today.getTime() + 24 * 60 * 60 * 1000
                                ),
                            },
                        },
                    },
                },
            });
        } else {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            userStats = await prisma.stats.findFirst({
                where: {
                    userId: user?.id,
                },
                include: {
                    daily: {
                        where: {
                            date: {
                                gte: today,
                                lt: new Date(
                                    today.getTime() + 24 * 60 * 60 * 1000
                                ),
                            },
                        },
                        take: 1,
                    },
                },
            });
        }

        return NextResponse.json({
            success: true,
            userStats: { ...userStats, daily: userStats?.daily[0] },
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
