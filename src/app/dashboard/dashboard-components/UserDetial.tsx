import styles from "../dashboard.module.css";

interface UserDetailProps {
    value: string | number;
    unit: string;
    label: "Weight" | "Height" | "Age";
}

// Mapping labels to styles
const labelToClassMap: { [key in "Weight" | "Height" | "Age"]: string } = {
    Weight: "weight",
    Height: "height",
    Age: "age",
};

const UserDetail: React.FC<UserDetailProps> = ({ value, unit, label }) => {
    const className = labelToClassMap[label];

    return (
        <div className={styles[className]}>
            <h2>
                {value}
                <span className={styles.rightUnit}>{unit}</span>
            </h2>
            <h3>{label}</h3>
        </div>
    );
};

export default UserDetail;
