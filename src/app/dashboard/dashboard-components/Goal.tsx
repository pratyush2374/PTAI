import Image from "next/image";
import styles from "../dashboard.module.css";

interface GoalProps {
    iconSrc: string;
    title: string;
    value: string;
    progress: string;
}

const Goal: React.FC<GoalProps> = ({ iconSrc, title, value, progress }) => (
    <div className={styles.goalsInner}>
        <Image src={iconSrc} alt={title} width={50} height={50} />
        <div className={styles.individualGoal}>
            <h1>{title}</h1>
            <h2>{value}</h2>
        </div>
        <div className={styles.goalPercentage}>{progress}</div>
    </div>
);

export default Goal;
