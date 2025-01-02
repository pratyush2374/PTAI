import styles from "../dashboard.module.css";
import Main from "./Main";
import { Toaster } from "@/components/ui/toaster";

const Parent: React.FC = () => {
    return (
        <>
            <div className={styles.parent}>
                <Main />
                <Toaster />
            </div>
        </>
    );
};

export default Parent;
