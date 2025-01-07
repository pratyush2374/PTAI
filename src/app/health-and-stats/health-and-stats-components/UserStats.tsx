"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../healthTracker.module.css";
import { useToast } from "@/hooks/use-toast";

interface UserStatsData {
    success: boolean;
    userStats: {
        currentStreak: number;
        highestStreak: number;
        totalWeightChange: number;
        averageWeight: number;
        daily: {
            date: string;
            minutesWorkedOut: number;
            caloriesToBurn: number;
            caloriesBurnt: number;
            caloriesGained: number | null;
            caloriesToGain: number;
            currentWeight: number | null;
            focusArea: string;
            equipmentRequired: string[];
            exerciseType: string[];
            totalExercises: number;
            difficultyLevel: string;
            proteinGrams: number;
            carbsGrams: number;
            fatsGrams: number;
            fibreGrams: number;
            numberOfMeals: number;
            specialConsiderations: string;
            stepCount: number;
            averageHeartRate: number | null;
            totalHoursSlept: number;
        };
    };
}

const UserStats: React.FC = () => {
    const [data, setData] = useState<UserStatsData | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/get-stats");
                setData(response.data);
                toast({
                    title: "Success",
                    description: "User stats fetched successfully",
                })
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch user stats",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!data) return <div>No data available</div>;

    const { userStats } = data;
    const { daily } = userStats;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Daily Health Tracking</h2>
                <div className={styles.date}>{formatDate(daily.date)}</div>
            </div>

            <div className={styles.streakInfo}>
                <div className={styles.streakCard}>
                    <div className={styles.label}>Current Streak</div>
                    <div className={styles.value}>
                        {userStats.currentStreak} days
                    </div>
                </div>
                <div className={styles.streakCard}>
                    <div className={styles.label}>Highest Streak</div>
                    <div className={styles.value}>
                        {userStats.highestStreak} days
                    </div>
                </div>
                <div className={styles.streakCard}>
                    <div className={styles.label}>Average Weight</div>
                    <div className={styles.valueWithUnit}>
                        <span className={styles.value}>
                            {userStats.averageWeight}
                        </span>
                        <span className={styles.unit}>kg</span>
                    </div>
                </div>
                {daily.currentWeight && (
                    <div className={styles.streakCard}>
                        <div className={styles.label}>Current Weight</div>
                        <div className={styles.valueWithUnit}>
                            <span className={styles.value}>
                                {daily.currentWeight}
                            </span>
                            <span className={styles.unit}>kg</span>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.label}>Workout Duration</div>
                    <div className={styles.value}>
                        {daily.minutesWorkedOut} minutes
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.label}>Calories Burnt</div>
                    <div className={styles.value}>
                        {daily.caloriesBurnt} / {daily.caloriesToBurn}
                    </div>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{
                                width: `${Math.min(
                                    (daily.caloriesBurnt /
                                        daily.caloriesToBurn) *
                                        100,
                                    100
                                )}%`,
                            }}
                        />
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.label}>Calories Gained</div>
                    <div className={styles.value}>
                        {daily.caloriesGained ?? 0} / {daily.caloriesToGain}
                    </div>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{
                                width: `${Math.min(
                                    ((daily.caloriesGained ?? 0) /
                                        daily.caloriesToGain) *
                                        100,
                                    100
                                )}%`,
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.healthMetricsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.label}>Steps Today</div>
                    <div className={styles.value}>{daily.stepCount}</div>
                </div>
                {daily.averageHeartRate && (
                    <div className={styles.statCard}>
                        <div className={styles.label}>Average Heart Rate</div>
                        <div className={styles.valueWithUnit}>
                            <span className={styles.value}>
                                {daily.averageHeartRate}
                            </span>
                            <span className={styles.unit}>bpm</span>
                        </div>
                    </div>
                )}
                <div className={styles.statCard}>
                    <div className={styles.label}>Hours Slept</div>
                    <div className={styles.valueWithUnit}>
                        <span className={styles.value}>
                            {daily.totalHoursSlept
                                ? daily.totalHoursSlept
                                : "--"}
                        </span>
                        <span className={styles.unit}>
                            {daily.totalHoursSlept ? "hrs" : ""}
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.statCard}>
                <div className={styles.label}>Focus Area</div>
                <div className={styles.value}>{daily.focusArea}</div>
                <div className={styles.equipmentList}>
                    {daily.equipmentRequired.map((equipment, index) => (
                        <span key={index} className={styles.equipmentTag}>
                            {equipment}
                        </span>
                    ))}
                </div>
            </div>

            <div className={styles.statCard}>
                <div className={styles.label}>Nutrition Goals</div>
                <div className={styles.nutritionGrid}>
                    <div>
                        <div className={styles.label}>Protein</div>
                        <div className={styles.value}>
                            {daily.proteinGrams}g
                        </div>
                    </div>
                    <div>
                        <div className={styles.label}>Carbs</div>
                        <div className={styles.value}>{daily.carbsGrams}g</div>
                    </div>
                    <div>
                        <div className={styles.label}>Fats</div>
                        <div className={styles.value}>{daily.fatsGrams}g</div>
                    </div>
                    <div>
                        <div className={styles.label}>Fiber</div>
                        <div className={styles.value}>{daily.fibreGrams}g</div>
                    </div>
                </div>
                <div className={styles.specialConsiderations}>
                    {daily.specialConsiderations}
                </div>
            </div>
        </div>
    );
};

export default UserStats;
