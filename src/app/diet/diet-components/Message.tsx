"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../diet.module.css";

const Message : React.FC = () => {
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = `${currentDate
            .getDate()
            .toString()
            .padStart(2, "0")}/${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
        setDate(formattedDate);
    }, []);

    return (
        <div className={styles.messageContainer}>
            <div className={styles.leftText}>Today's Plan</div>
            <div className={styles.rightContent}>
                <Image
                    src="/Exercise Images/calendar.png"
                    alt="Calendar Icon"
                    width={24}
                    height={24}
                    className={styles.calendarIcon}
                />
                <div className={styles.rightText}>{date}</div>
            </div>
        </div>
    );
}

export default Message