"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import styles from "./userinput.module.css";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const UserInput: React.FC = () => {
    const [step, setStep] = useState(1);
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [activityLevel, setActivityLevel] = useState("");
    const [preferredExerciseType, setPreferredExerciseType] = useState<
        string[]
    >([]);
    const [workoutDuration, setWorkoutDuration] = useState("");
    const [exerciseFrequency, setExerciseFrequency] = useState("");

    const { toast } = useToast();

    const validateStep = (fields: string[], multiFields: string[][] = []) => {
        const isValid =
            fields.every((field) => field.trim() !== "") &&
            multiFields.every((fieldArray) => fieldArray.length > 0);
        if (!isValid) {
            toast({
                variant: "destructive",
                title: "Please fill all details",
            });
            return false;
        }
        return true;
    };

    const handleNextStep = (
        currentStep: number,
        requiredFields: string[],
        multiFields: string[][] = []
    ) => {
        if (validateStep(requiredFields, multiFields)) {
            setStep(currentStep + 1);
        }
    };

    const handleMultiSelect = (value: string) => {
        setPreferredExerciseType((prev) => {
            if (prev.includes(value)) {
                return prev.filter((item) => item !== value);
            } else {
                return [...prev, value];
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                    {step > 1 && (
                        <img
                            src="/UserInput Images/Back.svg"
                            alt="Back"
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => setStep(step - 1)}
                        />
                    )}
                    <h2 className="text-2xl font-bold text-black ml-4">
                        Step {step}
                    </h2>
                </div>

                {step === 1 && (
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
                            type="number"
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
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
                            onClick={() =>
                                handleNextStep(1, [height, weight, age, gender])
                            }
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Next
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-black">
                            Fitness Preferences
                        </h2>

                        <h3 className="text-lg font-semibold text-black">
                            Activity Level
                        </h3>
                        <div className="flex gap-4">
                            {[
                                "Sedentary",
                                "Light",
                                "Moderate",
                                "Active",
                                "Very active",
                            ].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setActivityLevel(option)}
                                    className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
                                        activityLevel === option
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-black hover:bg-gray-300"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        <h3 className="text-lg font-semibold text-black">
                            Preferred Exercise Type
                        </h3>
                        <div className="flex gap-4 flex-wrap">
                            {[
                                "cardio",
                                "strength",
                                "weightlifting",
                                "HIIT",
                                "pilates",
                                "aerobics",
                                "yoga",
                                "running",
                                "cycling",
                                "swimming",
                            ].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleMultiSelect(option)}
                                    className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
                                        preferredExerciseType.includes(option)
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-black hover:bg-gray-300"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        <h3 className="text-lg font-semibold text-black">
                            Workout Duration (Minutes)
                        </h3>
                        <div className="flex gap-4">
                            {["15-30", "30-45", "45-60", "60+"].map(
                                (option) => (
                                    <button
                                        key={option}
                                        onClick={() =>
                                            setWorkoutDuration(option)
                                        }
                                        className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
                                            workoutDuration === option
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-black hover:bg-gray-300"
                                        }`}
                                    >
                                        {option}
                                    </button>
                                )
                            )}
                        </div>

                        <h3 className="text-lg font-semibold text-black">
                            Exercise Frequency
                        </h3>
                        <div className="flex gap-4">
                            {["1-2", "3-4", "5-6", "daily"].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setExerciseFrequency(option)}
                                    className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
                                        exerciseFrequency === option
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-black hover:bg-gray-300"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() =>
                                handleNextStep(
                                    3,
                                    [
                                        activityLevel,
                                        workoutDuration,
                                        exerciseFrequency,
                                    ],
                                    [preferredExerciseType]
                                )
                            }
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Next
                        </button>
                    </div>
                )}

                <Toaster />
            </div>
        </div>
    );
};

export default UserInput;
