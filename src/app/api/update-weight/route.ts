import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prismaClient";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });
        const email = token?.email;
        const { weight } = await req.json();

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized: Please log in" },
                { status: 401 }
            );
        }

        // Fetch weight data

        if (token?.id) {
            await prisma.weight.create({
                data: {
                    date: new Date(),
                    weight: Number(weight),
                    userId: token?.id,
                },
            });
        } else {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            const userIdFromUser = user?.id;
            await prisma.weight.create({
                data: {
                    date: new Date(),
                    weight: Number(weight),
                    userId: userIdFromUser!,
                },
            });
        }

        return NextResponse.json({
            success: true,
            message: "Weight updated successfully",
        });
    } catch (error: any) {
        console.log(error.message);
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
