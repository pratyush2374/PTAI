import { Metadata } from "next";
import UserInput from "./user-input-components/userInput";
import { Toaster } from "@/components/ui/toaster";


export const metadata: Metadata = {
    title: "User Input - PTAI | Personal Trainer AI",
    description:
        "Provide your personal details and fitness preferences to get AI-powered recommendations for your diet and exercise plans. Customize your fitness journey with PTAI.",
    keywords:
        "PTAI user input, fitness data entry, personalized fitness plans, AI fitness recommendations, diet and exercise input, fitness customization",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "User Input - PTAI | Personal Trainer AI",
        description:
            "Enter your fitness details to receive personalized diet and exercise plans powered by AI. Start your journey towards your health goals with PTAI.",
        url: "http://localhost:3000/user-input",
        siteName: "PTAI - Personal Trainer AI",
        images: [
            {
                url: "/Landing%20Images/Icon.svg",
                width: 1200,
                height: 630,
                alt: "PTAI User Input",
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
            <UserInput />;
            <Toaster />
        </>
    );
}
