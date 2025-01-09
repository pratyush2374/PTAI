"use client";

import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "../healthTracker.module.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface SleepGraphProps {
    data: Array<{
        date: string;
        totalSleepTime: number;
        deepSleepTime: number;
        remSleepTime: number;
    }>;
}

const SleepGraph: React.FC<SleepGraphProps> = ({ data }) => {
    const dates = data.map((item) => new Date(item.date).toLocaleDateString());
    const totalSleepHours = data.map((item) => item.totalSleepTime / 60 || 0);
    const deepSleepHours = data.map((item) => item.deepSleepTime / 60 || 0);
    const remSleepHours = data.map((item) => item.remSleepTime / 60 || 0);

    const chartData = {
        labels: dates,
        datasets: [
            {
                label: "Total Sleep",
                data: totalSleepHours,
                borderColor: "#4c6ef5",
                backgroundColor: "rgba(76, 110, 245, 0.1)",
                fill: true,
                tension: 0.4,
            },
            {
                label: "Deep Sleep",
                data: deepSleepHours,
                borderColor: "#82c91e",
                backgroundColor: "rgba(130, 201, 30, 0.1)",
                fill: true,
                tension: 0.4,
            },
            {
                label: "REM Sleep",
                data: remSleepHours,
                borderColor: "#be4bdb",
                backgroundColor: "rgba(190, 75, 219, 0.1)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options: any = {
        responsive: true,
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
        scales: {
            y: {
                min: 0,
                max: 12,
                grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                },
                ticks: {
                    stepSize: 2,
                    callback: function (value: number) {
                        return `${value}h`;
                    },
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                position: "top" as const,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `${context.dataset.label}: ${context.raw.toFixed(
                            1
                        )} hours`;
                    },
                },
            },
        },
    };

    return (
        <div className={styles.weightGraphOther}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default SleepGraph;
