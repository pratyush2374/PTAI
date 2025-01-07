
import React from 'react';
import styles from '../healthTracker.module.css';

interface BloodPressureDetailProps {
  label: string;
  value: number;
  unit: string;
}

const BloodPressureDetail: React.FC<BloodPressureDetailProps> = ({
  label,
  value,
  unit
}) => {
  return (
    <div className={styles.detailCard}>
      <h3 className={styles.detailLabel}>{label}</h3>
      <p className={styles.detailValue}>
        {value} <span className={styles.unit}>{unit}</span>
      </p>
    </div>
  );
};

export default BloodPressureDetail;