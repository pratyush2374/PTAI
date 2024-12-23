"use client";

import Link from "next/link";
import Introduction from "./Introduction";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Hero1: React.FC = () => {
    const { toast } = useToast();

    const genderOptions = [
        { id: "male", value: "male", label: "Male" },
        { id: "female", value: "female", label: "Female" },
        { id: "others", value: "others", label: "Others" },
    ];

    const { register, handleSubmit } = useForm();
    const [bmi, setBmi] = useState<number | null>(null);
    const [bmiComment, setBmiComment] = useState<string>("");
    const [useMetric, setUseMetric] = useState<boolean>(true);

    const calculateBMI = (data: any) => {
        const { height, weight, gender } = data;

        if (!height || !weight || !gender) {
            toast({
                variant: "destructive",
                title: "Error !",
                description: "Please enter all the required fields.",
            });
            return;
        }

        let heightInMeters: number;
        let weightInKg: number;

        if (useMetric) {
            heightInMeters = parseFloat(height) / 100;
            weightInKg = parseFloat(weight);
        } else {
            heightInMeters = parseFloat(height) * 0.3048; // Convert feet to meters
            weightInKg = parseFloat(weight) * 0.453592; // Convert pounds to kg
        }

        if (
            isNaN(heightInMeters) ||
            isNaN(weightInKg) ||
            heightInMeters <= 0 ||
            weightInKg <= 0
        ) {
            alert(
                "Invalid height or weight values. Please enter valid numbers."
            );
            return;
        }

        const calculatedBMI: number =
            weightInKg / (heightInMeters * heightInMeters);
        setBmi(calculatedBMI);

        // Set BMI category
        if (calculatedBMI < 18.5) {
            setBmiComment("Underweight");
        } else if (calculatedBMI >= 18.5 && calculatedBMI <= 24.9) {
            setBmiComment("Healthy");
        } else if (calculatedBMI >= 25 && calculatedBMI <= 29.9) {
            setBmiComment("Overweight");
        } else {
            setBmiComment("Obese");
        }
    };

    const toggleUnit = () => {
        setUseMetric((prev) => !prev);
    };

    return (
        <>
            <div className="hero1">
                <div className="slogan">
                    <h1>PTAI</h1>
                    <p>Transform Your Fitness Journey with AI</p>
                </div>

                <Introduction />

                <div className="bmi">
                    <div className="bmiInner">
                        <div className="calBMI">
                            <h1>Enter Details</h1>
                            <form onSubmit={handleSubmit(calculateBMI)}>
                                <input
                                    type="number"
                                    {...register("height")}
                                    className="handw"
                                    placeholder={
                                        useMetric
                                            ? "Height (in cm)"
                                            : "Height (in ft)"
                                    }
                                />
                                <input
                                    type="number"
                                    {...register("weight")}
                                    className="handw"
                                    placeholder={
                                        useMetric
                                            ? "Weight (in kg)"
                                            : "Weight (in pounds)"
                                    }
                                />
                                <input
                                    type="number"
                                    {...register("age")}
                                    className="handw"
                                    placeholder="Age (in years)"
                                />

                                <div className="gender">
                                    {genderOptions.map((option) => (
                                        <div key={option.id}>
                                            <input
                                                type="radio"
                                                {...register("gender")}
                                                id={option.id}
                                                value={option.value}
                                            />
                                            <label
                                                htmlFor={option.id}
                                            >{` ${option.label}`}</label>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className="convertToftandpound"
                                    onClick={toggleUnit}
                                >
                                    <p>
                                        {useMetric
                                            ? "Convert to ft and pounds"
                                            : "Convert to cm and kg"}
                                    </p>
                                </div>

                                <button type="submit" className="buttonBMI">
                                    Calculate BMI
                                </button>
                            </form>
                        </div>

                        <div className="outerBar">
                            <div className="userbmi">
                                <h2>{bmi !== null ? bmi.toFixed(1) : "--"}</h2>
                                <h3>Your BMI</h3>
                                <h3 className="bmiComment">{bmiComment}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <Link href="/sign-up" className="slink">
                    <button className="show-plan">
                        Get Your Personalized Plan
                    </button>
                </Link>
            </div>

            <div className="seperator"></div>
        </>
    );
};

export default Hero1;
