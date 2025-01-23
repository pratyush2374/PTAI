import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import AccountSettings from "./account-setting-components/AccountSettings";
import Navbar from "../(common-components)/Navbar";

export const metadata: Metadata = {
    title: "Account Settings - PTAI | Personal Trainer AI",
    metadataBase: new URL('https://ptai.vercel.app'),
    description:
        "Manage your account settings on PTAI. Update your profile, change your preferences, and securely manage your account for a seamless fitness experience.",
    keywords:
        "PTAI account settings, update profile, fitness account management, AI fitness preferences, account security, health tracking settings",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "Account Settings - PTAI | Personal Trainer AI",
        description:
            "Easily manage your PTAI account settings. Update personal details, customize fitness preferences, and ensure your account is secure for optimal tracking.",
        siteName: "PTAI - Personal Trainer AI",
        images: [
            {
                url: "/Landing%20Images/SettingsIcon.svg", 
                width: 1200,
                height: 630,
                alt: "PTAI Account Settings",
            },
        ],
        type: "website",
        locale: "en_US",
    },

    icons: {
        icon: "/Landing%20Images/SettingsIcon.svg", 
    },
};

const Page: React.FC = () => {
    return (
        <>
            <Navbar />
            <AccountSettings />
            <Toaster />
        </>
    );
};

export default Page;
