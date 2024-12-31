import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/lib/jwt";
import prisma from "@/lib/prismaClient";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { token, password } = body;

        if (!token || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Decode and verify the token
        try {
            const decodedToken = decodeToken(token);

            // Extract email from decoded token
            const userEmail = decodedToken!.email;

            if (!userEmail) {
                return NextResponse.json(
                    { message: "Invalid reset token" },
                    { status: 400 }
                );
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Update the user's password in the database
            const updatedUser = await prisma.user.update({
                where: {
                    email: userEmail,
                },
                data: {
                    password: hashedPassword,
                },
            });

            if (!updatedUser) {
                return NextResponse.json(
                    { message: "User not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json(
                { message: "Password reset successful" },
                { status: 200 }
            );
        } catch (tokenError) {
            return NextResponse.json(
                { message: "Invalid reset token" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error changing password:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
