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

        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                preferences: true,
                healthAndDietary: true,
                stats: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const userNotRegisteredWithGoogle = user.googleId ? false : true;
        // Sanitize the user object
        const userToSend = {
            id: user.id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            dob: user.dob,
            age: user.age,
            profilePic : user.profilePic,
            gender: user.gender,
            height: user.height,
            additionalInfo: user.additionalInfo,
            userNotRegisteredWithGoogle,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            preferences: user.preferences,
            healthAndDietary: user.healthAndDietary,
            stats: user.stats,
        };

        return NextResponse.json({
            success: true,
            user: userToSend,
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
