import { Metadata } from "next";
import Exercise from "./exercise-components/Exercise";

export const metadata: Metadata = {
    title: "Exercise - PTAI | Personal Trainer AI",
    metadataBase: new URL('https://ptai.vercel.app'),
    description:
        "Explore personalized exercise plans tailored to your fitness goals with PTAI. Enhance your health journey with AI-driven recommendations.",
    keywords:
        "PTAI exercise plans, personalized workouts, AI fitness routines, exercise tracker, fitness goals, AI health recommendations, exercise dashboard",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "Exercise - PTAI | Personal Trainer AI",
        description:
            "Discover personalized exercise routines to achieve your fitness goals. Leverage AI-powered insights to optimize your health journey with PTAI.",
        siteName: "PTAI - Personal Trainer AI",
        images: [
            {
                url: "/Landing%20Images/Icon.svg",
                width: 1200,
                height: 630,
                alt: "PTAI Exercise Page",
            },
        ],
        type: "website",
        locale: "en_US",
    },

    icons: {
        icon: "/Landing%20Images/Icon.svg",
    },
};

const Page: React.FC = () => {
    return (
        <>
            <Exercise />
        </>
    );
};

export default Page;
