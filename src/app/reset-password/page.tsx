import { Metadata } from "next";
import ResetPassword from "./resetPassword";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
    title: "Reset Password - PTAI | Personal Trainer AI",
    metadataBase: new URL('http://localhost:3000'),
    description:
        "Reset your password securely to regain access to your Personal Trainer AI account. Enter a new password and confirm to continue.",
    keywords:
        "reset password, PTAI, Personal Trainer AI, password recovery, secure password reset, AI fitness account",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "Reset Password - PTAI | Personal Trainer AI",
        description:
            "Securely reset your password to access your PTAI account and continue your fitness journey with personalized AI-powered recommendations.",
        siteName: "PTAI - Personal Trainer AI",
        images: [
            {
                url: "/Landing%20Images/Icon.svg",
                width: 1200,
                height: 630,
                alt: "PTAI Reset Password",
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
            <ResetPassword />
            <Toaster />
        </>
    );
};

export default Page;
