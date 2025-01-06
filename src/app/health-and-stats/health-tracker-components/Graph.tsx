import styles from "../healthTracker.module.css";
import WeightGraph from "./WeightGraph";
import WeightDetail from "./WeightDetial";

const Graph: React.FC = () => {
    // Data for weight details
    const weightDetails = [
        { value: 78, label: "Current" },
        { value: 72, label: "Goal" },
        { value: -2.0, label: "Last 30 days" },
        { value: 77, label: "Annual Average" },
    ];

    return (
        <>
            <h1 className={styles.heading}>Your weight data</h1>
            <div className={styles.weightSection}>
                <div className={styles.weightHeading}>
                    <h1 className={styles.weightH1}>
                        Weight <span>(kg)</span>
                    </h1>
                    <h1 className={styles.addWeight}>+</h1>
                </div>

                <div className={styles.weightDetails}>
                    {weightDetails.map((detail, index) => (
                        <WeightDetail
                            key={index}
                            value={detail.value}
                            label={detail.label}
                        />
                    ))}
                </div>

                <div className={styles.weightGraph}>
                    <WeightGraph />
                </div>
            </div>
        </>
    );
};

export default Graph;
