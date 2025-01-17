import { generateToken } from "@/lib/jwt";
import prisma from "@/lib/prismaClient";
import sendResetPasswordEmail from "@/lib/resetPasswordEmail";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { email } = await req.json();

        // Validate email input
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || typeof email !== "string" || !emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Invalid email address" },
                { status: 400 }
            );
        }

        // Check if the CLIENT_URL is configured
        if (!process.env.CLIENT_URL) {
            console.error("CLIENT_URL environment variable is not set");
            return NextResponse.json(
                { message: "Server configuration error" },
                { status: 500 }
            );
        }

        // Look for the user in the database
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                {
                    message:
                        "If the email is registered, you will receive a reset link",
                },
                { status: 200 }
            );
        }

        // Generate a reset token
        const tokenData = { email: user.email };
        const token = generateToken(tokenData);

        // Create a password reset link
        const resetLink = `${
            process.env.CLIENT_URL
        }/reset-password?token=${encodeURIComponent(token)}`;

        // Send the reset email
        await sendResetPasswordEmail(user.fullName, user.email, resetLink);

        return NextResponse.json(
            {
                message:
                    "If the email is registered, you will receive a reset link",
            },
            { status: 200 }
        );
    } catch (error) {
        // Log the error for debugging
        console.error("Error in password reset flow:", error);

        return NextResponse.json(
            {
                message:
                    "An unexpected error occurred. Please try again later.",
            },
            { status: 500 }
        );
    }
};
