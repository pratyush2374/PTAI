import { Metadata } from "next";
import LandingPage from "@/app/page-components/Landing";

export const metadata: Metadata = {
    title: "PTAI - Personal Trainer AI",
    metadataBase: new URL("https://ptai.vercel.app"),
    description:
        "PTAI is an AI-powered personal fitness app that tailors diet and exercise plans to your individual goals. Start your journey towards a healthier, fitter you today!",
    keywords:
        "PTAI, personal trainer, AI, fitness app, exercise plans, diet plans, health app, personalized fitness, AI for fitness, workout app",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "PTAI - Personal Trainer AI",
        description:
            "Transform your fitness journey with personalized, AI-powered diet and exercise plans tailored to your unique goals.",
        siteName: "PTAI - Personal Trainer AI",
        images: [
            {
                url: "/Landing%20Images/Icon.svg",
                width: 1200,
                height: 630,
                alt: "PTAI - Personal Trainer AI",
            },
        ],
        type: "website",
        locale: "en_US",
    },

    icons: {
        icon: "/Landing%20Images/Icon.svg",
    },
};
export default function Landing() {
    return <LandingPage />;
}
