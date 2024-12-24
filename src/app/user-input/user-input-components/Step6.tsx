import React from "react";

interface Step6Props {
    healthProblems: string[];
    allergies: string[];
    setHealthProblems: React.Dispatch<React.SetStateAction<string[]>>;
    setAllergies: React.Dispatch<React.SetStateAction<string[]>>;
    onNext: () => void;
}

const Step6: React.FC<Step6Props> = ({
    healthProblems,
    allergies,
    setHealthProblems,
    setAllergies,
    onNext,
}) => {
    const handleHealthProblemsSelect = (value: string) => {
        setHealthProblems((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    const handleAllergiesSelect = (value: string) => {
        setAllergies((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    return (
        <>
            <h3 className="text-lg font-semibold text-black mb-3">
                Select Health Problems
            </h3>
            <div className="flex gap-4 flex-wrap">
                {[
                    "None",
                    "Diabetes",
                    "Hypertension",
                    "High Cholesterol",
                    "Heart Disease",
                    "Obesity",
                    "Asthma",
                    "Arthritis",
                    "Lactose Intolerance",
                    "Gluten Intolerance",
                    "Acid Reflux",
                    "Irritable Bowel Syndrome (IBS)",
                    "Insomnia",
                    "Thyroid Disorders",
                    "PCOS",
                ].map((option) => (
                    <button
                        key={option}
                        onClick={() => handleHealthProblemsSelect(option)}
                        className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
                            healthProblems.includes(option)
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <h3 className="text-lg font-semibold text-black mt-4 mb-3">
                Select Allergies
            </h3>
            <div className="flex gap-4 flex-wrap">
                {[
                    "None",
                    "Peanuts",
                    "Tree Nuts",
                    "Shellfish",
                    "Fish",
                    "Eggs",
                    "Milk",
                    "Soy",
                    "Wheat",
                    "Seeds",
                    "Mustard",
                    "Legumes",
                    "Gluten",
                    "Pollen",
                    "Dust Mites",
                    "Mold",
                ].map((option) => (
                    <button
                        key={option}
                        onClick={() => handleAllergiesSelect(option)}
                        className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
                            allergies.includes(option)
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <button
                onClick={onNext}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Next
            </button>
        </>
    );
};

export default Step6;
