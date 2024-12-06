import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    fullName: string;
    userName?: string;
    email: string;
    isVerified: boolean;
    googleId?: string;
    verifyCode: string;
  }

  interface Session {
    user: {
      _id: string;
      fullName: string;
      userName?: string;
      isVerified: boolean;
      email: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    fullName: string;
    userName?: string;
    isVerified: boolean;
    email: string;
  }
}
