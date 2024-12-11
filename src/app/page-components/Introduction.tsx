import React from "react";
import Image from "next/image";

const Introduction: React.FC = () => {
    const sections = [
        {
            id: "transform-body",
            imageSrc: "/Landing Images/lunges.png",
            imageAlt: "Exercise Demonstration",
            imageClass: "image-left",
            title: "Transform Your Body",
            subtitle: "Discover effective exercise techniques to build strength and improve fitness",
            sectionClass: "section-left",
            textContainerClass: "text-container-right",
        },
        {
            id: "optimize-nutrition",
            imageSrc: "/Landing Images/plate.png",
            imageAlt: "Nutrition Plate",
            imageClass: "image-right",
            title: "Optimize Your Nutrition",
            subtitle: "Personalized meal plans designed to fuel your body and support your goals",
            sectionClass: "section-right",
            textContainerClass: "text-container",
        },
    ];

    return (
        <div className="intro-container">
            {sections.map((section) => (
                <div
                    key={section.id}
                    className={`intro-section ${section.sectionClass}`}
                >
                    {section.imageClass.includes("left") && (
                        <div className={`image-container ${section.imageClass}`}>
                            <Image
                                src={section.imageSrc}
                                alt={section.imageAlt}
                                width={300}
                                height={300}
                                className="section-image"
                            />
                        </div>
                    )}
                    <div className={section.textContainerClass}>
                        <h1 className="section-title">{section.title}</h1>
                        <h3 className="section-subtitle">{section.subtitle}</h3>
                    </div>
                    {section.imageClass.includes("right") && (
                        <div className={`image-container ${section.imageClass}`}>
                            <Image
                                src={section.imageSrc}
                                alt={section.imageAlt}
                                width={300}
                                height={300}
                                className="section-image"
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Introduction;
