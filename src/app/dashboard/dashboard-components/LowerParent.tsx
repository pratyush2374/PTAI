import styles from "../dashboard.module.css";
import AllStats from "./AllStats";
import Graph from "./Graph";

const LowerParent: React.FC = () => {
    return (
        <>
            <div className={styles.lowerParent}>
                <div className={styles.otherStats}>
                    <Graph />
                    <AllStats />
                </div>
            </div>
        </>
    );
};

export default LowerParent;
