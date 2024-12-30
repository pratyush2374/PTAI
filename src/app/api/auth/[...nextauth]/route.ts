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
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;

                if (account?.provider == "google") {
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
                session.user.googleId = token.googleId;
                session.user.image = token.image;
            }
            return session;
        },

        async signIn({ profile, credentials }) {
            const email = profile?.email;

            if (email) {
                const userFoundInDB = await prisma.user.findUnique({
                    where: { email },
                });
                if (userFoundInDB) {
                    return "/dashboard";
                }
                return true;
            }
            return true;
        },
    },
});

export { handler as GET, handler as POST };
