import { useState } from "react";
import styles from "../dashboard.module.css";
import Image from "next/image";
import Link from "next/link";

interface DataBoxProps {
    id: string;
    icon: string;
    title: string;
    value: string | number;
    unit: string;
    progress: number;
    onClick: (
        id: string,
        title: string,
        value: string | number,
        unit: string
    ) => void;
}

const DataBox: React.FC<DataBoxProps> = ({
    id,
    icon,
    title,
    value,
    unit,
    progress,
    onClick,
}) => {
    const shouldShowUnit =
        (typeof value === "number" && value !== 0) ||
        (typeof value === "string" && value !== "--");

    // Ensure progress is between 0 and 100
    const normalizedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <div
            className={styles.dataBox}
            id={id}
            onClick={() => onClick(id, title, value, unit)}
        >
            <div className={styles.boxName}>
                <Image src={icon} alt={title} width={24} height={24} />
                <h2>{title}</h2>
            </div>
            <div className={styles.dataValue} id={`${id}-value`}>
                {value}
                {shouldShowUnit && <span className={styles.unit}>{unit}</span>}
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
                <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${normalizedProgress}%` }}
                />
            </div>
        </div>
    );
};

const ExpandedBox: React.FC<{
    title: string;
    value: string | number;
    unit: string;
    onClose: () => void;
}> = ({ title, value, unit, onClose }) => {
    const shouldShowUnit =
        (typeof value === "number" && value !== 0) ||
        (typeof value === "string" && value !== "--");

    return (
        <div className={styles.expandedBoxContainer}>
            <div className={styles.expandedBox}>
                <div className={styles.closeButton} onClick={onClose}>
                    <Image
                        src="/Dashboard Images/close.svg"
                        alt="Close"
                        width={24}
                        height={24}
                    />
                </div>
                <h1>{title}</h1>
                <p>
                    {value} {shouldShowUnit && unit}
                </p>
            </div>
        </div>
    );
};

interface DataBoxesProps {
    dataForDataBoxes: {
        userNotRegisteredWithGoogle: boolean;
        stepsGoal: number;
        sleepGoal: number;
        caloriesToBurn: number;
        steps: number;
        calories: number;
        sleepData: number | string;
        averageHeartRate: number;
    };
}

const DataBoxes: React.FC<DataBoxesProps> = ({ dataForDataBoxes }) => {
    const [expandedBox, setExpandedBox] = useState<{
        title: string;
        value: string | number;
        unit: string;
    } | null>(null);

    // Calculate progress percentages
    const calculateStepsProgress = () => {
        if (!dataForDataBoxes.steps || !dataForDataBoxes.stepsGoal) return 0;
        return (dataForDataBoxes.steps / dataForDataBoxes.stepsGoal) * 100;
    };

    const calculateCaloriesProgress = () => {
        if (!dataForDataBoxes.calories || !dataForDataBoxes.caloriesToBurn) return 0;
        return (dataForDataBoxes.calories / dataForDataBoxes.caloriesToBurn) * 100;
    };

    const calculateSleepProgress = () => {
        if (!dataForDataBoxes.sleepData || !dataForDataBoxes.sleepGoal) return 0;
        return (Number(dataForDataBoxes.sleepData) / dataForDataBoxes.sleepGoal) * 100;
    };

    const dataBoxes = [
        {
            id: "steps-box",
            icon: "/Dashboard Images/steps shoe.svg",
            title: "Steps",
            value: dataForDataBoxes.steps || "--",
            unit: "",
            progress: calculateStepsProgress(),
        },
        {
            id: "calories-box",
            icon: "/Dashboard Images/fire color.svg",
            title: "Calories",
            value: dataForDataBoxes.calories || "--",
            unit: " cal",
            progress: calculateCaloriesProgress(),
        },
        {
            id: "sleep-box",
            icon: "/Dashboard Images/sleep color.svg",
            title: "Sleep",
            value: dataForDataBoxes.sleepData || "--",
            unit: " hrs",
            progress: calculateSleepProgress(),
        },
        {
            id: "heart-box",
            icon: "/Dashboard Images/heart.png",
            title: "Heart Rate",
            value: dataForDataBoxes.averageHeartRate || "--",
            unit: " bpm",
            progress: 100, // Since there's no goal for heart rate, showing full
        },
    ];

    const handleBoxClick = (
        id: string,
        title: string,
        value: string | number,
        unit: string
    ) => {
        setExpandedBox({ title, value, unit });
    };

    const handleClose = () => {
        setExpandedBox(null);
    };

    return (
        <div>
            {dataForDataBoxes.userNotRegisteredWithGoogle && (
                <h2 className="ml-[30px]">
                    User not registered with Google Fit{" "}
                    <Link
                        href="/account-settings"
                        className="text-blue-500 underline"
                    >
                        Register
                    </Link>
                </h2>
            )}
            <div className={styles.dataBoxes}>
                {dataBoxes.map((box) => (
                    <DataBox
                        key={box.id}
                        {...box}
                        onClick={handleBoxClick}
                    />
                ))}
            </div>
            {expandedBox && (
                <ExpandedBox
                    title={expandedBox.title}
                    value={expandedBox.value}
                    unit={expandedBox.unit}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default DataBoxes;