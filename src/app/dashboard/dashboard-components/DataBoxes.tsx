import { useState } from "react";
import styles from "../dashboard.module.css";
import Image from "next/image";

interface DataBoxProps {
    id: string;
    icon: string;
    title: string;
    value: string | number;
    unit: string;
    statusClass: string;
    onClick: (id: string, title: string, value: string | number, unit: string) => void;
}

const DataBox: React.FC<DataBoxProps> = ({ id, icon, title, value, unit, statusClass, onClick }) => {
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
                {value} <span className={styles.unit}>{unit}</span>
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
    return (
        <div className={styles.expandedBoxContainer}>
            <div className={styles.expandedBox}>
                <div className={styles.closeButton} onClick={onClose}>
                    <Image src="/Dashboard Images/close.svg" alt="Close" width={24} height={24} />
                </div>
                <h1>{title}</h1>
                <p>
                    {value} {unit}
                </p>
            </div>
        </div>
    );
};

const DataBoxes: React.FC = () => {
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
            value: 6000,
            unit: "",
            statusClass: "filledStatusSteps",
        },
        {
            id: "calories-box",
            icon: "/Dashboard Images/fire color.svg",
            title: "Calories",
            value: 2000,
            unit: "cal",
            statusClass: "filledStatusCalories",
        },
        {
            id: "water-box",
            icon: "/Dashboard Images/water color.svg",
            title: "Water",
            value: 2.5,
            unit: "lit",
            statusClass: "filledStatusWater",
        },
        {
            id: "sleep-box",
            icon: "/Dashboard Images/sleep color.svg",
            title: "Sleep",
            value: 7.8,
            unit: "hrs",
            statusClass: "filledStatusSleep",
        },
    ];

    const handleBoxClick = (id: string, title: string, value: string | number, unit: string) => {
        setExpandedBox({ title, value, unit });
    };

    const handleClose = () => {
        setExpandedBox(null);
    };

    return (
        <div>
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
        </div>
    );
};

export default DataBoxes;
