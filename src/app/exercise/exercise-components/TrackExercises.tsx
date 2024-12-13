"use client";

import { useState } from "react";
import styles from "../exercise.module.css";
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

const difficultyLevels = ["Easy", "Medium", "Hard"];

const TrackExercises = () => {
    const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
        null
    );

    const { toast } = useToast();

    const toggleExercise = (id: number) => {
        setSelectedExercises((prev) =>
            prev.includes(id)
                ? prev.filter((exerciseId) => exerciseId !== id)
                : [...prev, id]
        );
    };

    const handleDifficultyChange = (level: string) => {
        setSelectedDifficulty(level);
    };

    const handleSubmit = () => {
        if (!selectedExercises.length || !selectedDifficulty) {
            toast({
                title: "Submission Failed",
                description: "Please select exercises and a difficulty level.",
                variant: "destructive",
            });
            return;
        }

        // Process submission (e.g., send data to server or state management)
        console.log("Selected Exercises:", selectedExercises);
        console.log("Difficulty Level:", selectedDifficulty);

        toast({
            title: "Success",
            description: "Exercise tracking submitted successfully!",
        });
    };

    return (
        <div className={styles.trackContainer}>
            <h1 className={styles.headingEx}>Track Your Workout</h1>
            <div className={styles.formContainer}>
                <h2 className={styles.subHeading}>What exercises did you do?</h2>
                <div className={styles.exerciseGrid}>
                    {exercisesData.map((exercise) => (
                        <div
                            key={exercise.id}
                            className={`${styles.exerciseBox} ${
                                selectedExercises.includes(exercise.id)
                                    ? styles.selected
                                    : ""
                            }`}
                            onClick={() => toggleExercise(exercise.id)}
                        >
                            {exercise.name}
                        </div>
                    ))}
                </div>

                <h2 className={styles.subHeading}>How hard was it?</h2>
                <div className={styles.difficultyButtons}>
                    {difficultyLevels.map((level) => (
                        <button
                            key={level}
                            className={`${styles.difficultyButton} ${
                                selectedDifficulty === level
                                    ? styles.selectedDifficulty
                                    : ""
                            }`}
                            onClick={() => handleDifficultyChange(level)}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                <button
                    className={styles.submitButton}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default TrackExercises;
