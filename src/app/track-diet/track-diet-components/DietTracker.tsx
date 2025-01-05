"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import styles from "../trackDiet.module.css";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

interface MealResponse {
    name: string;
    type: string;
}

interface ApiResponse {
    success: boolean;
    mealArray: MealResponse[];
    statsId: string;
    timestamp: string;
}

interface FormData {
    responses: Record<string, string>;
    alternateFood: Record<string, string>;
    statsId: string;
}

const DietTracker: React.FC = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mealData, setMealData] = useState<MealResponse[]>([]);
    const [statsId, setStatsId] = useState<string>("");
    const { register, handleSubmit, setValue, watch } = useForm<FormData>();
    const formValues = watch();

    useEffect(() => {
        const fetchMealData = async () => {
            try {
                const response = await axios.get(
                    "/api/get-data-for-track-diet"
                );
                const data: ApiResponse = response.data;
                if (data.success) {
                    setMealData(data.mealArray);
                    setStatsId(data.statsId);
                }
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch meal data. Please try again.",
                    variant: "destructive",
                });
            }
        };

        fetchMealData();
    }, [toast]);

    const validateForm = (data: FormData): boolean => {
        // Check if all meals have a response
        const missingResponses = mealData.filter(
            (meal) => !data.responses?.[meal.name]
        );

        if (missingResponses.length > 0) {
            const mealNames = missingResponses
                .map((meal) => meal.name)
                .join(", ");
            toast({
                title: "Missing Selections",
                description: `Please select whether you ate or didn't eat for: ${mealNames}`,
                variant: "destructive",
            });
            return false;
        }

        // Check if alternate food is provided for all "didNotEat" responses
        const missingAlternates = mealData.filter(
            (meal) =>
                data.responses?.[meal.name] === "didNotEat" &&
                (!data.alternateFood?.[meal.name] ||
                    !data.alternateFood[meal.name].trim())
        );

        if (missingAlternates.length > 0) {
            const mealNames = missingAlternates
                .map((meal) => meal.name)
                .join(", ");
            toast({
                title: "Missing Alternate Food",
                description: `Please specify what you ate instead for: ${mealNames}`,
                variant: "destructive",
            });
            return false;
        }

        return true;
    };

    const sendToHealthAndStats = () => {
        const router = useRouter()    
        router.push("/health-and-stats")
    }

    const onSubmit = async (data: FormData) => {
        if (!validateForm(data)) {
            return;
        }

        setIsSubmitting(true);
        try {
            const submissionData = {
                ...data,
                statsId,
                timestamp: new Date().toISOString(),
            };
            console.log(submissionData);
            await axios.post("/api/track-exercise", submissionData);

            toast({
                title: "Success",
                description: "Diet tracking submitted successfully!",
                action: <ToastAction altText="Go to Diet Tracker" onClick={sendToHealthAndStats}>Go to stats</ToastAction>,
            });
        } catch (error) {
            toast({
                title: "Error",
                description:
                    "Failed to submit diet tracking. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResponse = (mealName: string, response: string) => {
        setValue(`responses.${mealName}`, response);
    };

    const handleAlternateFood = (mealName: string, food: string) => {
        setValue(`alternateFood.${mealName}`, food);
    };

    const getMealsByType = (type: string) => {
        return mealData.filter((meal) => meal.type === type.toUpperCase());
    };

    return (
        <div className={styles.dietTracker}>
            <h1 className={styles.heading}>Track Your Diet</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {["BREAKFAST", "LUNCH", "SNACK", "DINNER"].map((mealType) => (
                    <div key={mealType} className={styles.mealSectionLast}>
                        <h2 className={styles.mealType}>
                            {mealType.toLowerCase()}
                        </h2>
                        {getMealsByType(mealType).map((meal, index) => (
                            <div key={index} className={styles.mealCard}>
                                <div className={styles.mealHeader}>
                                    <h3>{meal.name}</h3>
                                    <div className={styles.responseButtons}>
                                        <button
                                            type="button"
                                            className={`${styles.ateButton} ${
                                                formValues?.responses?.[
                                                    meal.name
                                                ] === "ate"
                                                    ? styles.selected
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleResponse(meal.name, "ate")
                                            }
                                        >
                                            Ate
                                        </button>
                                        <button
                                            type="button"
                                            className={`${
                                                styles.didNotEatButton
                                            } ${
                                                formValues?.responses?.[
                                                    meal.name
                                                ] === "didNotEat"
                                                    ? styles.selected
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleResponse(
                                                    meal.name,
                                                    "didNotEat"
                                                )
                                            }
                                        >
                                            Didn't Eat
                                        </button>
                                    </div>
                                </div>
                                {formValues?.responses?.[meal.name] ===
                                    "didNotEat" && (
                                    <div className={styles.didNotEatForm}>
                                        <label htmlFor={`input-${meal.name}`}>
                                            What did you eat instead? (If any) -
                                            Describe eg - 250g of rice
                                        </label>
                                        <input
                                            type="text"
                                            id={`input-${meal.name}`}
                                            placeholder="Enter the food you ate"
                                            onChange={(e) =>
                                                handleAlternateFood(
                                                    meal.name,
                                                    e.target.value
                                                )
                                            }
                                            className={styles.alternateInput}
                                            required={
                                                formValues?.responses?.[
                                                    meal.name
                                                ] === "didNotEat"
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit Diet Tracking"}
                </button>
            </form>
        </div>
    );
};

export default DietTracker;
