import styles from "../dashboard.module.css";
import Exercise from "./Exercise";
import Diet from "./Diet";

const TodaysPlan: React.FC = () => {
    return (
        <>
            <div className={styles.todaysPlan}>
                <h1 className={styles.today}>Today's Plan</h1>
                <Exercise />
                <Diet />
            </div>
        </>
    );
};

export default TodaysPlan;
