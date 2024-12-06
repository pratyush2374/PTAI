import Image from "next/image";
import styles from "../dashboard.module.css";
import Link from "next/link";

const Exercise: React.FC = () => {
    return (
        <>
            <div className={styles.exercise}>
                <div className={styles.showEx}>
                    <Image
                        src="/Dashboard Images/exercise doing.svg"
                        alt="Exercise"
                        width={50} // Replace with your image's width
                        height={50} // Replace with your image's height
                    />
                    <h1 className={styles.ex}>Exercise</h1>
                </div>
                <div className={styles.exerciseInner}>
                    <div className={styles.individualExercise}>
                        <Image
                            src="/Dashboard Images/focus.svg"
                            alt="Focus"
                            width={50}
                            height={50}
                        />
                        <div className={styles.exerciseDetails}>
                            <h1>Chest</h1>
                            <h2>Focus Area</h2>
                        </div>
                    </div>

                    <div className={styles.individualExercise}>
                        <Image
                            src="/Dashboard Images/duration.svg"
                            alt="Duration"
                            width={50}
                            height={50}
                        />
                        <div className={styles.exerciseDetails}>
                            <h1>
                                42 <span>mins</span>
                            </h1>
                            <h2>Duration</h2>
                        </div>
                    </div>

                    <div className={styles.individualExercise}>
                        <Image
                            src="/Dashboard Images/exercise.svg"
                            alt="Exercises"
                            width={50}
                            height={50}
                        />
                        <div className={styles.exerciseDetails}>
                            <h1>16</h1>
                            <h2>Exercises</h2>
                        </div>
                    </div>

                    <div className={styles.individualExercise}>
                        <Image
                            src="/Dashboard Images/fire.svg"
                            alt="Calories"
                            width={50}
                            height={50}
                        />
                        <div className={styles.exerciseDetails}>
                            <h1>
                                ~426 <span>cal</span>
                            </h1>
                            <h2>Calories</h2>
                        </div>
                    </div>

                    <div className={styles.individualExercise}>
                        <Image
                            src="/Dashboard Images/difficulty.svg"
                            alt="Level"
                            width={50}
                            height={50}
                        />
                        <div className={styles.exerciseDetails}>
                            <h1>Intermediate</h1>
                            <h2>Level</h2>
                        </div>
                    </div>
                </div>
                <Link href="/exercise" className="nextLink">
                    <div className={styles.goToExercise}>Go To Exercises</div>
                </Link>
            </div>
        </>
    );
};

export default Exercise;
