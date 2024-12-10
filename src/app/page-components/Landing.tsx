"use client";
import { useEffect, useState } from "react";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Hero1 from "./Hero1";
import Introduction from "./Introduction";

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
