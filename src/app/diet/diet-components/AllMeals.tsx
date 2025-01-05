
// AllMeals.tsx
import React from "react";
import Image from "next/image";
import IndividualMeal from "./IndividualMeal";
import styles from "../diet.module.css";
import Link from "next/link";
import { Meal } from './types';

interface AllMealsProps {
  meals: Meal[];
}

const AllMeals: React.FC<AllMealsProps> = ({ meals }) => {
  const groupedMeals = meals.reduce((acc, meal) => {
    const type = meal.type.toLowerCase();
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(meal);
    return acc;
  }, {} as Record<string, Meal[]>);

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
        {Object.entries(groupedMeals).map(([mealType, mealList]) => (
          <div key={mealType} className={styles.mealSection}>
            <h2 className={styles.mealType}>{mealType}</h2>
            {mealList.map((meal) => (
              <IndividualMeal key={meal.id} meal={meal} />
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
          />
        </div>
      </Link>
    </>
  );
};

export default AllMeals;