import styles from "../dashboard.module.css";
import AllStats from "../../(common-components)/AllStats";
import Graph from "../../health-and-stats/health-and-stats-components/Graph";

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
