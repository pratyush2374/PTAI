import { Metadata } from "next";
import TrackDiet from "./track-diet-components/TrackDiet";

export const metadata: Metadata = {
    title: "Track Diet - PTAI | Personal Trainer AI",
    description:
        "Track your diet data, monitor calorie intake, and follow AI-recommended meal plans to achieve your fitness goals with PTAI.",
    keywords:
        "PTAI diet tracker, personalized meal plans, AI diet tracking, calorie tracker, fitness diet, health and nutrition monitoring, AI-powered diet plans",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "Track Diet - PTAI | Personal Trainer AI",
        description:
            "Monitor your diet data, track your calorie intake, and follow AI-powered meal plans to stay on top of your health goals with PTAI.",
        url: "http://localhost:3000/track-diet",
        siteName: "PTAI - Personal Trainer AI",
        images: [
            {
                url: "/Landing%20Images/Icon.svg",
                width: 1200,
                height: 630,
                alt: "PTAI Track Diet",
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
    return <TrackDiet />;
}
