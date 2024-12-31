import styles from "../dashboard.module.css";
import WelcomeMessage from "./WelcomeMessage";
import DataBoxes from "./DataBoxes";
import TodaysPlan from "./TodaysPlan";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const Main: React.FC = () => {
    const { data: session } = useSession();
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        (async function() {
            try {
                const response = await axios.get("/api/get-user-stats");
                setUserData(response.data);
            } catch (error) {
                console.log(error);
            }
        })()    
    }, [])
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
