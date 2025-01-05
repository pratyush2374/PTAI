"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import styles from "../trackDiet.module.css";

interface MealDetails {
    weight: string;
    category: string;
    fibre: string;
    keyIngredients: string;
    commonAllergens: string;
    cookingTime: string;
    recipe: string;
}

interface Meal {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    otherNutrients: string;
    details: MealDetails;
}

const mealsData: Record<string, Meal[]> = {
    breakfast: [
        {
            name: "Masala Dosa with Coconut Chutney",
            calories: 300,
            protein: 6,
            carbs: 40,
            fat: 10,
            otherNutrients: "Rich in Vitamin B, Iron, and Potassium",
            details: {
                weight: "250g",
                category: "Vegetarian",
                fibre: "4g",
                keyIngredients: "Rice, Lentils, Coconut, Spices",
                commonAllergens: "Coconut, Lentils",
                cookingTime: "25 mins",
                recipe: "Prepare batter, cook dosas, and serve with chutney.",
            },
        },
        {
            name: "Vegetable Upma",
            calories: 250,
            protein: 8,
            carbs: 35,
            fat: 6,
            otherNutrients: "High in Fiber, Vitamin C, and Iron",
            details: {
                weight: "200g",
                category: "Vegetarian",
                fibre: "5g",
                keyIngredients: "Semolina, Vegetables, Spices",
                commonAllergens: "None",
                cookingTime: "20 mins",
                recipe: "Roast semolina, cook with vegetables and spices.",
            },
        },
    ],
    lunch: [
        {
            name: "Paneer Butter Masala with Naan",
            calories: 600,
            protein: 20,
            carbs: 60,
            fat: 25,
            otherNutrients: "Rich in Calcium and Vitamin D",
            details: {
                weight: "400g",
                category: "Vegetarian",
                fibre: "3g",
                keyIngredients: "Paneer, Butter, Cream, Spices, Wheat",
                commonAllergens: "Dairy, Gluten",
                cookingTime: "40 mins",
                recipe: "Cook paneer in a creamy spiced tomato gravy.",
            },
        },
        {
            name: "Rajma Chawal (Kidney Beans with Rice)",
            calories: 450,
            protein: 15,
            carbs: 70,
            fat: 5,
            otherNutrients: "High in Iron, Zinc, and Magnesium",
            details: {
                weight: "500g",
                category: "Vegetarian",
                fibre: "10g",
                keyIngredients: "Kidney Beans, Rice, Spices",
                commonAllergens: "None",
                cookingTime: "45 mins",
                recipe: "Cook kidney beans in a spiced gravy, serve with rice.",
            },
        },
    ],
    dinner: [
        {
            name: "Grilled Chicken Salad",
            calories: 350,
            protein: 30,
            carbs: 10,
            fat: 15,
            otherNutrients: "Rich in Vitamin A, C, and Iron",
            details: {
                weight: "300g",
                category: "Non-Vegetarian",
                fibre: "5g",
                keyIngredients: "Chicken, Lettuce, Vegetables, Olive Oil",
                commonAllergens: "None",
                cookingTime: "30 mins",
                recipe: "Grill chicken, mix with fresh salad and dressing.",
            },
        },
        {
            name: "Dal Tadka with Roti",
            calories: 400,
            protein: 12,
            carbs: 55,
            fat: 10,
            otherNutrients: "Rich in Protein and Iron",
            details: {
                weight: "350g",
                category: "Vegetarian",
                fibre: "7g",
                keyIngredients: "Lentils, Spices, Wheat",
                commonAllergens: "Gluten",
                cookingTime: "35 mins",
                recipe: "Cook lentils with tempered spices, serve with roti.",
            },
        },
    ],
};

const TrackDiet: React.FC = () => {
    const { toast } = useToast();
    const [responses, setResponses] = useState<Record<string, string>>({});
    const [alternateFood, setAlternateFood] = useState<Record<string, string>>(
        {}
    );

    const handleResponse = (
        mealType: string,
        mealName: string,
        response: string
    ) => {
        setResponses((prev) => ({
            ...prev,
            [`${mealType}-${mealName}`]: response,
        }));
    };

    const handleAlternateFood = (
        mealType: string,
        mealName: string,
        food: string
    ) => {
        setAlternateFood((prev) => ({
            ...prev,
            [`${mealType}-${mealName}`]: food,
        }));
    };

    const handleSubmit = () => {
        const allMealTypes = Object.keys(mealsData);
        const missingResponses = allMealTypes.filter(
            (mealType) =>
                !mealsData[mealType].some(
                    (meal) => responses[`${mealType}-${meal.name}`]
                )
        );

        if (missingResponses.length > 0) {
            toast({
                title: "Incomplete Tracking",
                description: "Please select a response for all meal types",
                variant: "destructive",
            });
            return;
        }

        const submissionData = {
            responses,
            alternateFood,
        };

        console.log("Diet Tracking Submission:", submissionData);
        toast({
            title: "Diet Tracking",
            description: "Diet tracking submitted successfully!",
        });
    };

    return (
        <div className={styles.dietTracker}>
            <h1 className={styles.heading}>Track Your Diet</h1>
            {Object.keys(mealsData).map((mealType) => (
                <div key={mealType} className={styles.mealSectionLast}>
                    <h2 className={styles.mealType}>{mealType}</h2>
                    {mealsData[mealType].map((meal, index) => (
                        <div key={index} className={styles.mealCard}>
                            <div className={styles.mealHeader}>
                                <h3>{meal.name}</h3>
                                <div className={styles.responseButtons}>
                                    <button
                                        className={`${styles.ateButton} ${
                                            responses[
                                                `${mealType}-${meal.name}`
                                            ] === "ate"
                                                ? styles.selected
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleResponse(
                                                mealType,
                                                meal.name,
                                                "ate"
                                            )
                                        }
                                    >
                                        Ate
                                    </button>
                                    <button
                                        className={`${styles.didNotEatButton} ${
                                            responses[
                                                `${mealType}-${meal.name}`
                                            ] === "didNotEat"
                                                ? styles.selected
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleResponse(
                                                mealType,
                                                meal.name,
                                                "didNotEat"
                                            )
                                        }
                                    >
                                        Didn't Eat
                                    </button>
                                </div>
                            </div>
                            {responses[`${mealType}-${meal.name}`] ===
                                "didNotEat" && (
                                <div className={styles.didNotEatForm}>
                                    <label
                                        htmlFor={`input-${mealType}-${index}`}
                                    >
                                        What did you eat instead? (If any) - Describe eg - 250g of rice
                                    </label>
                                    <input
                                        type="text"
                                        id={`input-${mealType}-${index}`}
                                        placeholder="Enter the food you ate"
                                        onChange={(e) =>
                                            handleAlternateFood(
                                                mealType,
                                                meal.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
            <button className={styles.submitButton} onClick={handleSubmit}>
                Submit Diet Tracking
            </button>
        </div>
    );
};

export default TrackDiet;
