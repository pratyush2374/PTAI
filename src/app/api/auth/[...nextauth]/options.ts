import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<any> {
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });
                if (!user) throw new Error("No user found with this email");

                const password = credentials.password;
                const isValidPassword = await bcrypt.compare(
                    password,
                    user.password
                );
                if (!isValidPassword) throw new Error("Invalid password");

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
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token._id = user._id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token.id as string;
                session.user._id = token._id as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET!,
};

export default authOptions;
