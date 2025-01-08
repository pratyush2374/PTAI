"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import PersonalDetails from "./PersonalDetails";
import ExerciseDetails from "./ExerciseDetails";
import DietaryPreferences from "./DietaryPreferences";
import HealthProblems from "./HealthProblems";
import GoalsAndOthers from "./GoalsAndOthers";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "./LoadingSpinner";

interface UserData {
    success: boolean;
    user: {
        id: string;
        fullName: string;
        userName: string;
        email: string;
        dob: string;
        age: number;
        profilePic: string | null;
        gender: string;
        height: number;
        additionalInfo: string;
        preferences: {
            activityLevel: string;
            preferredExerciseType: string[];
            exerciseExperience: string;
            workoutDuration: string;
            exerciseFrequency: string;
            macronutrientPreferences: string[];
            fitnessGoals: string[];
            pace: string;
            availableEquipments: string[];
        };
        healthAndDietary: {
            dietaryPreferences: string[];
            healthProblems: string[];
            allergies: string[];
        };
        stats: {
            currentStreak: number;
            highestStreak: number;
            stepsGoal: number | null;
            sleepGoal: number | null;
            achievements: string[];
            totalWeightChange: number;
            averageWeight: number;
        };
    };
}

const AccountSettings: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    "/api/get-data-for-account-settings"
                );
                setUserData(response.data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch user data",
                    variant: "destructive",
                });
            }
        };

        fetchUserData();
    }, []);

    if (!userData) return <LoadingSpinner />;

    const { user } = userData;

    return (
        <div className="w-[75%] mx-auto mt-[100px]">
            <ProfileCard
                name={user.fullName}
                email={user.email}
                username={user.userName}
                image={
                    user.profilePic ||
                    "https://www.w3schools.com/w3images/avatar2.png"
                }
            />

            <div className="details-section mt-6 justify-center">
                <PersonalDetails
                    fullName={user.fullName}
                    dob={user.dob}
                    age={user.age}
                    height={user.height}
                    additionalInfo={user.additionalInfo}
                />
                <GoalsAndOthers
                    stats={user.stats}
                    fitnessGoals={user.preferences.fitnessGoals}
                />
                <ExerciseDetails
                    activityLevel={user.preferences.activityLevel}
                    exerciseType={user.preferences.preferredExerciseType}
                    experience={user.preferences.exerciseExperience}
                    duration={user.preferences.workoutDuration}
                    frequency={user.preferences.exerciseFrequency}
                    pace={user.preferences.pace}
                    equipment={user.preferences.availableEquipments}
                />
                <DietaryPreferences
                    preferences={user.healthAndDietary.dietaryPreferences}
                    macroPreferences={user.preferences.macronutrientPreferences}
                />
                <HealthProblems
                    problems={user.healthAndDietary.healthProblems}
                    allergies={user.healthAndDietary.allergies}
                />
            </div>
        </div>
    );
};

export default AccountSettings;
