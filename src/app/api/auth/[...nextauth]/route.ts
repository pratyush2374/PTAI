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
                const hashedPassword = await bcrypt.hash(password, 11);
                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });

                if (!user) {
                    throw new Error("User not found");
                }

                if (user.password !== hashedPassword) {
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
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        },

        async signIn({ profile, credentials }) {
            const email = (credentials?.email as string) || profile?.email;

            if (!email) {
                return "/error";
            }
            const userFoundInDB = await prisma.user.findUnique({
                where: { email },
            });
            if (userFoundInDB) {
                return "/dashboard";
            } else {
                const tokenifyData = {
                    name: profile?.name,
                    email,
                    googleId: profile?.sub,
                    image: profile?.image,
                };
                const token = generateToken(tokenifyData);
                return `/user-input?token=${encodeURIComponent(token)}`;
            }
        },
        // async redirect()
    },
});

export { handler as GET, handler as POST };
