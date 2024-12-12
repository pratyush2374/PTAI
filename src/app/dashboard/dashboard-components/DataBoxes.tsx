import styles from "../dashboard.module.css";
import Image from "next/image";

const DataBoxes: React.FC = () => {
    return (
        <>
            <div className={styles.dataBoxes}>
                <div className={styles.dataBox} id="steps-box">
                    <div className={styles.boxName}>
                        <Image
                            src="/Dashboard Images/steps shoe.svg"
                            alt="Steps"
                            width={24} // Adjust dimensions as per your requirements
                            height={24}
                        />
                        <h2>Steps</h2>
                    </div>
                    <div className={styles.dataValue} id="steps-value">
                        6,000 <span className={styles.unit}></span>
                    </div>
                    <div className={styles.status}>
                        <div className={styles.filledStatusSteps}></div>
                        <div className={styles.emptyStatus}></div>
                    </div>
                </div>

                <div className={styles.dataBox} id="calories-box">
                    <div className={styles.boxName}>
                        <Image
                            src="/Dashboard Images/fire color.svg"
                            alt="Calories"
                            width={24}
                            height={24}
                        />
                        <h2>Calories</h2>
                    </div>
                    <div className={styles.dataValue} id="calories-value">
                        2,000 <span className={styles.unit}>cal</span>
                    </div>
                    <div className={styles.status}>
                        <div className={styles.filledStatusCalories}></div>
                        <div className={styles.emptyStatus}></div>
                    </div>
                </div>

                <div className={styles.dataBox} id="water-box">
                    <div className={styles.boxName}>
                        <Image
                            src="/Dashboard Images/water color.svg"
                            alt="Water"
                            width={24}
                            height={24}
                        />
                        <h2>Water</h2>
                    </div>
                    <div className={styles.dataValue} id="water-value">
                        2.5 <span className={styles.unit}>lit</span>
                    </div>
                    <div className={styles.status}>
                        <div className={styles.filledStatusWater}></div>
                        <div className={styles.emptyStatus}></div>
                    </div>
                </div>

                <div className={styles.dataBox} id="sleep-box">
                    <div className={styles.boxName}>
                        <Image
                            src="/Dashboard Images/sleep color.svg"
                            alt="Sleep"
                            width={24}
                            height={24}
                        />
                        <h2>Sleep</h2>
                    </div>
                    <div className={styles.dataValue} id="sleep-value">
                        7.8 <span className={styles.unit}>hrs</span>
                    </div>
                    <div className={styles.status}>
                        <div className={styles.filledStatusSleep}></div>
                        <div className={styles.emptyStatus}></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DataBoxes;
