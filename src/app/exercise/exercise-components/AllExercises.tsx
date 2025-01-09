// components/AllExercises.tsx
"use client";

import { useState } from "react";
import styles from "../exercise.module.css";
import Image from "next/image";
import Link from "next/link";

interface Exercise {
  exerciseName: string;
  reps: string;
  sets: number;
  duration: number;
  calorieBurn: number;
  primaryMuscle: string;
  secondaryMuscle: string;
  restTime: number;
  equipment: string[];
  advice: string;
}

interface AllExercisesProps {
  exercises: Exercise[];
}

const AllExercises: React.FC<AllExercisesProps> = ({ exercises }) => {
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
      <h3 className={styles.subHeading}>Click to view details</h3>
      {exercises.map((exercise, index) => (
        <div
          key={index}
          className={styles.exerciseDescriptionContainer}
        >
          <div
            className={styles.exerciseHeader}
            onClick={() => toggleDetails(index)}
          >
            <h1 className={styles.exerciseName}>{exercise.exerciseName}</h1>
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
                  <span>{exercise.duration} mins</span>
                </div>
                <div className={styles.infoItem}>
                  <Image
                    src="/Exercise Images/fire color.svg"
                    alt="Calories"
                    width={20}
                    height={20}
                  />
                  <span>{exercise.calorieBurn} cal</span>
                </div>
              </div>
            </div>
          </div>

          {expandedIndexes.includes(index) && (
            <div className={styles.exerciseDetails}>
              <p>
                <strong>Primary Muscle:</strong> {exercise.primaryMuscle}
              </p>
              <p>
                <strong>Secondary Muscle:</strong> {exercise.secondaryMuscle}
              </p>
              <p>
                <strong>Rest Time:</strong> {exercise.restTime} seconds
              </p>
              <p>
                <strong>Equipment:</strong> {exercise.equipment.join(", ")}
              </p>
              <p>
                <strong>Advice:</strong> {exercise.advice}
              </p>
            </div>
          )}
        </div>
      ))}

      {/* <Link href="/track-exercise" className="nextLink">
        <div className={styles.goTo}>
          Track Exercise{" "}
          <Image
            src="/Images/redirect.png"
            alt="Duration"
            width={22}
            height={18}
          />
        </div>
      </Link> */}
    </>
  );
};

export default AllExercises;