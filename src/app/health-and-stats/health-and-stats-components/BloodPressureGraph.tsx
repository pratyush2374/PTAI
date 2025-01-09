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

interface BloodPressureGraphProps {
  data: Array<{
    date: string;
    averageSystolic: number;
    averageDiastolic: number;
  }>;
}

const BloodPressureGraph: React.FC<BloodPressureGraphProps> = ({ data }) => {
  const dates = data.map(item => new Date(item.date).toLocaleDateString());
  const systolicData = data.map(item => item.averageSystolic || 0);
  const diastolicData = data.map(item => item.averageDiastolic || 0);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Systolic',
        data: systolicData,
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Diastolic',
        data: diastolicData,
        borderColor: '#4dabf7',
        backgroundColor: 'rgba(77, 171, 247, 0.1)',
        fill: true,
        tension: 0.4,
      },
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
        min: 40,
        max: 180,
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
            return `${context.dataset.label}: ${context.raw} mmHg`;
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

export default BloodPressureGraph;