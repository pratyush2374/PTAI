import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });
        const email = token?.email;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized: Please log in" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { fullName, dob, age, height, additionalInfo } = body;

        // Input validation
        if (!fullName || !dob || !height) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Convert height to number if it's a string
        const heightNum =
            typeof height === "string" ? parseFloat(height) : height;

        // Update user data
        const updatedUser = await prisma.user.update({
            where: {
                email: email as string,
            },
            data: {
                fullName,
                dob: new Date(dob),
                age,
                height: heightNum,
                additionalInfo,
                updatedAt: new Date(),
            },
        });

        if (!updatedUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Personal details updated successfully",
            user: {
                fullName: updatedUser.fullName,
                dob: updatedUser.dob,
                age: updatedUser.age,
                height: updatedUser.height,
                additionalInfo: updatedUser.additionalInfo,
            },
        });
    } catch (error: any) {
        console.error("Error updating personal details:", error);
        return NextResponse.json(
            {
                error: "Failed to update personal details",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
