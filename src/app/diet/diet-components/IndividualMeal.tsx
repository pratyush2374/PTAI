// IndividualMeal.tsx
"use client";

import React, { useState } from "react";
import styles from "../diet.module.css";
import { Meal } from "./types";

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
                            <span className={styles.macroVal}>
                                {meal.protein}g
                            </span>{" "}
                            <span>Protein</span>
                        </div>
                        <div className={styles.macroInner}>
                            <span className={styles.macroVal}>
                                {meal.carbs}g
                            </span>{" "}
                            <span>Carbs</span>
                        </div>
                        <div className={styles.macroInner}>
                            <span className={styles.macroVal}>
                                {meal.fats}g
                            </span>{" "}
                            <span>Fat</span>
                        </div>
                    </div>
                </div>
            </div>
            <p className={styles.otherNutrients}>{meal.otherNutrients}</p>
            {showDetails && (
                <div className={styles.mealDetails}>
                    <p>
                        <strong>Weight:</strong> {meal.weight}g
                    </p>
                    <p>
                        <strong>Category:</strong> {meal.category.join(", ")}
                    </p>
                    <p>
                        <strong>Fibre:</strong> {meal.fibre}g
                    </p>
                    <p>
                        <strong>Key Ingredients:</strong>{" "}
                        {meal.ingredients.join(", ")}
                    </p>
                    <p>
                        <strong>Common Allergens:</strong>{" "}
                        {meal.allergens || "None"}
                    </p>
                    <p>
                        <strong>Cooking Time:</strong> {meal.cookingTime} mins
                    </p>
                    <p>
                        <strong>Recipe:</strong> {meal.recipe}
                    </p>
                </div>
            )}
        </div>
    );
};

export default IndividualMeal;
