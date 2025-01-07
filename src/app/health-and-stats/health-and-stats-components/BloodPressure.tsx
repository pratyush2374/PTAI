// BloodPressure.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../healthTracker.module.css";
import BloodPressureGraph from "./BloodPressureGraph";
import BloodPressureDetail from "./BloodPressureDetail";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

interface BloodPressureReading {
  date: string;
  readings: Array<{
    systolic: number;
    diastolic: number;
    timestamp: string;
  }>;
  averageSystolic: number;
  averageDiastolic: number;
  minSystolic: number | null;
  maxSystolic: number | null;
  minDiastolic: number | null;
  maxDiastolic: number | null;
  readingCount: number;
}

interface BloodPressureResponse {
  success: boolean;
  data: BloodPressureReading[];
  metadata: {
    startDate: string;
    endDate: string;
    totalDays: number;
  };
  accessToken : string;
  accessTokenExpiry : number;
}

const BloodPressure: React.FC = () => {
  const [bloodPressureData, setBloodPressureData] = useState<BloodPressureReading[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchBloodPressureData = async () => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      const accessTokenExpiry = sessionStorage.getItem('accessTokenExpiry');

      if (!accessToken || !accessTokenExpiry) {
        throw new Error('No access token found');
      }

      const response = await axios.post<BloodPressureResponse>('/api/get-blood-pressure-data', {
        accessToken,
        accessTokenExpiry: parseInt(accessTokenExpiry),
      });

      if (response.data.accessToken) {
        sessionStorage.setItem('accessToken', response.data.accessToken);
        sessionStorage.setItem('accessTokenExpiry', response.data.accessTokenExpiry.toString());
      }

      setBloodPressureData(response.data.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blood pressure data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBloodPressureData();
  }, []);

  const getLatestReadings = () => {
    if (!bloodPressureData || bloodPressureData.length === 0) return null;
    
    const latestDayWithReadings = bloodPressureData
      .filter(day => day.readingCount > 0)
      .pop();
      
    return latestDayWithReadings || null;
  };

  const latestData = getLatestReadings();

  const pressureDetails = [
    { 
      label: "Latest Systolic",
      value: latestData?.averageSystolic || 0,
      unit: "mmHg"
    },
    {
      label: "Latest Diastolic",
      value: latestData?.averageDiastolic || 0,
      unit: "mmHg"
    },
    {
      label: "Readings Today",
      value: latestData?.readingCount || 0,
      unit: "readings"
    }
  ];

  if (isLoading) {
    return <div className={styles.loading}>Loading blood pressure data...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Blood Pressure Monitor</h1>
      
      <div className={styles.details}>
        {pressureDetails.map((detail, index) => (
          <BloodPressureDetail
            key={index}
            label={detail.label}
            value={detail.value}
            unit={detail.unit}
          />
        ))}
      </div>

      <div className={styles.graphContainer}>
        {bloodPressureData && (
          <BloodPressureGraph data={bloodPressureData} />
        )}
      </div>
    </div>
  );
};

export default BloodPressure;

