import Image from "next/image";
import styles from "../dashboard.module.css";

interface ExerciseDetailProps {
    icon: string;
    title: string;
    value: string | number;
    unit?: string;
}

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({ icon, title, value, unit }) => {
    return (
        <div className={styles.individualExercise}>
            <Image src={icon} alt={title} width={50} height={50} />
            <div className={styles.exerciseDetails}>
                <h1>
                    {value} {unit && <span>{unit}</span>}
                </h1>
                <h2>{title}</h2>
            </div>
        </div>
    );
};

export default ExerciseDetail;
