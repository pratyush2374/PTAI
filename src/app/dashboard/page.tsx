import { Metadata } from "next";
import Dashboard from "./dashboard-components/Dashboard";

export const metadata: Metadata = {
    title: "Dashboard - PTAI | Personal Trainer AI",
    metadataBase: new URL('https://ptai.vercel.app'),
    description:
        "Access your personalized dashboard to track your fitness journey, view AI-recommended diet and exercise plans, and monitor progress towards your health goals.",
    keywords:
        "PTAI dashboard, personalized fitness tracker, AI fitness plans, diet tracker, exercise tracker, fitness progress, health dashboard, AI health tracking",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "Dashboard - PTAI | Personal Trainer AI",
        description:
            "View your personalized dashboard to track your fitness goals and access AI-powered diet and exercise plans. Stay motivated on your health journey with PTAI.",
        siteName: "PTAI - Personal Trainer AI",
        images: [
            {
                url: "/Landing%20Images/Icon.svg",
                width: 1200,
                height: 630,
                alt: "PTAI Dashboard",
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
    return <Dashboard />;
}
