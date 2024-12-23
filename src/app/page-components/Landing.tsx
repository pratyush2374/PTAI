"use client";
import { useEffect, useState } from "react";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Hero1 from "./Hero1";
import { Toaster } from "@/components/ui/toaster";

function LandingPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;
    return (
        <>
            <Header />
            <Hero1 />
            <Features />
            <AboutUs />
            <ContactUs />
            <Footer />
            <Toaster />
        </>
    );
}

export default LandingPage;
