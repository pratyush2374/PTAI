import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { name, email, message } = await req.json();

        console.log(name, email, message);

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
