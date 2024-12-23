import { Metadata } from "next";
import SignUp from "./signUp";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
    title: "Sign Up - PTAI | Personal Trainer AI",
    description:
        "Join PTAI today and get personalized diet and exercise plans powered by AI. Take the first step towards your fitness goals now!",
    keywords:
        "PTAI sign up, personal trainer AI, fitness app registration, diet plans, exercise plans, personalized fitness, AI fitness app",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "Sign Up - PTAI | Personal Trainer AI",
        description:
            "Create your account with PTAI and unlock AI-powered diet and exercise plans tailored to your fitness journey.",
        url: "http://localhost:3000/signup",
        siteName: "PTAI - Personal Trainer AI",
        images: [
            {
                url: "/Landing%20Images/Icon.svg",
                width: 1200,
                height: 630,
                alt: "PTAI Sign Up",
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
            <Toaster />
            <SignUp />
        </>
    );
}
