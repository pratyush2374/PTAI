
"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from '../healthTracker.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BloodSugarGraphProps {
  data: Array<{
    date: string;
    averageGlucose: number;
    minGlucose: number | null;
    maxGlucose: number | null;
  }>;
}

const BloodSugarGraph: React.FC<BloodSugarGraphProps> = ({ data }) => {
  const dates = data.map(item => new Date(item.date).toLocaleDateString());
  const glucoseData = data.map(item => item.averageGlucose || 0);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Glucose Level',
        data: glucoseData,
        borderColor: '#82c91e',
        backgroundColor: 'rgba(130, 201, 30, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const options: any = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        min: 70,
        max: 200,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          stepSize: 20,
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
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw} mg/dL`;
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

export default BloodSugarGraph;