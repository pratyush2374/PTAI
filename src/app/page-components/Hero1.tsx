"use client";

import Link from "next/link";
import Introduction from "./Introduction";

const Hero1: React.FC = () => {
    const genderOptions = [
        { id: "male", value: "male", label: "Male" },
        { id: "female", value: "female", label: "Female" },
        { id: "others", value: "others", label: "Others" },
    ];

    const fitnessGoals = [
        "Lose Weight",
        "Build Muscle",
        "Improve Stamina",
        "Enhance Flexibility",
        "Boost Overall Health",
    ];

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
                            <form>
                                <input
                                    type="text"
                                    name="height"
                                    id="height"
                                    className="handw"
                                    placeholder="Height (in cm)"
                                />
                                <input
                                    type="text"
                                    name="weight"
                                    id="weight"
                                    className="handw"
                                    placeholder="Weight (in kg)"
                                />

                                <div className="gender">
                                    {genderOptions.map((option) => (
                                        <div key={option.id}>
                                            <input
                                                type="radio"
                                                name="gender"
                                                id={option.id}
                                                value={option.value}
                                            />
                                            <label htmlFor={option.id}>{` ${option.label}`}</label>
                                        </div>
                                    ))}
                                </div>

                                <div className="convertToftandpound">
                                    <p>Convert to ft and pound</p>
                                </div>

                                <div className="buttonBMI">Calculate BMI</div>
                            </form>
                        </div>

                        <div className="outerBar">
                            <div className="userbmi">
                                <h2>24</h2>
                                <h3>Your BMI</h3>
                                <h3 className="bmiComment">Healthy</h3>
                            </div>
                        </div>
                    </div>
                    <div className="fitness-goals">
                        <h2>What Are Your Fitness Goals?</h2>
                        <div className="goals-list">
                            {fitnessGoals.map((goal, index) => (
                                <div className="goal-item" key={index}>
                                    {goal}
                                </div>
                            ))}
                        </div>
                        <Link href="/sign-up">
                            <button className="show-plan">
                                See Your Personalized Plan
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="seperator"></div>
        </>
    );
};

export default Hero1;
