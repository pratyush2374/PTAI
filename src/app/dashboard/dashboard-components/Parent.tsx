import styles from "../dashboard.module.css";
import Link from "next/link";
import Image from "next/image";
import Main from "./Main";
import Right from "./Right";

const Parent: React.FC = () => {
    return (
        <>
            <div className={styles.parent}>
                <Main />
            </div>
        </>
    );
};

export default Parent;
