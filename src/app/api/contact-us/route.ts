import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { name, email, message } = await req.json();

        return NextResponse.json(
            { message: "Received data" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error occured", error);
        
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
