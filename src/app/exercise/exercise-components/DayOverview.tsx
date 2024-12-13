// components/DaysOverview.tsx
"use client";

import styles from "../exercise.module.css";
import Image from "next/image";

interface OverviewItem {
    icon: string;
    title: string;
    value: number | string;
    unit?: string;
}

const overviewData: OverviewItem[] = [
    { icon: "/Exercise Images/focus.svg", title: "Focus Area", value: "Legs & Core" },
    { icon: "/Exercise Images/time.svg", title: "Duration", value: 45, unit: "min" },
    { icon: "/Exercise Images/exercise.svg", title: "Exercises", value: 5 },
    { icon: "/Exercise Images/fire color.svg", title: "Calories", value: 300, unit: "kcal" },
];

const DayOverview = () => {
    return (
        <div className={styles.daysOverviewContainer}>
            <h1 className={styles.heading}>Day's Overview</h1>
            <div className={styles.overviewGrid}>
                {overviewData.map(({ icon, title, value, unit }, index) => (
                    <div key={index} className={styles.individualExercise}>
                        <Image src={icon} alt={title} width={35} height={50} className={styles.img}/>
                        <div className={styles.exerciseDetailsMain}>
                            <h1>
                                {value} {unit && <span>{unit}</span>}
                            </h1>
                            <h2>{title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DayOverview;
