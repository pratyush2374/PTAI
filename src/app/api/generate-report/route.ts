import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prismaClient";
import generateReport from "@/core/generateReport";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });
        const email = token?.email;
        const { which, bloodPressureData } = await req.json();

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized: Please log in" },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
            include : {
                preferences: true,
                healthAndDietary: true,   
            }
        });

        const report = await generateReport(which, bloodPressureData, user);
        
        return NextResponse.json({
            success: true,
            report
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
