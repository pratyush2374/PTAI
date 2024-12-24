// UserInput.tsx (Main Component)
"use client";

import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const UserInput: React.FC = () => {
    const [step, setStep] = useState(1);
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [dob, setDob] = useState("");
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
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { toast } = useToast();

    const submitData = async () => {
        try {
            setIsSubmitting(true);
            const user = JSON.parse(sessionStorage.getItem("user") as string);
            if (!user || !user.fullName || !user.email || !user.password) {
                toast({
                    variant: "destructive",
                    title: "Some error occured while fetching user details 1",
                    description: "Please try again",
                });
                setIsSubmitting(false);
                return;
            }

            const response = await axios.post("/api/sign-up", {
                fullName: user.fullName,
                email: user.email,
                password: user.password,
                height,
                weight,
                dob,
                gender,
                activityLevel,
                preferredExerciseType,
                workoutDuration,
                exerciseFrequency,
                availableEquipments,
                experience,
                pace,
                goal,
                macroNutrientPreferences,
                dietaryPreferences,
                healthProblems,
                allergies,
                additionalInfo,
            });
            console.log(response.data);
            if (response.status !== 200) {
                toast({
                    variant: "destructive",
                    title: "Error submitting data 2",
                    description: "Please try again",
                });
                setIsSubmitting(false);
                window.location.href = "/sign-up";
            } else {
                setIsSubmitting(false);
                toast({
                    variant: "default",
                    title: "Data submitted successfully, Redirecting...",
                });
                sessionStorage.removeItem("user");
                window.location.href = "/dashboard";
            }
        } catch (error) {
            setIsSubmitting(false);
            toast({
                variant: "destructive",
                title: "Some Error Occured 3",
                description: "Please try again",
            });
            sessionStorage.removeItem("user");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <Step1
                        height={height}
                        weight={weight}
                        dob={dob}
                        gender={gender}
                        setHeight={setHeight}
                        setWeight={setWeight}
                        setDob={setDob}
                        setGender={setGender}
                        onNext={() =>
                            validateStep([height, weight, dob, gender]) &&
                            setStep(step + 1)
                        }
                    />
                )}
                {step === 2 && (
                    <Step2
                        activityLevel={activityLevel}
                        preferredExerciseType={preferredExerciseType}
                        workoutDuration={workoutDuration}
                        exerciseFrequency={exerciseFrequency}
                        setActivityLevel={setActivityLevel}
                        setPreferredExerciseType={setPreferredExerciseType}
                        setWorkoutDuration={setWorkoutDuration}
                        setExerciseFrequency={setExerciseFrequency}
                        onNext={() =>
                            validateStep(
                                [
                                    activityLevel,
                                    workoutDuration,
                                    exerciseFrequency,
                                ],
                                [preferredExerciseType]
                            ) && setStep(step + 1)
                        }
                    />
                )}
                {step === 3 && (
                    <Step3
                        goal={goal}
                        experience={experience}
                        pace={pace}
                        setGoal={setGoal}
                        setExperience={setExperience}
                        setPace={setPace}
                        onNext={() =>
                            validateStep([pace, experience], [goal]) &&
                            setStep(step + 1)
                        }
                    />
                )}
                {step === 4 && (
                    <Step4
                        availableEquipments={availableEquipments}
                        setAvailableEquipments={setAvailableEquipments}
                        onNext={() =>
                            validateStep([], [availableEquipments]) &&
                            setStep(step + 1)
                        }
                    />
                )}
                {step === 5 && (
                    <Step5
                        macroNutrientPreferences={macroNutrientPreferences}
                        dietaryPreferences={dietaryPreferences}
                        setMacroNutrientPreferences={
                            setMacroNutrientPreferences
                        }
                        setDietaryPreferences={setDietaryPreferences}
                        onNext={() =>
                            validateStep(
                                [],
                                [macroNutrientPreferences, dietaryPreferences]
                            ) && setStep(step + 1)
                        }
                    />
                )}
                {step === 6 && (
                    <Step6
                        healthProblems={healthProblems}
                        allergies={allergies}
                        setHealthProblems={setHealthProblems}
                        setAllergies={setAllergies}
                        onNext={() =>
                            validateStep([], [healthProblems, allergies]) &&
                            setStep(step + 1)
                        }
                    />
                )}
                {step === 7 && (
                    <Step7
                        additionalInfo={additionalInfo}
                        setAdditionalInfo={setAdditionalInfo}
                        isSubmitting = {isSubmitting}
                        onSubmit={submitData}
                    />
                )}
            </div>
        </div>
    );
};

export default UserInput;
