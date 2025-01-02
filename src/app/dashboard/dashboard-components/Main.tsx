import styles from "../dashboard.module.css";
import WelcomeMessage from "./WelcomeMessage";
import DataBoxes from "./DataBoxes";
import TodaysPlan from "./TodaysPlan";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const Main: React.FC = () => {
    const { data: session } = useSession();
    const [gfitData, setGFitData] = useState<any>(null);
    const [exercisePlan, setExercisePlan] = useState<any>(null);
    const [dietPlan, setDietPlan] = useState<any>(null);
    const [generating, setGenerating] = useState<boolean>(false);
    const { toast } = useToast();

    useEffect(() => {
        (async function () {
            try {
                // Fetch user stats from API
                const response = await axios.post("/api/get-user-stats");

                if (response.status === 200) {
                    const { gfitData, exercisePlan, dietPlan } = response.data;

                    // Ensure data integrity before setting state
                    if (gfitData?.data?.data) setGFitData(gfitData);
                    if (exercisePlan?.data?.data) setExercisePlan(exercisePlan);
                    if (dietPlan?.data?.data) setDietPlan(dietPlan);

                    console.log("Fetched Data: ", response.data);

                    setGenerating(false);
                    toast({
                        title: "Success",
                        description: "Plan generated successfully",
                        variant: "default",
                    });
                } else {
                    throw new Error("Failed to generate plan");
                }
            } catch (error: any) {
                console.error("Error fetching user stats:", error);
                setGenerating(false);
                if (error.response) {
                    toast({
                        title: "Error",
                        description:
                            error.response.data.message || "Unknown error",
                        variant: "destructive",
                    });
                } else {
                    toast({
                        title: "Error",
                        description: "Error in generating plan",
                        variant: "destructive",
                    });
                }
            }
        })();
    }, []);

    // Prepare data for rendering components
    const dataForDataBoxes = {
        steps: gfitData?.data?.data?.steps || 0,
        calories: Math.floor(gfitData?.data?.data?.calories) || 0,
        sleepData: gfitData?.data?.data?.sleepData || "No data",
        averageHeartRate: gfitData?.data?.data?.averageHeartRate || 0,
    };

    const dataForExercise = {
        focusArea: exercisePlan?.data?.data?.focusArea || "N/A",
        approxDurationToCompleteinMinutes:
            exercisePlan?.data?.data?.approxDurationToCompleteinMinutes || 0,
        totalExercises: exercisePlan?.data?.data?.totalExercises || 0,
        totalApproxCaloriesBurn:
            exercisePlan?.data?.data?.totalApproxCaloriesBurn || 0,
        difficultyLevel: exercisePlan?.data?.data?.difficultyLevel || "N/A",
    };

    const dataForDiet =
        dietPlan?.data?.data?.meals?.map((meal: any) => ({
            type: meal.type || "Unknown",
            name: meal.name || "Unnamed",
            calories: meal.calories || 0,
        })) || [];

    // Log data to console
    console.log(`dataForDiet: ${JSON.stringify(dataForDiet)}`);
    console.log(`dataForDataBoxes: ${JSON.stringify(dataForDataBoxes)}`);
    console.log(`dataForExercise: ${JSON.stringify(dataForExercise)}`);

    return (
        <div className={styles.main}>
            <div className={styles.left}>
                {generating ? (
                    <div className={styles.generating}>
                        <h1>Generating your plan...</h1>
                        <div className={styles.loader}></div>
                    </div>
                ) : (
                    <>
                        <WelcomeMessage />
                        <DataBoxes dataForDataBoxes={dataForDataBoxes} />
                        <TodaysPlan
                            dataForExercise={dataForExercise}
                            dataForDiet={dataForDiet}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Main;
