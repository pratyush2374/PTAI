import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });
        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const email = token.email;

        const response = await axios.post("/api/get-gfit-data", { email });

        if(response.status == 200) {
            
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Failed to get user stats",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
