import styles from "../dashboard.module.css";
import Link from "next/link";
import Image from "next/image";

const Diet: React.FC = () => {
    return (
        <>
            <div className={styles.diet}>
                <div className={styles.showDiet}>
                    <Image src="/Dashboard Images/diet.svg" alt="Diet" width={100} height={100} />
                    <h1 className={styles.di}>Diet</h1>
                </div>

                <div className={styles.dietInner}>
                    <div className={styles.individualDiet}>
                        <div className={styles.dietLeft}>
                            <Image
                                src="/Dashboard Images/food8.svg"
                                alt="Breakfast"
                                width={100}
                                height={100}
                            />
                            <div className={styles.dietDetails}>
                                <h1>Poha with Vegetables</h1>
                                <h2>Breakfast</h2>
                            </div>
                        </div>
                        <div className={styles.moreDietDetails}>
                            <div className={styles.innerDietDetails}>
                                <h2>8:00 AM</h2>
                                <h3>Time</h3>
                            </div>
                            <div className={styles.innerDietDetails}>
                                <h2>~200 cal</h2>
                                <h3>calories</h3>
                            </div>
                        </div>
                    </div>

                    <div className={styles.individualDiet}>
                        <div className={styles.dietLeft}>
                            <Image
                                src="/Dashboard Images/food1.svg"
                                alt="Lunch"
                                width={100}
                                height={100}
                            />
                            <div className={styles.dietDetails}>
                                <h1>
                                    Dal Tadka, Brown Rice, Mixed Vegetable Sabzi
                                </h1>
                                <h2>Lunch</h2>
                            </div>
                        </div>
                        <div className={styles.moreDietDetails}>
                            <div className={styles.innerDietDetails}>
                                <h2>12:30 PM</h2>
                                <h3>Time</h3>
                            </div>
                            <div className={styles.innerDietDetails}>
                                <h2>~450 cal</h2>
                                <h3>Calories</h3>
                            </div>
                        </div>
                    </div>

                    <div className={styles.individualDiet}>
                        <div className={styles.dietLeft}>
                            <Image
                                src="/Dashboard Images/food2.svg"
                                alt="Dinner"
                                width={100}
                                height={100}
                            />
                            <div className={styles.dietDetails}>
                                <h1>Paneer Tikka, Roti, Salad</h1>
                                <h2>Dinner</h2>
                            </div>
                        </div>
                        <div className={styles.moreDietDetails}>
                            <div className={styles.innerDietDetails}>
                                <h2>7:00 PM</h2>
                                <h3>Time</h3>
                            </div>
                            <div className={styles.innerDietDetails}>
                                <h2>~400 cal</h2>
                                <h3>Calories</h3>
                            </div>
                        </div>
                    </div>

                    <div className={styles.individualDiet}>
                        <div className={styles.dietLeft}>
                            <Image
                                src="/Dashboard Images/food3.svg"
                                alt="Snacks"
                                width={100}
                                height={100}
                            />
                            <div className={styles.dietDetails}>
                                <h1>Sprout Chaat</h1>
                                <h2>Snacks</h2>
                            </div>
                        </div>
                        <div className={styles.moreDietDetails}>
                            <div className={styles.innerDietDetails}>
                                <h2>4:00 PM</h2>
                                <h3>Time</h3>
                            </div>
                            <div className={styles.innerDietDetails}>
                                <h2>~150 cal</h2>
                                <h3>Calories</h3>
                            </div>
                        </div>
                    </div>

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
                                        ~1250{" "}
                                        <span className={styles.intakeUnit}>
                                            cal
                                        </span>
                                    </h2>
                                    <h3>Total Calories</h3>
                                </div>
                            </div>

                            <div
                                className={`${styles.overallBox} ${styles.allNutrient}`}
                            >
                                <div className={styles.nutrient}>
                                    <h2>Protein</h2>
                                    <h3>75g</h3>
                                </div>

                                <div className={styles.nutrient}>
                                    <h2>Carbs</h2>
                                    <h3>150g</h3>
                                </div>

                                <div className={styles.nutrient}>
                                    <h2>Fats</h2>
                                    <h3>30g</h3>
                                </div>
                            </div>
                            <div
                                className={`${styles.overallBox} ${styles.extraOverall}`}
                            >
                                <Image
                                    src="/Dashboard Images/water color.svg"
                                    alt="Calorie"
                                    width={50}
                                    height={50}
                                />
                                <div className={styles.waterOverall}>
                                    <div className={styles.waterOverallInner}>
                                        <h2>
                                            3{" "}
                                            <span className={styles.intakeUnit}>
                                                lit
                                            </span>
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
                            <div
                                className={`${styles.overallBox} ${styles.extraOverall}`}
                            >
                                <Image
                                    src="/Dashboard Images/supplements.svg"
                                    alt="Calorie"
                                    width={50}
                                    height={50}
                                />
                                <div className={styles.waterOverall}>
                                    <div className={styles.waterOverallInner}>
                                        <h2>
                                            30
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
                </div>
                <Link href="/diet" className={styles.nextLink}>
                    <div className={styles.goToDiet}>Go To Diet</div>
                </Link>
            </div>
        </>
    );
};

export default Diet;
