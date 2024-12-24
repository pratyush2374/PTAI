import React from "react";

interface Step1Props {
    height: string;
    weight: string;
    dob: string;
    gender: string;
    setHeight: React.Dispatch<React.SetStateAction<string>>;
    setWeight: React.Dispatch<React.SetStateAction<string>>;
    setDob: React.Dispatch<React.SetStateAction<string>>;
    setGender: React.Dispatch<React.SetStateAction<string>>;
    onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({
    height,
    weight,
    dob,
    gender,
    setHeight,
    setWeight,
    setDob,
    setGender,
    onNext,
}) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-black">
                Enter Your Details
            </h2>
            <input
                type="number"
                placeholder="Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-2 rounded bg-gray-200 text-black placeholder-gray-500"
            />
            <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2 rounded bg-gray-200 text-black placeholder-gray-500"
            />
            <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-2 rounded bg-gray-200 text-black placeholder-gray-500"
            />

            <h3 className="text-lg font-semibold text-black">
                Select Your Gender
            </h3>
            <div className="flex gap-4">
                {["Male", "Female", "Other"].map((option) => (
                    <button
                        key={option}
                        onClick={() => setGender(option)}
                        className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
                            gender === option
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
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Next
            </button>
        </div>
    );
};

export default Step1;
