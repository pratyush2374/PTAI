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
    statusClass: string;
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
    statusClass,
    onClick,
}) => {
    // Only show unit if value is a number and not zero
    const shouldShowUnit =
        (typeof value === "number" && value !== 0) ||
        (typeof value === "string" && value !== "--");

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
            <div className={styles.status}>
                <div className={styles[statusClass]}></div>
                <div className={styles.emptyStatus}></div>
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
    // Only show unit if value is a number and not zero
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

const DataBoxes: React.FC<any> = ({ dataForDataBoxes }) => {
    const [expandedBox, setExpandedBox] = useState<{
        title: string;
        value: string | number;
        unit: string;
    } | null>(null);

    const dataBoxes = [
        {
            id: "steps-box",
            icon: "/Dashboard Images/steps shoe.svg",
            title: "Steps",
            value: dataForDataBoxes.steps || "--",
            unit: "",
            statusClass: "filledStatusSteps",
        },
        {
            id: "calories-box",
            icon: "/Dashboard Images/fire color.svg",
            title: "Calories",
            value: dataForDataBoxes.calories || "--",
            unit: " cal",
            statusClass: "filledStatusCalories",
        },
        {
            id: "sleep-box",
            icon: "/Dashboard Images/sleep color.svg",
            title: "Sleep",
            value: dataForDataBoxes.sleepData || "--",
            unit: " hrs",
            statusClass: "filledStatusSleep",
        },
        {
            id: "heart-box",
            icon: "/Dashboard Images/heart.png",
            title: "Heart Rate",
            value: dataForDataBoxes.averageHeartRate || "--",
            unit: " bpm",
            statusClass: "filledStatusHeartRate",
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
                        id={box.id}
                        icon={box.icon}
                        title={box.title}
                        value={box.value}
                        unit={box.unit}
                        statusClass={box.statusClass}
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
            <div className={styles.refresh}>Refresh G - fit data</div>
        </div>
    );
};

export default DataBoxes;
