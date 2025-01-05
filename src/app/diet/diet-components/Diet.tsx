// Diet.tsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../diet.module.css";
import Message from "./Message";
import DayOverview from "./DayOverview";
import AllMeals from "./AllMeals";
import Navbar from "@/app/(common-components)/Navbar";
import { DailyStats } from "./types";

const Diet: React.FC = () => {
    const [dietData, setDietData] = useState<DailyStats | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDietData = async () => {
            try {
                const response = await axios.get("/api/get-diet-data");
                setDietData(response.data.dailyStats);
                setError(null);
            } catch (err) {
                setError("Failed to load diet data. Please try again later.");
                console.error("Error fetching diet data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDietData();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <Message />
                {dietData && <AllMeals meals={dietData.meals} />}
                {dietData && <DayOverview stats={dietData} />}
            </div>
        </>
    );
};

export default Diet;
