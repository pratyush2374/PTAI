// components/Exercise.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AllExercises from "./AllExercises";
import DayOverview from "./DayOverview";
import Navbar from "@/app/(common-components)/Navbar";
import Message from "./Message";
import styles from "../exercise.module.css";

interface DailyStats {
  focusArea: string;
  approxDurationToCompleteinMinutes: number;
  totalExercises: number;
  caloriesToBurn: number;
  exercises: Array<{
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
  }>;
}

const Exercise: React.FC = () => {
  const [exerciseData, setExerciseData] = useState<DailyStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const response = await axios.get('/api/get-exercise-data');
        setExerciseData(response.data.dailyStats);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Message />
        {exerciseData && (
          <>
            <DayOverview 
              focusArea={exerciseData.focusArea}
              duration={exerciseData.approxDurationToCompleteinMinutes}
              totalExercises={exerciseData.totalExercises}
              calories={exerciseData.caloriesToBurn}
            />
            <AllExercises exercises={exerciseData.exercises} />
          </>
        )}
      </div>
    </>
  );
};

export default Exercise;



