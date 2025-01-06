"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import styles from "../healthTracker.module.css";
import WeightGraph from "./WeightGraph";
import WeightDetail from "./WeightDetial";
import { useToast } from "@/hooks/use-toast";

interface WeightData {
  monthlyWeightAvg: {
    [key: string]: number;
  };
  recentWeight: number;
  averageWeight: number;
  lastMonthChange: number;
}

const Graph: React.FC = () => {
  const [weightData, setWeightData] = useState<WeightData | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset } = useForm<{ weight: number }>();

  const fetchWeightData = async () => {
    try {
      const response = await axios.get('/api/get-exercise-graph-data');
      setWeightData(response.data.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weight data",
        variant: "destructive",
      });
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchWeightData();
  }, []);

  const onSubmit = async (data: { weight: number }) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/update-weight', data);
      toast({
        title: "Success",
        description: "Weight updated successfully!",
        variant: "default",
      });
      setShowInput(false);
      reset();
      fetchWeightData(); // Refresh the data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update weight",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const weightDetails = [
    { value: weightData?.recentWeight ?? 0, label: "Current" },
    { value: 72, label: "Goal" }, // Assuming goal is static
    { value: weightData?.lastMonthChange ?? 0, label: "Last 30 days" },
    { value: weightData?.averageWeight ?? 0, label: "Annual Average" },
  ];

  return (
    <>
      <h1 className={styles.heading}>Your weight data</h1>
      <div className={styles.weightSection}>
        <div className={styles.weightHeading}>
          <h1 className={styles.weightH1}>
            Weight <span>(kg)</span>
          </h1>
          <h1 
            className={styles.addWeight} 
            onClick={() => setShowInput(!showInput)}
            style={{ cursor: 'pointer' }}
          >
            +
          </h1>
        </div>

        {showInput && (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.weightForm}>
            <input
              type="number"
              step="0.1"
              {...register("weight", { required: true })}
              placeholder="Enter weight in kg"
              className={styles.weightInput}
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={styles.weightSubmitBtn}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}

        <div className={styles.weightDetails}>
          {weightDetails.map((detail, index) => (
            <WeightDetail
              key={index}
              value={detail.value}
              label={detail.label}
            />
          ))}
        </div>

        <div className={styles.weightGraph}>
          {weightData && <WeightGraph data={weightData.monthlyWeightAvg} />}
        </div>
      </div>
    </>
  );
};

export default Graph;