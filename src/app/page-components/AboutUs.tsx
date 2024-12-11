"use client"; // Indicating this component is client-side rendered

import Image from "next/image";

const AboutUs: React.FC = () => {
    const aboutContent = {
        title: "About PTAI",
        tagline: "Transform Your Fitness Journey with AI",
        description: `At PTAI, we believe in the power of artificial intelligence to enhance your physical fitness journey. 
        Our state-of-the-art AI technology offers personalized workout plans, real-time progress tracking, and smart 
        recommendations to help you achieve your fitness goals efficiently and effectively.`,
    };

    return (
        <>
            <div className="about-us" id="about">
                <div className="about-content">
                    <h1>{aboutContent.title}</h1>
                    <p>{aboutContent.tagline}</p>
                    <p>{aboutContent.description}</p>
                </div>
                <div className="about-image">
                    <Image
                        src="/Landing Images/exercise.jpg"
                        alt="PTAI Physical Fitness"
                        width={400}
                        height={400}
                        layout="responsive"
                    />
                </div>
            </div>

            <div className="seperator"></div>
        </>
    );
};

export default AboutUs;