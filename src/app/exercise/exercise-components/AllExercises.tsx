// components/AllExercises.tsx
"use client";

import { useState } from "react";
import styles from "../exercise.module.css";
import Image from "next/image";

interface Exercise {
    name: string;
    reps: number;
    sets: number;
    duration: string;
    calories: number;
    primaryMuscle: string;
    secondaryMuscle: string;
    restTime: string;
    equipment: string;
    advice: string;
}

const exercisesData: Exercise[] = [
    {
        name: "Push-Ups",
        reps: 15,
        sets: 3,
        duration: "10 mins",
        calories: 50,
        primaryMuscle: "Chest",
        secondaryMuscle: "Triceps, Shoulders",
        restTime: "60 seconds",
        equipment: "None",
        advice: "Keep your back straight and core engaged throughout the exercise.",
    },
    {
        name: "Squats",
        reps: 20,
        sets: 4,
        duration: "12 mins",
        calories: 70,
        primaryMuscle: "Legs",
        secondaryMuscle: "Glutes, Core",
        restTime: "90 seconds",
        equipment: "None",
        advice: "Keep your knees aligned with your toes and avoid leaning forward.",
    },
    {
        name: "Plank",
        reps: 1,
        sets: 3,
        duration: "5 mins",
        calories: 30,
        primaryMuscle: "Core",
        secondaryMuscle: "Shoulders, Back",
        restTime: "45 seconds",
        equipment: "None",
        advice: "Keep your body in a straight line and avoid letting your hips sag.",
    },
    {
        name: "Lunges",
        reps: 10,
        sets: 3,
        duration: "8 mins",
        calories: 60,
        primaryMuscle: "Legs",
        secondaryMuscle: "Glutes",
        restTime: "60 seconds",
        equipment: "None",
        advice: "Ensure each knee forms a 90-degree angle at the bottom position.",
    },
    {
        name: "Burpees",
        reps: 10,
        sets: 4,
        duration: "15 mins",
        calories: 90,
        primaryMuscle: "Full Body",
        secondaryMuscle: "Cardio",
        restTime: "60 seconds",
        equipment: "None",
        advice: "Explode into the jump and land softly to protect your knees.",
    },
];

const AllExercises = () => {
    const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

    const toggleDetails = (index: number) => {
        setExpandedIndexes((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    return (
        <>
            <h1 className={styles.headingEx}>Exercises</h1>
            <h3 className={styles.subHeading}>Click to view detiails</h3>
            {exercisesData.map((exercise, index) => (
                <div
                    key={index}
                    className={styles.exerciseDescriptionContainer}
                >
                    <div
                        className={styles.exerciseHeader}
                        onClick={() => toggleDetails(index)}
                    >
                        <h1 className={styles.exerciseName}>{exercise.name}</h1>
                        <div className={styles.addnl}>
                            <div className={styles.repsSets}>
                                {exercise.reps} reps x {exercise.sets} sets
                            </div>
                            <div className={styles.additionalInfo}>
                                <div className={styles.infoItem}>
                                    <Image
                                        src="/Exercise Images/time.svg"
                                        alt="Duration"
                                        width={20}
                                        height={20}
                                    />
                                    <span>{exercise.duration}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <Image
                                        src="/Exercise Images/fire color.svg"
                                        alt="Calories"
                                        width={20}
                                        height={20}
                                    />
                                    <span>{exercise.calories} cal</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {expandedIndexes.includes(index) && (
                        <div className={styles.exerciseDetails}>
                            <p>
                                <strong>Primary Muscle:</strong>{" "}
                                {exercise.primaryMuscle}
                            </p>
                            <p>
                                <strong>Secondary Muscle:</strong>{" "}
                                {exercise.secondaryMuscle}
                            </p>
                            <p>
                                <strong>Rest Time:</strong> {exercise.restTime}
                            </p>
                            <p>
                                <strong>Equipment:</strong> {exercise.equipment}
                            </p>
                            <p>
                                <strong>Advice:</strong> {exercise.advice}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};

export default AllExercises;
