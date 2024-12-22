import React from "react";
import Image from "next/image"; // Importing the Image component
import IndividualMeal from "./IndividualMeal";
import styles from "../diet.module.css";
import Link from "next/link";

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

const AllMeals: React.FC = () => {
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

    return (
        <>
            <div className={styles.allMeals}>
                <div className={styles.mealHeading}>
                    <Image
                        src="/Dashboard Images/food1.svg"
                        alt="Meals"
                        width={45}
                        height={45}
                    />
                    <h1 className={styles.heading}>Meals</h1>
                    
                </div>
                <h3 className={styles.subHeading}>Click to view details</h3>
                {Object.keys(mealsData).map((mealType) => (
                    <div key={mealType} className={styles.mealSection}>
                        <h2 className={styles.mealType}>{mealType}</h2>
                        {mealsData[mealType].map((meal, index) => (
                            <IndividualMeal key={index} meal={meal} />
                        ))}
                    </div>
                ))}
            </div>

            <Link href="/track-diet" className="nextLink">
                <div className={styles.goTo}>
                    Track Diet{" "}
                    <Image
                        src="/Images/redirect.png"
                        alt="Duration"
                        width={22}
                        height={18}
                    ></Image>
                </div>
            </Link>
        </>
    );
};

export default AllMeals;
