import Image from "next/image";
import styles from "../dashboard.module.css";

const Right: React.FC = () => {
    return (
        <>
            <div className={styles.right}>
                <div className={styles.userInfo}>
                    <div className={styles.user}>
                        <Image
                            src="/Dashboard Images/profile.svg"
                            alt="profile"
                            width={50} // Set appropriate width
                            height={50} // Set appropriate height
                        />
                        <h1 className={styles.rightUserName}>Pratyush Sharma</h1>
                    </div>
                </div>

                <div className={styles.userDetails}>
                    <div className={styles.weight}>
                        <h2>
                            78<span className={styles.rightUnit}>kg</span>
                        </h2>
                        <h3>Weight</h3>
                    </div>
                    <div className={styles.height}>
                        <h2>
                            175<span className={styles.rightUnit}>cm</span>
                        </h2>
                        <h3>Height</h3>
                    </div>
                    <div className={styles.age}>
                        <h2>
                            20<span className={styles.rightUnit}>yrs</span>
                        </h2>
                        <h3>Age</h3>
                    </div>
                </div>

                <div className={styles.goals}>
                    <h1 className={styles.yrGoals}>Your Goals</h1>
                    <div className={styles.goalsInner}>
                        <Image
                            src="/Dashboard Images/steps shoe.svg"
                            alt="Running"
                            width={50} // Set appropriate width
                            height={50} // Set appropriate height
                        />
                        <div className={styles.individualGoal}>
                            <h1>Running</h1>
                            <h2>30km/35km</h2>
                        </div>
                        <div className={styles.goalPercentage}>85.7%</div>
                    </div>

                    <div className={styles.goalsInner}>
                        <Image
                            src="/Dashboard Images/weight color.svg"
                            alt="Weight Loss"
                            width={50} // Set appropriate width
                            height={50} // Set appropriate height
                        />
                        <div className={styles.individualGoal}>
                            <h1>Weight Loss</h1>
                            <h2>Target Weight: 73kg</h2>
                        </div>
                        <div className={styles.goalPercentage}>5kgs</div>
                    </div>

                    <div className={styles.goalsInner}>
                        <Image
                            src="/Dashboard Images/sleep color.svg"
                            alt="Sleeping"
                            width={50} // Set appropriate width
                            height={50} // Set appropriate height
                        />
                        <div className={styles.individualGoal}>
                            <h1>Sleeping</h1>
                            <h2>47hrs/50hrs</h2>
                        </div>
                        <div className={styles.goalPercentage}>94%</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Right;
