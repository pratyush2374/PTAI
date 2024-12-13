import Image from "next/image";
import styles from "../dashboard.module.css";

interface DietItemProps {
    imageSrc: string;
    mealName: string;
    mealType: string;
    time: string;
    calories: string;
}

const DietItem: React.FC<DietItemProps> = ({ imageSrc, mealName, mealType, time, calories }) => {
    return (
        <div className={styles.individualDiet}>
            <div className={styles.dietLeft}>
                <Image src={imageSrc} alt={mealType} width={100} height={100} />
                <div className={styles.dietDetails}>
                    <h1>{mealName}</h1>
                    <h2>{mealType}</h2>
                </div>
            </div>
            <div className={styles.moreDietDetails}>
                <div className={styles.innerDietDetails}>
                    <h2>{time}</h2>
                    <h3>Time</h3>
                </div>
                <div className={styles.innerDietDetails}>
                    <h2>{calories}</h2>
                    <h3>Calories</h3>
                </div>
            </div>
        </div>
    );
};

export default DietItem;
