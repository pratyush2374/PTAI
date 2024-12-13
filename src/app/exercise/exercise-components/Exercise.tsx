import AllExercises from "./AllExercises";
import DayOverview from "./DayOverview";
import ExerciseNavbar from "./ExerciseNavbar";
import Message from "./Message";
import styles from "../exercise.module.css";
import TrackExercises from "./TrackExercises";
import { Toaster } from "@/components/ui/toaster";

const Exercise: React.FC = () => {
    return (
        <>
            <ExerciseNavbar />
            <div className={styles.container}>
                <Message />
                <DayOverview />
                <AllExercises />
            </div>
            <TrackExercises />
            <Toaster />
        </>
    );
};

export default Exercise;
