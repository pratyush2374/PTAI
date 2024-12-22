import Link from "next/link";
import styles from "../dashboard.module.css";
import Image from "next/image";
import DietItem from "./DietItem";
import { useState } from "react";

const Diet: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const dietItems = [
        {
            imageSrc: "/Dashboard Images/food8.svg",
            mealName: "Poha with Vegetables",
            mealType: "Breakfast",
            time: "8:00 AM",
            calories: "~200 cal",
        },
        {
            imageSrc: "/Dashboard Images/food1.svg",
            mealName: "Dal Tadka, Brown Rice, Mixed Vegetable Sabzi",
            mealType: "Lunch",
            time: "12:30 PM",
            calories: "~450 cal",
        },
        {
            imageSrc: "/Dashboard Images/food2.svg",
            mealName: "Paneer Tikka, Roti, Salad",
            mealType: "Dinner",
            time: "7:00 PM",
            calories: "~400 cal",
        },
        {
            imageSrc: "/Dashboard Images/food3.svg",
            mealName: "Sprout Chaat",
            mealType: "Snacks",
            time: "4:00 PM",
            calories: "~150 cal",
        },
    ];

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
                    {dietItems.map((item, index) => (
                        <DietItem
                            key={index}
                            imageSrc={item.imageSrc}
                            mealName={item.mealName}
                            mealType={item.mealType}
                            time={item.time}
                            calories={item.calories}
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
