import styles from "../dashboard.module.css";

const WelcomeMessage: React.FC = () => {
    return (
        <>
            <div className={styles.welcomeMessage}>
                <p className={styles.greeting}>Good Morning</p>
                <h1>Welcome Back, Pratyush 🎉</h1>
            </div>
        </>
    );
};

export default WelcomeMessage;
