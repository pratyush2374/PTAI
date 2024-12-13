import Image from "next/image";
import styles from "../dashboard.module.css";
import Link from "next/link";
import ExerciseDetail from "./ExerciseDetail";



const Exercise: React.FC = () => {
    const exerciseData = [
        {
            icon: "/Dashboard Images/focus.svg",
            title: "Chest",
            value: "Focus Area",
        },
        {
            icon: "/Dashboard Images/duration.svg",
            title: "Duration",
            value: 42,
            unit: "mins",
        },
        {
            icon: "/Dashboard Images/exercise.svg",
            title: "Exercises",
            value: 16,
        },
        {
            icon: "/Dashboard Images/fire.svg",
            title: "Calories",
            value: "~426",
            unit: "cal",
        },
        {
            icon: "/Dashboard Images/difficulty.svg",
            title: "Level",
            value: "Intermediate",
        },
    ];

    return (
        <div className={styles.exercise}>
            <div className={styles.showEx}>
                <Image
                    src="/Dashboard Images/exercise doing.svg"
                    alt="Exercise"
                    width={50}
                    height={50}
                />
                <h1 className={styles.ex}>Exercise</h1>
            </div>
            <div className={styles.exerciseInner}>
                {/* Dynamically render exercise details */}
                {exerciseData.map((data, index) => (
                    <ExerciseDetail
                        key={index}
                        icon={data.icon}
                        title={data.title}
                        value={data.value}
                        unit={data.unit}
                    />
                ))}
            </div>
            <Link href="/exercise" className="nextLink">
                <div className={styles.goToExercise}>Go To Exercises</div>
            </Link>
        </div>
    );
};

export default Exercise;
