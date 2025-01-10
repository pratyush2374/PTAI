import sendEmail from "@/lib/emailSender";
import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const { fullName, email } = await req.json();

        // Validate the input
        if (!fullName || !email) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Invalid email format" },
                { status: 400 }
            );
        }

        // Check if the email already exists in the database
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists, try signing in" },
                { status: 401 } 
            );
        }

        // Generate a verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        // Send the email with the verification code
        try {
            await sendEmail(fullName, email, verificationCode);
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            return NextResponse.json(
                { message: "Failed to send email. Please try again later." },
                { status: 500 }
            );
        }

        // Respond with success, but omit sending the verificationCode in response
        return NextResponse.json(
            { message: "Verification email sent successfully", verificationCode},
            { status: 200 }
        );
    } catch (error) {
        console.error("Internal Server Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
