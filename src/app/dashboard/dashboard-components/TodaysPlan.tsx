import styles from "../dashboard.module.css";
import Exercise from "./Exercise";
import Diet from "./Diet";

const TodaysPlan: React.FC<any> = ({dataForExercise, dataForDiet}) => {
    return (
        <>
            <div className={styles.todaysPlan}>
                <h1 className={styles.today}>Today's Plan</h1>
                <Exercise dataForExercise={dataForExercise} />
                <Diet dataForDiet={dataForDiet} />
            </div>
        </>
    );
};

export default TodaysPlan;
