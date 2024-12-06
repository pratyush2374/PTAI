import styles from "../dashboard.module.css";
import Link from "next/link";
import Image from "next/image";
import WelcomeMessage from "./WelcomeMessage";
import DataBoxes from "./DataBoxes";
import TodaysPlan from "./TodaysPlan";

const Main: React.FC = () => {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.left}>
                    <WelcomeMessage />
                    <DataBoxes />
                    <TodaysPlan />
                </div>
            </div>
        </>
    );
};

export default Main;
