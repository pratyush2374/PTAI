"use client";

import Link from "next/link";
import Introduction from "./Introduction";

const Hero1: React.FC = () => {
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
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="male"
                                        value="male"
                                    />
                                    <label htmlFor="male"> Male</label>

                                    <input
                                        type="radio"
                                        name="gender"
                                        id="female"
                                        value="female"
                                    />
                                    <label htmlFor="female"> Female</label>

                                    <input
                                        type="radio"
                                        name="gender"
                                        id="others"
                                        value="others"
                                    />
                                    <label htmlFor="others"> Others</label>
                                </div>

                                <div className="convertToftandpound">
                                    <p>Convert to ft and pound</p>
                                </div>

                                <div className="button">
                                    <p></p>
                                </div>
                            </form>
                        </div>

                        <div className="outerBar">
                            <div className="barForBmi"></div>
                            <div className="arrow">
                                <b>^</b>
                            </div>
                            <div className="userbmi">
                                <h2>24</h2>
                                <h3>Your BMI</h3>
                            </div>
                        </div>
                    </div>
                    <div className="fitness-goals">
                        <h2>What Are Your Fitness Goals?</h2>
                        <div className="goals-list">
                            <div className="goal-item">Lose Weight</div>
                            <div className="goal-item">Build Muscle</div>
                            <div className="goal-item">Improve Stamina</div>
                            <div className="goal-item">Enhance Flexibility</div>
                            <div className="goal-item">
                                Boost Overall Health
                            </div>
                        </div>
                        <Link href="/login">
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
