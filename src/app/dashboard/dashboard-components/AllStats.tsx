import styles from "../dashboard.module.css";
import StatDetail from "./StatDetail";

const AllStats: React.FC = () => {
    // Data for all stats
    const stats = [
        {
            imageSrc: "/Dashboard Images/threadmill.svg",
            altText: "Fire",
            value: 27,
            label: "Total Workouts",
        },
        {
            imageSrc: "/Dashboard Images/fire color.svg",
            altText: "Calories",
            value: 12780,
            label: "Total Calories Burnt",
        },
        {
            imageSrc: "/Dashboard Images/time.svg",
            altText: "Time",
            value: "1260 mins",
            label: "Total Minutes Worked",
        },
        {
            imageSrc: "/Dashboard Images/crown.svg",
            altText: "Streak",
            value: 30,
            label: "Highest Streak",
        },
        {
            imageSrc: "/Dashboard Images/exercise doing.svg",
            altText: "Average",
            value: 150,
            label: "Average Calories Burnt Per Workout",
        },
        {
            imageSrc: "/Dashboard Images/goal.svg",
            altText: "Goal",
            value: "92%",
            label: "Goal Achievement",
        },
        {
            imageSrc: "/Dashboard Images/food6.svg",
            altText: "Meal",
            value: 114,
            label: "Total Meals Logged",
        },
        {
            imageSrc: "/Dashboard Images/water color.svg",
            altText: "Water",
            value: "93L",
            label: "Total Water Intake",
        },
        {
            imageSrc: "/Dashboard Images/sleep color.svg",
            altText: "Sleep",
            value: 240,
            label: "Total Hours Slept",
        },
    ];

    return (
        <div className={styles.allStats}>
            <div className={styles.allStatsHeading}>
                <h1>All Stats</h1>
            </div>

            <div className={styles.allStatsSection}>
                {stats.map((stat, index) => (
                    <StatDetail
                        key={index}
                        imageSrc={stat.imageSrc}
                        altText={stat.altText}
                        value={stat.value}
                        label={stat.label}
                    />
                ))}
            </div>
        </div>
    );
};

export default AllStats;
