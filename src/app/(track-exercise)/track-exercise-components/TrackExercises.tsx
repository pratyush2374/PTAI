"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "../trackExercise.module.css";
import { useToast } from "@/hooks/use-toast";

interface Exercise {
    name: string;
    id: number;
}

interface FormData {
    difficulties: Record<number, string>;
    overallDifficulty: string;
}

const difficultyLevels = ["Easy", "Medium", "Hard", "Didn't do"];

const TrackExercises = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [isDataLoading, setIsDataLoading] = useState(true);

    const form = useForm<FormData>({
        defaultValues: {
            difficulties: {},
            overallDifficulty: "",
        },
    });

    const {
        setValue,
        watch,
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    const selectedDifficulties = watch("difficulties");
    const overallDifficulty = watch("overallDifficulty");

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await axios.get(
                    "/api/get-data-for-track-exercise"
                );
                const exerciseArray = response.data.exerciseArray.map(
                    (name: string, index: number) => ({
                        name,
                        id: index + 1,
                    })
                );
                setExercises(exerciseArray);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to load exercises. Please try again.",
                    variant: "destructive",
                });
            } finally {
                setIsDataLoading(false);
            }
        };

        fetchExercises();
    }, [toast]);

    const handleDifficultyChange = (exerciseId: number, level: string) => {
        setValue("difficulties", {
            ...selectedDifficulties,
            [exerciseId]: level,
        });
    };

    const handleOverallDifficultyChange = (level: string) => {
        setValue("overallDifficulty", level);
    };

    const onSubmit = async (data: FormData) => {
        if (
            Object.keys(data.difficulties).length < exercises.length ||
            !data.overallDifficulty
        ) {
            toast({
                title: "Submission Failed",
                description:
                    "Please select difficulty levels for all exercises and an overall difficulty.",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsLoading(true);
            await axios.post("/api/track-exercise", {
                difficulties: data.difficulties,
                overallDifficulty: data.overallDifficulty,
            });

            toast({
                title: "Success",
                description: "Exercise tracking submitted successfully!",
            });
        } catch (error) {
            toast({
                title: "Error",
                description:
                    "Failed to submit exercise tracking. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.trackContainer}>
            <h1 className={styles.headingEx}>Track Your Workout</h1>
            <form
                className={styles.formContainer}
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className={styles.subHeading}>Rate Each Exercise</h2>
                <div className={styles.exerciseList}>
                    {isDataLoading ? (
                        <h1 className="text-center">Loading....</h1>
                    ) : (
                        exercises.map((exercise) => (
                            <div
                                key={exercise.id}
                                className={styles.exerciseItem}
                            >
                                <div className={styles.exerciseName}>
                                    {exercise.name}
                                </div>
                                <div
                                    className={
                                        styles.difficultyButtonsContainer
                                    }
                                >
                                    {difficultyLevels.map((level) => (
                                        <button
                                            type="button"
                                            key={level}
                                            className={`${
                                                styles.difficultyButton
                                            } ${
                                                selectedDifficulties[
                                                    exercise.id
                                                ] === level
                                                    ? styles.selectedDifficulty
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleDifficultyChange(
                                                    exercise.id,
                                                    level
                                                )
                                            }
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <h2 className={styles.subHeading}>Overall Difficulty</h2>
                <div className={styles.difficultyButtonsContainer}>
                    {difficultyLevels.slice(0, 3).map((level) => (
                        <button
                            type="button"
                            key={level}
                            className={`${styles.difficultyButton} ${
                                overallDifficulty === level
                                    ? styles.selectedDifficulty
                                    : ""
                            }`}
                            onClick={() => handleOverallDifficultyChange(level)}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting || isLoading}
                >
                    {isSubmitting || isLoading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default TrackExercises;
