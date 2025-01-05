// components/DayOverview.tsx
"use client";

import styles from "../exercise.module.css";
import Image from "next/image";

interface DayOverviewProps {
  focusArea: string;
  duration: number;
  totalExercises: number;
  calories: number;
}



const DayOverview: React.FC<DayOverviewProps> = ({
  focusArea,
  duration,
  totalExercises,
  calories,
}) => {
  const overviewData = [
    { icon: "/Exercise Images/focus.svg", title: "Focus Area", value: focusArea },
    { icon: "/Exercise Images/time.svg", title: "Duration", value: duration, unit: "min" },
    { icon: "/Exercise Images/exercise.svg", title: "Exercises", value: totalExercises },
    { icon: "/Exercise Images/fire color.svg", title: "Calories", value: calories, unit: "kcal" },
  ];

  return (
    <div className={styles.daysOverviewContainer}>
      <h1 className={styles.heading}>Day's Overview</h1>
      <div className={styles.overviewGrid}>
        {overviewData.map(({ icon, title, value, unit }, index) => (
          <div key={index} className={styles.individualExercise}>
            <Image src={icon} alt={title} width={35} height={50} className={styles.img} />
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