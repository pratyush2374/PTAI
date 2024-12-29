// app/api/auth/check-user-status/route.ts
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import authOptions from "../[...nextauth]/options";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session) {
            return NextResponse.redirect("/sign-in");
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: session.user.email! }
        });

        if (!existingUser) {
            // Store the Google data in the session storage through a client-side script
            return new Response(
                `
                <html>
                    <body>
                        <script>
                            const userData = ${JSON.stringify(session.user)};
                            sessionStorage.setItem('googleUserData', JSON.stringify(userData));
                            window.location.href = '/user-input';
                        </script>
                    </body>
                </html>
                `,
                {
                    headers: {
                        "Content-Type": "text/html",
                    },
                }
            );
        }

        return NextResponse.redirect("/dashboard");
    } catch (error) {
        return NextResponse.redirect("/sign-in?error=Something went wrong");
    }
}