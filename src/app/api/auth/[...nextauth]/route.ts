import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";

const prisma = new PrismaClient();

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<any> {
                const { email, password } = credentials;

                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });

                if (!user) {
                    throw new Error("User not found");
                }

                // Compare the hashed password in the database with the provided password
                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                );

                // If the password does not match, return error
                if (!isPasswordValid) {
                    throw new Error("Incorrect password");
                }

                return user;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    scope: "openid email profile https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.sleep.read",
                },
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;

                //Checking if the user is in DB
                const isNewUser = await prisma.user.findUnique({
                    where: {
                        email: user.email,
                    },
                });

                //If the user is new, set isNewUser to false else true
                if (isNewUser) {
                    token.isNewUser = false;
                }else {
                    token.isNewUser = true;
                }

                if (account?.provider == "google") {
                    token.accessToken = account?.access_token;
                    token.refreshToken = account?.refresh_token;
                    token.googleId = profile?.sub;
                    token.image = profile?.image;
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.isNewUser = token.isNewUser;
                session.user.googleId = token.googleId;
                session.user.image = token.image;
                session.user.accessToken = token?.accessToken;
                session.user.refreshToken = token?.refreshToken;
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };
