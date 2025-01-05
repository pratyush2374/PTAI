import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import styles from "../dashboard.module.css";

const WelcomeMessage: React.FC = () => {
    const { data: session } = useSession();
    const [greeting, setGreeting] = useState("Hello");

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            setGreeting("Good Morning");
        } else if (currentHour < 18) {
            setGreeting("Good Afternoon");
        } else {
            setGreeting("Good Evening");
        }
    }, []); 

    return (
        <div className={styles.welcomeMessage}>
            <p className={styles.greeting}>{greeting}</p>
            <h1>Welcome Back, {session?.user?.fullName || "Guest"} 🎉</h1>
        </div>
    );
};

export default WelcomeMessage;
