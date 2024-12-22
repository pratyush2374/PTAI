import styles from "../healthTracker.module.css";

interface WeightDetailProps {
    value: string | number;
    label: string;
}

const WeightDetail: React.FC<WeightDetailProps> = ({ value, label }) => (
    <div className={styles.weightIndividual}>
        <h2>{value}</h2>
        <h3>{label}</h3>
    </div>
);

export default WeightDetail;
