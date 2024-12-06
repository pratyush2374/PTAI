"use client"

const Features: React.FC = () => {
    return (
        <>
            <div className="features" id="features">
                <div className="features-box">
                    <h1 className="font-semibold">Features of HolisticFit AI</h1>
                    <div className="feature-list">
                        <div className="feature-item">
                            <h2 className="font-semibold">Personalized Diet Plans</h2>
                            <p>
                                Get customized diet plans tailored to your
                                fitness goals and dietary preferences.
                            </p>
                        </div>
                        <div className="feature-item">
                            <h2 className="font-semibold">Exercise Recommendations</h2>
                            <p>
                                Receive exercise routines designed to help you
                                achieve your fitness objectives effectively.
                            </p>
                        </div>
                        <div className="feature-item">
                            <h2 className="font-semibold">Progress Tracking</h2>
                            <p>
                                Track your progress with detailed analytics and
                                insights on your fitness journey.
                            </p>
                        </div>
                        <div className="feature-item">
                            <h2 className="font-semibold">AI-Powered Insights</h2>
                            <p>
                                Utilize AI-driven insights to optimize your
                                fitness regimen and dietary choices.
                            </p>
                        </div>
                        <div className="feature-item">
                            <h2 className="font-semibold">Custom Workout Plans</h2>
                            <p>
                                Generate workout plans that adapt to your
                                progress and changing fitness needs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="seperator"></div>
        </>
    );
};

export default Features;
