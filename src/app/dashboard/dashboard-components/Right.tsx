import Image from "next/image";
import styles from "../dashboard.module.css";
import UserDetail from "./UserDetial";
import Goal from "./Goal";

const Right: React.FC = () => {
    const userDetails = [
        { value: 78, unit: "kg", label: "Weight" as "Weight" },
        { value: 175, unit: "cm", label: "Height" as "Height" },
        { value: 20, unit: "yrs", label: "Age" as "Age" },
    ];

    const goals = [
        {
            iconSrc: "/Dashboard Images/steps shoe.svg",
            title: "Running",
            value: "30km/35km",
            progress: "85.7%",
        },
        {
            iconSrc: "/Dashboard Images/weight color.svg",
            title: "Weight Loss",
            value: "Target Weight: 73kg",
            progress: "5kgs",
        },
        {
            iconSrc: "/Dashboard Images/sleep color.svg",
            title: "Sleeping",
            value: "47hrs/50hrs",
            progress: "94%",
        },
    ];

    return (
        <div className={styles.right}>
            <div className={styles.userInfo}>
                <div className={styles.user}>
                    <Image
                        src="/Dashboard Images/profile.svg"
                        alt="profile"
                        width={50}
                        height={50}
                    />
                    <h1 className={styles.rightUserName}>Pratyush Sharma</h1>
                </div>
            </div>

            <div className={styles.userDetails}>
                {userDetails.map((detail) => (
                    <UserDetail
                        key={detail.label}
                        value={detail.value}
                        unit={detail.unit}
                        label={detail.label}
                    />
                ))}
            </div>

            <div className={styles.goals}>
                <h1 className={styles.yrGoals}>Your Goals</h1>
                {goals.map((goal) => (
                    <Goal
                        key={goal.title}
                        iconSrc={goal.iconSrc}
                        title={goal.title}
                        value={goal.value}
                        progress={goal.progress}
                    />
                ))}
            </div>
        </div>
    );
};

export default Right;
