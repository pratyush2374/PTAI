import React from "react";
import Image from "next/image";

const Introduction: React.FC = () => {
    return (
        <div className="intro-container">
            <div className="intro-section section-left">
                <div className="image-container image-left">
                    <Image
                        src="/Landing Images/lunges.png"
                        alt="Exercise Demonstration"
                        width={300}
                        height={300}
                        className="section-image"
                    />
                </div>
                <div className="text-container">
                    <h1 className="section-title">Transform Your Body</h1>
                    <h3 className="section-subtitle">
                        Discover effective exercise techniques to build strength
                        and improve fitness
                    </h3>
                </div>
            </div>

            <div className="intro-section section-right">
                <div className="text-container-plate">
                    <h1 className="section-title">Optimize Your Nutrition</h1>
                    <h3 className="section-subtitle">
                        Personalized meal plans designed to fuel your body and
                        support your goals
                    </h3>
                </div>
                <div className="image-container-plate image-right">
                    <Image
                        src="/Landing Images/plate.png"
                        alt="Nutrition Plate"
                        width={300}
                        height={300}
                        className="section-image"
                    />
                </div>
            </div>
        </div>
    );
};

export default Introduction;
