import { Metadata } from "next";
import SignIn from "./signIn";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
    title: "Sign In - PTAI | Personal Trainer AI",
    metadataBase: new URL('http://localhost:3000'),
    description:
        "Sign in to your PTAI account to access personalized diet and exercise plans tailored to your fitness goals. Stay on track with AI-powered fitness insights.",
    keywords:
        "PTAI sign in, personal trainer AI, fitness app login, diet plans, exercise plans, personalized fitness, AI fitness app",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "Sign In - PTAI | Personal Trainer AI",
        description:
            "Log in to your PTAI account and continue your fitness journey with AI-powered personalized plans.",
        siteName: "PTAI - Personal Trainer AI",
        images: [
            {
                url: "/Landing%20Images/Icon.svg",
                width: 1200,
                height: 630,
                alt: "PTAI Sign In",
            },
        ],
        type: "website",
        locale: "en_US",
    },

    icons: {
        icon: "/Landing%20Images/Icon.svg",
    },
};

export default function Page() {
    return (
        <>
            <SignIn />
            <Toaster />
        </>
    );
}
