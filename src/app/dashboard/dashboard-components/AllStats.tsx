import Image from "next/image";
import styles from "../dashboard.module.css";

const AllStats: React.FC = () => {
    return (
        <>
            <div className={styles.allStats}>
                <div className={styles.allStatsHeading}>
                    <h1>All Stats</h1>
                </div>

                <div className={styles.allStatsSection}>
                    <div className={styles.individualStats}>
                        <Image
                            src="/Dashboard Images/threadmill.svg"
                            alt="Fire"
                            width={50} // Replace with your image's width
                            height={50} // Replace with your image's height
                        />
                        <div className={styles.indiStats}>
                            <h1>27</h1>
                            <h2>Total Workouts</h2>
                        </div>
                    </div>
                    <div className={styles.individualStats}>
                        <Image
                            src="/Dashboard Images/fire color.svg"
                            alt="Calories"
                            width={50}
                            height={50}
                        />
                        <div className={styles.indiStats}>
                            <h1>12780</h1>
                            <h2>Total Calories Burnt</h2>
                        </div>
                    </div>
                    <div className={styles.individualStats}>
                        <Image
                            src="/Dashboard Images/time.svg"
                            alt="Time"
                            width={50}
                            height={50}
                        />
                        <div className={styles.indiStats}>
                            <h1>1260 mins</h1>
                            <h2>Total Minutes Worked</h2>
                        </div>
                    </div>
                    <div className={styles.individualStats}>
                        <Image
                            src="/Dashboard Images/crown.svg"
                            alt="Streak"
                            width={50}
                            height={50}
                        />
                        <div className={styles.indiStats}>
                            <h1>30</h1>
                            <h2>Highest Streak</h2>
                        </div>
                    </div>
                    <div className={styles.individualStats}>
                        <Image
                            src="/Dashboard Images/exercise doing.svg"
                            alt="Average"
                            width={50}
                            height={50}
                        />
                        <div className={styles.indiStats}>
                            <h1>150</h1>
                            <h2>Average Calories Burnt Per Workout</h2>
                        </div>
                    </div>
                    <div className={styles.individualStats}>
                        <Image
                            src="/Dashboard Images/goal.svg"
                            alt="Goal"
                            width={50}
                            height={50}
                        />
                        <div className={styles.indiStats}>
                            <h1>92%</h1>
                            <h2>Goal Achievement</h2>
                        </div>
                    </div>
                    <div className={styles.individualStats}>
                        <Image
                            src="/Dashboard Images/food6.svg"
                            alt="Meal"
                            width={50}
                            height={50}
                        />
                        <div className={styles.indiStats}>
                            <h1>114</h1>
                            <h2>Total Meals Logged</h2>
                        </div>
                    </div>
                    <div className={styles.individualStats}>
                        <Image
                            src="/Dashboard Images/water color.svg"
                            alt="Water"
                            width={50}
                            height={50}
                        />
                        <div className={styles.indiStats}>
                            <h1>93L</h1>
                            <h2>Total Water Intake</h2>
                        </div>
                    </div>
                    <div className={styles.individualStats}>
                        <Image
                            src="/Dashboard Images/sleep color.svg"
                            alt="Sleep"
                            width={50}
                            height={50}
                        />
                        <div className={styles.indiStats}>
                            <h1>240</h1>
                            <h2>Total Hours Slept</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllStats;
