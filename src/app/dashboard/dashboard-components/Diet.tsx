import Link from "next/link";
import styles from "../dashboard.module.css";
import Image from "next/image";
import DietItem from "./DietItem";
import { useState } from "react";

const Diet: React.FC<any> = ({ dataForDiet }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div className={styles.diet}>
                <div
                    className={styles.showDiet}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <Image
                        src="/Dashboard Images/diet.svg"
                        alt="Diet"
                        width={100}
                        height={100}
                    />
                    <h1 className={styles.di}>
                        Diet{" "}
                        <span className={styles.sdet}>
                            (Click to view details)
                        </span>
                    </h1>
                </div>

                <div
                    className={`${styles.dietInner} ${
                        isExpanded ? styles.expanded : ""
                    }`} 
                >
                    {/* Map over diet items to render them dynamically */}
                    {dataForDiet.meals.map((item : any, index:any) => (
                        <DietItem
                            key={index}
                            imageSrc={`/Dashboard Images/food8.svg`} 
                            mealName={item.name}
                            mealType={item.type}
                            calories={`${item.calories} cal`} 
                        />
                    ))}
                </div>
            </div>
            <Link href="/diet" className={styles.nextLink}>
                <div className={styles.goToDiet}>Go To Diet</div>
            </Link>
        </>
    );
};

export default Diet;
