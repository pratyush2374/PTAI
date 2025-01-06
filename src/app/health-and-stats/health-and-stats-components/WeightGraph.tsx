"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend
);

interface WeightGraphProps {
    data: {
        [key: string]: number;
    };
}

const WeightGraph: React.FC<WeightGraphProps> = ({ data }) => {
    const chartData = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "Weight (kg)",
                data: [
                    data.january,
                    data.february,
                    data.march,
                    data.april,
                    data.may,
                    data.june,
                    data.july,
                    data.august,
                    data.september,
                    data.october,
                    data.november,
                    data.december,
                ],
                borderColor: "#007bff",
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                borderWidth: 2,
                fill: true,
            },
        ],
    };

    const options: any = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                min: 50,
                max: 100,
                beginAtZero: false,
                ticks: {
                    stepSize: 10,
                },
                grid: {
                    borderDash: [5, 5],
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        return `Weight: ${tooltipItem.raw} kg`;
                    },
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default WeightGraph;