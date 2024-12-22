"use client";

import { useState } from "react";
import styles from "../trackExercise.module.css";
import { useToast } from "@/hooks/use-toast";

interface Exercise {
    name: string;
    id: number;
}

const exercisesData: Exercise[] = [
    { name: "Push-Ups", id: 1 },
    { name: "Squats", id: 2 },
    { name: "Plank", id: 3 },
    { name: "Lunges", id: 4 },
    { name: "Burpees", id: 5 },
];

const difficultyLevels = ["Easy", "Medium", "Hard", "Didn't do"];

const TrackExercises = () => {
    const [selectedDifficulties, setSelectedDifficulties] = useState<{ [key: number]: string }>({});
    const [overallDifficulty, setOverallDifficulty] = useState<string | null>(null);

    const { toast } = useToast();

    const handleDifficultyChange = (exerciseId: number, level: string) => {
        setSelectedDifficulties((prev) => ({ ...prev, [exerciseId]: level }));
    };

    const handleOverallDifficultyChange = (level: string) => {
        setOverallDifficulty(level);
    };

    const handleSubmit = () => {
        if (Object.keys(selectedDifficulties).length < exercisesData.length || !overallDifficulty) {
            toast({
                title: "Submission Failed",
                description: "Please select difficulty levels for all exercises and an overall difficulty.",
                variant: "destructive",
            });
            return;
        }

        // Process submission (e.g., send data to server or state management)
        console.log("Selected Difficulties:", selectedDifficulties);
        console.log("Overall Difficulty:", overallDifficulty);

        toast({
            title: "Success",
            description: "Exercise tracking submitted successfully!",
        });
    };

    return (
        <div className={styles.trackContainer}>
            <h1 className={styles.headingEx}>Track Your Workout</h1>
            <div className={styles.formContainer}>
                <h2 className={styles.subHeading}>Rate Each Exercise</h2>
                <div className={styles.exerciseList}>
                    {exercisesData.map((exercise) => (
                        <div key={exercise.id} className={styles.exerciseItem}>
                            <div className={styles.exerciseName}>{exercise.name}</div>
                            <div className={styles.difficultyButtonsContainer}>
                                {difficultyLevels.map((level) => (
                                    <button
                                        key={level}
                                        className={`${styles.difficultyButton} ${
                                            selectedDifficulties[exercise.id] === level
                                                ? styles.selectedDifficulty
                                                : ""
                                        }`}
                                        onClick={() => handleDifficultyChange(exercise.id, level)}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <h2 className={styles.subHeading}>Overall Difficulty</h2>
                <div className={styles.difficultyButtonsContainer}>
                    {difficultyLevels.slice(0, 3).map((level) => (
                        <button
                            key={level}
                            className={`${styles.difficultyButton} ${
                                overallDifficulty === level ? styles.selectedDifficulty : ""
                            }`}
                            onClick={() => handleOverallDifficultyChange(level)}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                <button className={styles.submitButton} onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default TrackExercises;
