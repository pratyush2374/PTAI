import AllExercises from "./AllExercises";
import DayOverview from "./DayOverview";
import Navbar from "@/app/(common-components)/Navbar";
import Message from "./Message";
import styles from "../exercise.module.css";


const Exercise: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <Message />
                <DayOverview />
                <AllExercises />
            </div>
        </>
    );
};

export default Exercise;
