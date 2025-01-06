import { Metadata } from "next";
import HealthAndStats from "./health-and-stats-components/HealthAndStats";

export const metadata: Metadata = {
    title: "Health & Stats - PTAI | Personal Trainer AI",
    description:
        "Track your health stats, monitor progress, and view AI-powered recommendations to achieve your fitness goals with PTAI.",
    keywords:
        "PTAI health tracker, personalized stats, AI fitness tracking, health stats, fitness progress, diet and exercise plans, AI health monitoring",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "Health & Stats - PTAI | Personal Trainer AI",
        description:
            "Monitor your health stats and track progress with AI-recommended fitness plans. Stay on top of your health journey with PTAI.",
        url: "http://localhost:3000/health-and-stats",
        siteName: "PTAI - Personal Trainer AI",
        images: [
            {
                url: "/Landing%20Images/Icon.svg",
                width: 1200,
                height: 630,
                alt: "PTAI Health and Stats",
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
    return <HealthAndStats />;
}
