import styles from "../dashboard.module.css";
import WelcomeMessage from "./WelcomeMessage";
import DataBoxes from "./DataBoxes";
import TodaysPlan from "./TodaysPlan";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface DailyStat {
    stepCount: number;
    caloriesBurnt: number;
    caloriesToBurn : number;
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
    accessToken: string;
    accessTokenExpiry: number;
    userNotRegisteredWithGoogle : boolean;
    timestamp: string;
}

interface ProcessedData {
    dataBoxes: {
        userNotRegisteredWithGoogle : boolean;
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
    const { data: session, status } = useSession();
    const [processedData, setProcessedData] = useState<ProcessedData | null>(
        null
    );
    const [generating, setGenerating] = useState<boolean>(true);
    const { toast } = useToast();

    const storeAuthToken = (token: string, expiry: number) => {
        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("accessTokenExpiry", expiry.toString());
    };

    const getStoredToken = () => {
        const token = sessionStorage.getItem("accessToken");
        const expiry = sessionStorage.getItem("accessTokenExpiry");
        return {
            token,
            expiry: expiry ? parseInt(expiry) : null,
        };
    };

    const isTokenValid = () => {
        const { expiry } = getStoredToken();
        if (!expiry) return false;
        return Date.now() < expiry;
    };

    const processUserStats = (response: ApiResponse): ProcessedData | null => {
        try {
            if (!response?.success) {
                console.error(`Invalid data structure received:, ${response}`);
                return null;
            }

            // Store the auth token and expiry
            if (response.accessToken && response.accessTokenExpiry) {
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("accessTokenExpiry");
                storeAuthToken(
                    response.accessToken,
                    response.accessTokenExpiry
                );
            }

            const daily = response.dailyStats;

            return {
                dataBoxes: {
                    userNotRegisteredWithGoogle : response.userNotRegisteredWithGoogle,
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
                        typeof daily.caloriesToBurn === "number"
                            ? daily.caloriesToBurn
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
            console.error(`Error processing user stats:, ${error}`);
            return null;
        }
    };

    const fetchData = async () => {
        try {
            const email = session?.user.email;

            // Check if we have a valid token
            if (!isTokenValid()) {
                // Clear invalid token
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("accessTokenExpiry");
            }

            const { token: accessToken, expiry: accessTokenExpiry } =
                getStoredToken();

            const response = await axios.post("/api/get-user-stats", {
                email,
                accessToken,
                accessTokenExpiry,
            });

            if (response.status === 200) {
                const processed = processUserStats(response.data);
                if (processed) {
                    setProcessedData(processed);
                    toast({
                        title: "Success",
                        description: "Stats loaded successfully",
                        variant: "default",
                    });
                }
            }
        } catch (error: any) {
            console.error(`Error fetching data:, ${error}`);
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

    const mountedRef = useRef(false);

    useEffect(() => {
        // Only execute if not mounted before
        if (!mountedRef.current && status === "authenticated") {
            mountedRef.current = true;
            fetchData();
        }
    }, [status]);

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
