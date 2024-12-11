"use client";

import React from "react";

const Features: React.FC = () => {
    const featureItems = [
        {
            id: "personalized-diet-plans",
            title: "Personalized Diet Plans",
            description:
                "Get customized diet plans tailored to your fitness goals and dietary preferences.",
        },
        {
            id: "exercise-recommendations",
            title: "Exercise Recommendations",
            description:
                "Receive exercise routines designed to help you achieve your fitness objectives effectively.",
        },
        {
            id: "progress-tracking",
            title: "Progress Tracking",
            description:
                "Track your progress with detailed analytics and insights on your fitness journey.",
        },
        {
            id: "ai-powered-insights",
            title: "AI-Powered Insights",
            description:
                "Utilize AI-driven insights to optimize your fitness regimen and dietary choices.",
        },
        {
            id: "custom-workout-plans",
            title: "Custom Workout Plans",
            description:
                "Generate workout plans that adapt to your progress and changing fitness needs.",
        },
    ];

    return (
        <>
            <div className="features" id="features">
                <div className="features-box">
                    <h1 className="font-semibold">
                        Features of HolisticFit AI
                    </h1>
                    <div className="feature-list">
                        {featureItems.map((feature) => (
                            <div key={feature.id} className="feature-item">
                                <h2 className="font-semibold">
                                    {feature.title}
                                </h2>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="seperator"></div>
        </>
    );
};

export default Features;
