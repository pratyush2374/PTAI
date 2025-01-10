"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../healthTracker.module.css";
import BloodSugarGraph from "./BloodSugarGraph";
import BloodSugarDetail from "./BloodSugarDetail";
import { useToast } from "@/hooks/use-toast";

interface BloodSugarReading {
    date: string;
    readings: Array<{
        glucoseLevel: number;
        timestamp: string;
    }>;
    averageGlucose: number;
    minGlucose: number | null;
    maxGlucose: number | null;
    readingCount: number;
}

interface BloodSugarResponse {
    success: boolean;
    data: BloodSugarReading[];
    metadata: {
        startDate: string;
        endDate: string;
        totalDays: number;
    };
    accessToken: string;
    accessTokenExpiry: number;
}

const BloodGlucose: React.FC = () => {
    const [bloodSugarData, setBloodSugarData] = useState<
        BloodSugarReading[] | null
    >(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const [report, setReport] = useState(null);
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);

    const fetchBloodSugarData = async () => {
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            const accessTokenExpiry =
                sessionStorage.getItem("accessTokenExpiry");

            if (!accessToken || !accessTokenExpiry) {
                throw new Error("No access token found");
            }

            const response = await axios.post<BloodSugarResponse>(
                "/api/get-blood-glucose-data",
                {
                    accessToken,
                    accessTokenExpiry: parseInt(accessTokenExpiry),
                }
            );

            if (response.data.accessToken) {
                sessionStorage.setItem(
                    "accessToken",
                    response.data.accessToken
                );
                sessionStorage.setItem(
                    "accessTokenExpiry",
                    response.data.accessTokenExpiry.toString()
                );
            }

            setBloodSugarData(response.data.data);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch blood sugar data",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBloodSugarData();
    }, []);

    const generateReport = async () => {
        setIsGeneratingReport(true);
        try {
            const dataForReport = {
                which: "Blood Glucose",
                bloodSugarData,
            };
            const response = await axios.post(
                "/api/generate-report",
                dataForReport
            );
            setReport(response.data.report);
            toast({
                title: "Success",
                description: "Report generated successfully",
            });

            window.scrollBy({
                top: 700,
                behavior: "smooth",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to generate report",
                variant: "destructive",
            });
        } finally {
            setIsGeneratingReport(false);
        }
    };

    const getLatestReadings = () => {
        if (!bloodSugarData || bloodSugarData.length === 0) return null;

        const latestDayWithReadings = bloodSugarData
            .filter((day) => day.readingCount > 0)
            .pop();

        return latestDayWithReadings || null;
    };

    const latestData = getLatestReadings();

    const sugarDetails = [
        {
            label: "Latest Glucose",
            value: latestData?.averageGlucose || 0,
            unit: "mg/dL",
        },
        {
            label: "Readings Today",
            value: latestData?.readingCount || 0,
            unit: "readings",
        },
    ];

    if (isLoading) {
        return (
            <div className={styles.loading}>Loading blood sugar data...</div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Blood Sugar Monitor</h1>

            <div className={styles.details}>
                {sugarDetails.map((detail, index) => (
                    <BloodSugarDetail
                        key={index}
                        label={detail.label}
                        value={detail.value}
                        unit={detail.unit}
                    />
                ))}
            </div>

            <div className={styles.weightGraph}>
                {bloodSugarData && <BloodSugarGraph data={bloodSugarData} />}
            </div>

            <button
                className={styles.reportButton}
                onClick={generateReport}
                disabled={isGeneratingReport}
            >
                {isGeneratingReport
                    ? "Generating Report..."
                    : "Generate Report"}
            </button>

            {report && (
                <div className={styles.reportContainer}>
                    <h2 className={styles.reportHeading}>Generated Report</h2>
                    <p className={styles.reportContent}>{report}</p>
                </div>
            )}
        </div>
    );
};

export default BloodGlucose;
