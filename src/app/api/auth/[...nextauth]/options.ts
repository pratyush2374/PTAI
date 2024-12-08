import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import User from "@/models/user.model"; 
import connectToDB from "@/lib/dbConnection";

// Validate environment variables
if (
    !process.env.GOOGLE_CLIENT_ID ||
    !process.env.GOOGLE_CLIENT_SECRET ||
    !process.env.NEXTAUTH_SECRET
) {
    throw new Error("Missing required environment variables");
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<any> {
                if (!credentials) {
                    throw new Error("Credentials not provided");
                }

                await connectToDB();

                try {
                    const user = await User.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier },
                        ],
                    });

                    if (!user) {
                        throw new Error("No user found with this email");
                    }

                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error("Incorrect password");
                    }
                } catch (error: any) {
                    throw new Error(error);
                }
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            async profile(profile: any): Promise<any> {
                try {
                    await connectToDB(); 

                    let user: any = await User.findOne({
                        googleId: profile.id,
                    });

                    if (!user) {
                        user = await User.create({
                            fullName: profile.name,
                            email: profile.email,
                            googleId: profile.id,
                            isVerified: true,
                            // Consider adding a default username or generation logic
                            username: profile.email.split("@")[0],
                        });
                    }

                    return {
                        id: user._id.toString(),
                        fullName: user.fullName,
                        userName: user.userName || profile.email.split("@")[0],
                        isVerified: user.isVerified,
                        email: user.email, // Consider adding email to the returned object
                    };
                } catch (error) {
                    console.error("Google authentication error:", error);
                    throw new Error("Authentication failed");
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.fullName = user.fullName;
                token.userName = user.userName;
                token.isVerified = user.isVerified;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.fullName = token.fullName;
                session.user.userName = token.userName;
                session.user.isVerified = token.isVerified;
            }
            return session;
        },
    },

    pages: {
        signIn: "/sign-in", 
    },

    secret: process.env.NEXTAUTH_SECRET,
};
