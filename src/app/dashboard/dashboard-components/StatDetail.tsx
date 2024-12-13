// Reusable component for displaying individual stats
import Image from "next/image";
import styles from "../dashboard.module.css";

interface StatDetailProps {
    imageSrc: string;
    altText: string;
    value: string | number;
    label: string;
}

const StatDetail: React.FC<StatDetailProps> = ({
    imageSrc,
    altText,
    value,
    label,
}) => (
    <div className={styles.individualStats}>
        <Image src={imageSrc} alt={altText} width={50} height={50} />
        <div className={styles.indiStats}>
            <h1>{value}</h1>
            <h2>{label}</h2>
        </div>
    </div>
);

export default StatDetail;
