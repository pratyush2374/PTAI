import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;  
        fullName: string;
        email: string;
        googleId?: string;
        image?: string;
    }

    interface Session {
        user: {
            id: string;  
            fullName: string;
            email: string;
            googleId?: string;
            image?: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;  
        fullName: string;
        email: string;
        googleId?: string;
        image?: string;
    }
}
