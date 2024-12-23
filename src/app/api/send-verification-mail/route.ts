import sendEmail from "@/lib/emailSender";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Parse the incoming JSON request body
        const { fullName, email } = await req.json();
        console.log(fullName, email);
        // Validate the input
        if (!fullName || !email) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        // Call the sendEmail function to send the email
        await sendEmail(fullName, email, verificationCode);

        // Respond with success
        return NextResponse.json(
            { message: "Verification email sent successfully", verificationCode },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);

        // Handle errors by sending a response
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
