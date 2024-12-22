import styles from "../dashboard.module.css";
import AllStats from "./AllStats";
import Graph from "../../health-tracker/health-tracker-components/Graph";

const LowerParent: React.FC = () => {
    return (
        <>
            <div className={styles.lowerParent}>
                <div className={styles.otherStats}>

                </div>
            </div>
        </>
    );
};

export default LowerParent;
