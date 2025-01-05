import styles from "../dashboard.module.css";
import WelcomeMessage from "./WelcomeMessage";
import DataBoxes from "./DataBoxes";
import TodaysPlan from "./TodaysPlan";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { getToken } from "next-auth/jwt";

interface DailyStat {
    stepCount: number;
    caloriesBurnt: number;
    totalHoursSlept: number | null;
    averageHeartRate: number | null;
    focusArea: string;
    approxDurationToCompleteinMinutes: number;
    totalExercises: number;
    difficultyLevel: string;
    numberOfMeals: number;
    proteinGrams: number;
    carbsGrams: number;
    fatsGrams: number;
    fibreGrams: number;
    specialConsiderations: string;
    meals: any[];
}

interface ApiResponse {
    success: boolean;
    dailyStats: DailyStat;
    timestamp: string;
}

interface ProcessedData {
    dataBoxes: {
        steps: number;
        calories: number;
        sleepData: number | string;
        averageHeartRate: number;
    };
    exercise: {
        focusArea: string;
        approxDurationToCompleteinMinutes: number;
        totalExercises: number;
        totalApproxCaloriesBurn: number;
        difficultyLevel: string;
    };
    diet: {
        numberOfMeals: number;
        nutrition: {
            protein: number;
            carbs: number;
            fats: number;
            fibre: number;
        };
        specialConsiderations: string;
        meals: any[];
    };
}

const Main: React.FC = () => {
    const { data: session } = useSession();
    const [processedData, setProcessedData] = useState<ProcessedData | null>(
        null
    );
    const [generating, setGenerating] = useState<boolean>(true);
    const { toast } = useToast();

    const processUserStats = (response: ApiResponse): ProcessedData | null => {
        try {
            if (!response?.success) {
                console.error("Invalid data structure received:", response);
                return null;
            }

            const daily = response.dailyStats;

            return {
                dataBoxes: {
                    steps:
                        typeof daily.stepCount === "number"
                            ? daily.stepCount
                            : 0,
                    calories:
                        typeof daily.caloriesBurnt === "number"
                            ? daily.caloriesBurnt
                            : 0,
                    sleepData: daily.totalHoursSlept ?? "--",
                    averageHeartRate:
                        typeof daily.averageHeartRate === "number"
                            ? daily.averageHeartRate
                            : 0,
                },
                exercise: {
                    focusArea: daily.focusArea || "N/A",
                    approxDurationToCompleteinMinutes:
                        typeof daily.approxDurationToCompleteinMinutes ===
                        "number"
                            ? daily.approxDurationToCompleteinMinutes
                            : 0,
                    totalExercises:
                        typeof daily.totalExercises === "number"
                            ? daily.totalExercises
                            : 0,
                    totalApproxCaloriesBurn:
                        typeof daily.caloriesBurnt === "number"
                            ? daily.caloriesBurnt
                            : 0,
                    difficultyLevel: daily.difficultyLevel || "N/A",
                },
                diet: {
                    numberOfMeals:
                        typeof daily.numberOfMeals === "number"
                            ? daily.numberOfMeals
                            : 0,
                    nutrition: {
                        protein:
                            typeof daily.proteinGrams === "number"
                                ? daily.proteinGrams
                                : 0,
                        carbs:
                            typeof daily.carbsGrams === "number"
                                ? daily.carbsGrams
                                : 0,
                        fats:
                            typeof daily.fatsGrams === "number"
                                ? daily.fatsGrams
                                : 0,
                        fibre:
                            typeof daily.fibreGrams === "number"
                                ? daily.fibreGrams
                                : 0,
                    },
                    specialConsiderations: daily.specialConsiderations || "",
                    meals: Array.isArray(daily.meals) ? daily.meals : [],
                },
            };
        } catch (error) {
            console.error("Error processing user stats:", error);
            return null;
        }
    };

    const isGFitDataValid = (timestamp: string): boolean => {
        const timeElapsed = Date.now() - parseInt(timestamp);
        return timeElapsed < 10 * 60 * 1000; // 10 minutes
    };

    const isOtherDataValid = (timestamp: string): boolean => {
        const today = new Date();
        const endOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            23,
            59,
            59
        ).getTime();
        return parseInt(timestamp) <= endOfDay;
    };

    const fetchGFitData = async () => {
        try {
            const response = await axios.post("/api/update-gfit-data");
            if (response.status === 200) {
                sessionStorage.setItem(
                    "gFitData",
                    JSON.stringify(response.data)
                );
                sessionStorage.setItem("gFitFetchTime", Date.now().toString());
                return response.data;
            }
            throw new Error("Failed to fetch GFit data");
        } catch (error) {
            console.error("Error fetching GFit data:", error);
            throw error;
        }
    };

    const fetchExerciseAndDietData = async () => {
        try {
            const email = session?.user.email;
            const response = await axios.post("/api/get-user-stats", { email });
            if (response.status === 200) {
                sessionStorage.setItem(
                    "exerciseData",
                    JSON.stringify(response.data)
                );
                sessionStorage.setItem(
                    "dietData",
                    JSON.stringify(response.data)
                );
                sessionStorage.setItem(
                    "otherDataFetchTime",
                    Date.now().toString()
                );
                return response.data;
            }
            throw new Error("Failed to fetch exercise and diet data");
        } catch (error) {
            console.error("Error fetching exercise and diet data:", error);
            throw error;
        }
    };

    const fetchData = async () => {
        try {
            let gFitData = null;
            let otherData = null;

            // Check GFit data cache
            const cachedGFitTime = sessionStorage.getItem("gFitFetchTime");
            const cachedGFitData = sessionStorage.getItem("gFitData");

            if (
                cachedGFitTime &&
                cachedGFitData &&
                isGFitDataValid(cachedGFitTime)
            ) {
                gFitData = JSON.parse(cachedGFitData);
            } else {
                gFitData = await fetchGFitData();
            }

            // Check exercise and diet data cache
            const cachedOtherTime =
                sessionStorage.getItem("otherDataFetchTime");
            const cachedExerciseData = sessionStorage.getItem("exerciseData");
            const cachedDietData = sessionStorage.getItem("dietData");

            if (
                cachedOtherTime &&
                cachedExerciseData &&
                cachedDietData &&
                isOtherDataValid(cachedOtherTime)
            ) {
                otherData = JSON.parse(cachedExerciseData); // They contain the same data
            } else {
                otherData = await fetchExerciseAndDietData();
            }

            // Combine and process the data
            const combinedData = {
                success: true,
                dailyStats: {
                    ...gFitData.dailyStats,
                    ...otherData.dailyStats,
                },

                timestamp: Date.now().toString(),
            };

            const processed = processUserStats(combinedData);
            if (processed) {
                setProcessedData(processed);
                toast({
                    title: "Success",
                    description: "Stats loaded successfully",
                    variant: "default",
                });
            }
        } catch (error: any) {
            console.error("Error fetching data:", error);
            toast({
                title: "Error",
                description:
                    error.response?.data?.message || "Error in fetching stats",
                variant: "destructive",
            });
        } finally {
            setGenerating(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.left}>
                {generating || !processedData ? (
                    <div className={styles.generating}>
                        <h1>Loading your stats...</h1>
                        <div className={styles.loader}></div>
                    </div>
                ) : (
                    <>
                        {console.log(session)}
                        <WelcomeMessage />
                        <DataBoxes dataForDataBoxes={processedData.dataBoxes} />
                        <TodaysPlan
                            dataForExercise={processedData.exercise}
                            dataForDiet={processedData.diet}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Main;
