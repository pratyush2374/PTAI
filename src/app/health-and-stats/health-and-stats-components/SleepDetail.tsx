import React from "react";
import styles from "../healthTracker.module.css";

interface SleepDetailProps {
    label: string;
    value: number | string;
    unit: string;
}

const SleepDetail: React.FC<SleepDetailProps> = ({ label, value, unit }) => {
    return (
        <div className={styles.detailCard}>
            <h3 className={styles.detailLabel}>{label}</h3>
            <p className={styles.detailValue}>
                {value} <span className={styles.unit}>{unit}</span>
            </p>
        </div>
    );
};

export default SleepDetail;
