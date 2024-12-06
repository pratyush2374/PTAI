import styles from "../dashboard.module.css";
import WeightGraph from "../WeightGraph";

const Graph: React.FC = () => {
    return (
        <>
            <div className={styles.weightSection}>
                <div className={styles.weightHeading}>
                    <h1 className={styles.weightH1}>
                        Weight <span>(kg)</span>
                    </h1>
                    <h1 className={styles.addWeight}>+</h1>
                </div>

                <div className={styles.weightDetails}>
                    <div className={styles.weightIndividual}>
                        <h3>Current</h3>
                        <h2>78</h2>
                    </div>

                    <div className={styles.weightIndividual}>
                        <h3>Goal</h3>
                        <h2>72</h2>
                    </div>

                    <div className={styles.weightIndividual}>
                        <h3>Last 30 days</h3>
                        <h2>-2.0</h2>
                    </div>

                    <div className={styles.weightIndividual}>
                        <h3>Annual Average</h3>
                        <h2>77</h2>
                    </div>
                </div>
                <div className={styles.weightGraph}>
                    <WeightGraph />
                </div>
            </div>
        </>
    );
};

export default Graph;
