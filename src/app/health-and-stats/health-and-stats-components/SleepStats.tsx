"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../healthTracker.module.css";
import SleepGraph from "./SleepGraph";
import SleepDetail from "./SleepDetail";
import { useToast } from "@/hooks/use-toast";

interface SleepSegment {
    startTime: string;
    endTime: string;
    type: string;
}

interface SleepReading {
    date: string;
    segments: SleepSegment[];
    totalSleepTime: number;
    deepSleepTime: number;
    lightSleepTime: number;
    remSleepTime: number;
    awakeTime: number;
}

interface SleepResponse {
    success: boolean;
    data: SleepReading[];
    metadata: {
        startDate: string;
        endDate: string;
        totalDays: number;
    };
    accessToken: string;
    accessTokenExpiry: number;
}

const SleepStats: React.FC = () => {
    const [sleepData, setSleepData] = useState<SleepReading[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const fetchSleepData = async () => {
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            const accessTokenExpiry = sessionStorage.getItem("accessTokenExpiry");

            if (!accessToken || !accessTokenExpiry) {
                throw new Error("No access token found");
            }

            const response = await axios.post<SleepResponse>(
                "/api/get-sleep-data",
                {
                    accessToken,
                    accessTokenExpiry: parseInt(accessTokenExpiry),
                }
            );

            if (response.data.accessToken) {
                sessionStorage.setItem("accessToken", response.data.accessToken);
                sessionStorage.setItem(
                    "accessTokenExpiry",
                    response.data.accessTokenExpiry.toString()
                );
            }

            setSleepData(response.data.data);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch sleep data",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSleepData();
    }, []);

    const getLatestSleepData = () => {
        if (!sleepData || sleepData.length === 0) return null;
        return sleepData[sleepData.length - 1];
    };

    const latestData = getLatestSleepData();

    const sleepDetails = [
        {
            label: "Total Sleep",
            value: latestData ? (latestData.totalSleepTime / 60).toFixed(1) : 0,
            unit: "hours",
        },
        {
            label: "Deep Sleep",
            value: latestData ? (latestData.deepSleepTime / 60).toFixed(1) : 0,
            unit: "hours",
        },
        {
            label: "REM Sleep",
            value: latestData ? (latestData.remSleepTime / 60).toFixed(1) : 0,
            unit: "hours",
        },
    ];

    if (isLoading) {
        return <div className={styles.loading}>Loading sleep data...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Sleep Monitor</h1>

            <div className={styles.details}>
                {sleepDetails.map((detail, index) => (
                    <SleepDetail
                        key={index}
                        label={detail.label}
                        value={detail.value}
                        unit={detail.unit}
                    />
                ))}
            </div>

            <div className={styles.graphContainer}>
                {sleepData && <SleepGraph data={sleepData} />}
            </div>
        </div>
    );
};

export default SleepStats;

