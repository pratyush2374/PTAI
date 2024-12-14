"use client";

import React, { useState } from "react";
import styles from "../diet.module.css";

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

interface IndividualMealProps {
    meal: Meal;
}

const IndividualMeal: React.FC<IndividualMealProps> = ({ meal }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => setShowDetails(!showDetails);

    return (
        <div
            className={`${styles.individualMeal} ${
                showDetails ? styles.active : ""
            }`}
            onClick={toggleDetails}
        >
            <div className={styles.mealMain}>
                <div className={styles.left}>
                    <h2 className={styles.mealName}>{meal.name}</h2>
                </div>
                <div className={styles.right}>
                    <div className={styles.calories}>
                        <span>{meal.calories} kcal</span>
                    </div>
                    <div className={styles.macronutrients}>
                        <div className={styles.macroInner}>
                            <span className={styles.macroVal}>{meal.protein}g</span> <span>Protein</span>
                        </div>
                        <div className={styles.macroInner}>
                            <span className={styles.macroVal}>{meal.carbs}g</span> <span>Carbs</span>
                        </div>
                        <div className={styles.macroInner}>
                            <span className={styles.macroVal}>{meal.fat}g</span> <span>Fat</span>
                        </div>
                    </div>
                </div>
            </div>
            <p className={styles.otherNutrients}>{meal.otherNutrients}</p>
            {showDetails && (
                <div className={styles.mealDetails}>
                    <p>
                        <strong>Weight:</strong> {meal.details.weight}
                    </p>
                    <p>
                        <strong>Category:</strong> {meal.details.category}
                    </p>
                    <p>
                        <strong>Fibre:</strong> {meal.details.fibre}
                    </p>
                    <p>
                        <strong>Key Ingredients:</strong>{" "}
                        {meal.details.keyIngredients}
                    </p>
                    <p>
                        <strong>Common Allergens:</strong>{" "}
                        {meal.details.commonAllergens}
                    </p>
                    <p>
                        <strong>Cooking Time:</strong>{" "}
                        {meal.details.cookingTime}
                    </p>
                    <p>
                        <strong>Recipe:</strong> {meal.details.recipe}
                    </p>
                </div>
            )}
        </div>
    );
};

export default IndividualMeal;
