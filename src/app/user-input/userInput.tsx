"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./userinput.module.css";
import { useToast } from "@/hooks/use-toast";

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
    const [availableEquipments, setAvailableEquipments] = useState<string[]>(
        []
    );
    const [experience, setExperience] = useState("");
    const [pace, setPace] = useState("");
    const [goal, setGoal] = useState<string[]>([]);
    const [macroNutrientPreferences, setMacroNutrientPreferences] = useState<
        string[]
    >([]);
    const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
    const [healthProblems, setHealthProblems] = useState<string[]>([]);
    const [allergies, setAllergies] = useState<string[]>([]);
    const [additionalInfo, setAdditionalInfo] = useState<string>("");

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

    const toggleEquipment = (equipment: string) => {
        setAvailableEquipments((prev) =>
            prev.includes(equipment)
                ? prev.filter((item) => item !== equipment)
                : [...prev, equipment]
        );
    };

    const toggleGoal = (selectedGoal: string) => {
        setGoal((prev) =>
            prev.includes(selectedGoal)
                ? prev.filter((goal) => goal !== selectedGoal)
                : [...prev, selectedGoal]
        );
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

    const handleMultiSelectMacroNutrient = (value: string) => {
        setMacroNutrientPreferences((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    const handleMultiSelectDietary = (value: string) => {
        setDietaryPreferences((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

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
    const handleAdditionalInfoChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setAdditionalInfo(event.target.value);
    };

    const goals = [
        "Lose Weight",
        "Gain Weight",
        "Build Muscle",
        "Stay Fit",
        "Increase Stamina",
        "Improve Flexibility",
        "Boost Overall Strength",
        "Improve Mobility and Joint Health",
        "Increase Endurance",
        "Build Core Strength",
    ];

    const equipmentOptions = [
        "No Equipment",
        "Dumbell",
        "Treadmills",
        "Ellipticals",
        "Rowing Machines",
        "Stair Climbers",
        "Weight Plates",
        "Leg Press Machine",
        "Chest Press Machine",
        "Lat Pulldown Machine",
        "Seated Row Machine",
        "Adjustable Bench",
        "Flat Bench",
        "Squat Rack",
        "Barbell",
        "Resistance Bands",
        "Kettlebell",
        "Exercise Ball",
        "Medicine Ball",
        "Pull-Up Bar",
        "Jump Rope",
        "Treadmill",
        "Stationary Bike",
        "Rowing Machine",
        "Elliptical Machine",
        "Bench",
        "Yoga Mat",
        "Battle Ropes",
        "Smith Machine",
        "Cable Machine",
    ];

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
                        Step {step} / 7
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

                {step === 2 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-black">
                            Fitness Preferences
                        </h2>

                        <h3 className="text-lg font-semibold text-black">
                            Activity Level
                        </h3>
                        <div className="flex flex-wrap gap-4">
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
                                        className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 text-sm md:text-base ${
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
                                    2,
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

                {step === 3 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-black">
                            Select Your Fitness Goals
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {goals.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => toggleGoal(option)}
                                    className={`p-4 rounded-lg font-bold transition-all duration-200 ${
                                        goal.includes(option)
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-black hover:bg-gray-300"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        <h3 className="text-lg font-semibold text-black">
                            Select Your Exercise Experience
                        </h3>
                        <div className="flex flex-wrap justify-center items-center gap-4 sm:justify-start">
                            {["Beginner", "Intermediate", "Advanced"].map(
                                (option) => (
                                    <button
                                        key={option}
                                        onClick={() => setExperience(option)}
                                        className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
                                            experience === option
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
                            Select Your Pace
                        </h3>
                        <div className="flex gap-4">
                            {["Slow", "Moderate", "Fast"].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setPace(option)}
                                    className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
                                        pace === option
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
                                handleNextStep(3, [pace, experience], [goal])
                            }
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Next
                        </button>
                    </div>
                )}

                {step == 4 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-black">
                            Select Available Equipments
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {equipmentOptions.map((equipment) => (
                                <button
                                    key={equipment}
                                    onClick={() => toggleEquipment(equipment)}
                                    className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
                                        availableEquipments.includes(equipment)
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-black hover:bg-gray-300"
                                    }`}
                                >
                                    {equipment}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() =>
                                handleNextStep(4, [], [availableEquipments])
                            }
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Next
                        </button>
                    </div>
                )}

                {step === 5 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-black">
                            Macro Nutrient Preferences
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {[
                                "Balanced",
                                "High Protein",
                                "High Carb",
                                "High Fat",
                                "Low Carb",
                                "Low Fat",
                                "Low Sugar",
                                "Vegan",
                                "Vegetarian",
                                "Gluten Free",
                                "Dairy Free",
                                "Low Sodium",
                                "High Fiber",
                                "Keto",
                                "Paleo",
                                "Intermittent Fasting",
                            ].map((option) => (
                                <button
                                    key={option}
                                    onClick={() =>
                                        handleMultiSelectMacroNutrient(option)
                                    }
                                    className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
                                        macroNutrientPreferences.includes(
                                            option
                                        )
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-black hover:bg-gray-300"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        {/* Dietary Preferences */}
                        <h3 className="text-lg font-semibold text-black">
                            Dietary Preferences
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {[
                                "Chicken",
                                "Pork",
                                "Lamb",
                                "Fish",
                                "Eggs",
                                "Dairy",
                                "Shellfish",
                                "Tofu",
                                "Nuts",
                                "Seeds",
                                "Gluten",
                                "Soy",
                                "Wheat",
                                "Legumes",
                                "Raw Food",
                            ].map((option) => (
                                <button
                                    key={option}
                                    onClick={() =>
                                        handleMultiSelectDietary(option)
                                    }
                                    className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
                                        dietaryPreferences.includes(option)
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
                                    5,
                                    [
                                        activityLevel,
                                        workoutDuration,
                                        exerciseFrequency,
                                    ],
                                    [
                                        preferredExerciseType,
                                        macroNutrientPreferences,
                                        dietaryPreferences,
                                    ]
                                )
                            }
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Next
                        </button>
                    </div>
                )}
                {step === 6 && (
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
                                    onClick={() =>
                                        handleHealthProblemsSelect(option)
                                    }
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
                                    onClick={() =>
                                        handleAllergiesSelect(option)
                                    }
                                    className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
                                        allergies.includes(option)
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-black hover:bg-gray-300"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                            <button
                                onClick={() =>
                                    handleNextStep(
                                        6,
                                        [],
                                        [healthProblems, allergies]
                                    )
                                }
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {step === 7 && (
                    <>
                        <h3 className="text-lg font-semibold text-black">
                            Any additional information?
                        </h3>
                        <textarea
                            value={additionalInfo}
                            onChange={handleAdditionalInfoChange}
                            className="mt-2 p-4 border rounded-lg w-full h-32 resize-none"
                            placeholder="Feel free to share any other details... (optional)"
                        ></textarea>
                        <button
                            onClick={() => console.log("Done !")}
                            className="mt-4 bg-blue-500 text-white p-3 px-6 rounded-lg font-bold transition-all duration-200 hover:bg-blue-600"
                        >
                            <Link href={"/dashboard"}>Complete Sign Up</Link>
                        </button>
                    </>
                )}
                
            </div>
        </div>
    );
};

export default UserInput;
