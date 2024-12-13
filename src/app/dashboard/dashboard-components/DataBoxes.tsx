import styles from "../dashboard.module.css";
import Image from "next/image";

interface DataBoxProps {
    id: string;
    icon: string;
    title: string;
    value: string | number;
    unit: string;
    statusClass: string;
}

const DataBox: React.FC<DataBoxProps> = ({ id, icon, title, value, unit, statusClass }) => {
    return (
        <div className={styles.dataBox} id={id}>
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

const DataBoxes: React.FC = () => {
    // Define the data for each box
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

    return (
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
                />
            ))}
        </div>
    );
};

export default DataBoxes;
