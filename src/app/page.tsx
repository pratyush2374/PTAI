"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import AboutUs from "./page-components/AboutUs";
import ContactUs from "./page-components/ContactUs";
import Features from "./page-components/Features";
import Footer from "./page-components/Footer";
import Header from "./page-components/Header";
import Hero1 from "./page-components/Hero1";

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
        </>
    );
}

// export default dynamic (() => Promise.resolve(LandingPage), {ssr: false})
export default LandingPage;
