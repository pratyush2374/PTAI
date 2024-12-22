import styles from "../dashboard.module.css";
import Main from "./Main";

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
