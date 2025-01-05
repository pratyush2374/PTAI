// DayOverview.tsx
import Image from "next/image";
import styles from "../diet.module.css";
import { DailyStats } from "./types";

interface DayOverviewProps {
    stats: DailyStats;
}

const DayOverview: React.FC<DayOverviewProps> = ({ stats }) => {
    return (
        <div className={styles.outerOverall}>
            <h1 className={styles.overallStats}>Overall Stats</h1>

            <div className={styles.overall}>
                <div className={styles.overallBox}>
                    <Image
                        src="/Dashboard Images/fire color.svg"
                        alt="Calorie"
                        width={50}
                        height={50}
                    />
                    <div className={styles.totalCalories}>
                        <h2>
                            ~{stats.caloriesBurnt}{" "}
                            <span className={styles.intakeUnit}>cal</span>
                        </h2>
                        <h3>Total Calories</h3>
                    </div>
                </div>

                <div className={`${styles.overallBox} ${styles.allNutrient}`}>
                    <div className={styles.nutrient}>
                        <h2>Protein</h2>
                        <h3>{stats.proteinGrams}g</h3>
                    </div>
                    <div className={styles.nutrient}>
                        <h2>Carbs</h2>
                        <h3>{stats.carbsGrams}g</h3>
                    </div>
                    <div className={styles.nutrient}>
                        <h2>Fats</h2>
                        <h3>{stats.fatsGrams}g</h3>
                    </div>
                </div>

                {/* <div className={`${styles.overallBox} ${styles.extraOverall}`}>
                    <Image
                        src="/Dashboard Images/water color.svg"
                        alt="Hydration"
                        width={50}
                        height={50}
                    />
                    <div className={styles.waterOverall}>
                        <div className={styles.waterOverallInner}>
                            <h2>
                                {stats.waterIntake || 0}{" "}
                                <span className={styles.intakeUnit}>lit</span>
                            </h2>
                            <h2>
                                {stats.waterIntake
                                    ? Math.round(stats.waterIntake * 4)
                                    : 0}{" "}
                                <span className={styles.intakeUnit}>
                                    glasses
                                </span>
                            </h2>
                        </div>
                        <h3>Hydration</h3>
                    </div>
                </div>

                <div className={`${styles.overallBox} ${styles.extraOverall}`}>
                    <Image
                        src="/Dashboard Images/supplements.svg"
                        alt="Supplements"
                        width={50}
                        height={50}
                    />
                    <div className={styles.waterOverall}>
                        <div className={styles.waterOverallInner}>
                            <h2>
                                30{" "}
                                <span className={styles.intakeUnit}>
                                    g (Whey Protein)
                                </span>
                            </h2>
                        </div>
                        <h3>Supplements</h3>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default DayOverview;
