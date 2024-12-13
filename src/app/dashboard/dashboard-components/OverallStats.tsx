import Image from "next/image";
import styles from "../dashboard.module.css";

const nutrients = [
    { name: "Protein", value: "75g" },
    { name: "Carbs", value: "150g" },
    { name: "Fats", value: "30g" },
];

const OverallStats: React.FC = () => {
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
                            ~1250 <span className={styles.intakeUnit}>cal</span>
                        </h2>
                        <h3>Total Calories</h3>
                    </div>
                </div>

                <div className={`${styles.overallBox} ${styles.allNutrient}`}>
                    {nutrients.map((nutrient, index) => (
                        <div className={styles.nutrient} key={index}>
                            <h2>{nutrient.name}</h2>
                            <h3>{nutrient.value}</h3>
                        </div>
                    ))}
                </div>

                <div className={`${styles.overallBox} ${styles.extraOverall}`}>
                    <Image
                        src="/Dashboard Images/water color.svg"
                        alt="Hydration"
                        width={50}
                        height={50}
                    />
                    <div className={styles.waterOverall}>
                        <div className={styles.waterOverallInner}>
                            <h2>
                                3 <span className={styles.intakeUnit}>lit</span>
                            </h2>
                            <h2>
                                12{" "}
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
                </div>
            </div>
        </div>
    );
};

export default OverallStats;
