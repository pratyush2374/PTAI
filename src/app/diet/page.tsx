import { Metadata } from "next";
import Diet from "./diet-components/Diet";

export const metadata: Metadata = {
    title: "Diet - PTAI | Personal Trainer AI",
    metadataBase: new URL('http://localhost:3000'),
    description:
        "Access personalized diet plans tailored to your health and fitness goals with PTAI. Optimize your nutrition with AI-powered recommendations.",
    keywords:
        "PTAI diet plans, personalized nutrition, AI meal recommendations, diet tracker, healthy eating, fitness goals, AI health tips, diet dashboard",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "Diet - PTAI | Personal Trainer AI",
        description:
            "Discover AI-powered diet plans customized to your fitness goals. Track your nutrition and achieve optimal health with PTAI.",
        siteName: "PTAI - Personal Trainer AI",
        images: [
            {
                url: "/Landing%20Images/Icon.svg",
                width: 1200,
                height: 630,
                alt: "PTAI Diet Page",
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
            <Diet />
        </>
    );
};

export default Page;
