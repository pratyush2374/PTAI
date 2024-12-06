import styles from "../dashboard.module.css";
import Link from "next/link";
import Image from "next/image";

const DashboardNavbar: React.FC = () => {
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navbarTabs}>
                    <Image
                        src="/Dashboard Images/Icon Black.svg"
                        alt="App Icon"
                        className={styles.logo}
                        width={40} 
                        height={40} 
                    />
                    <Link
                        href="/dashboard"
                        className={`${styles.tab} ${styles.curr}`}
                        id="curr"
                    >
                        Dashboard
                    </Link>
                    <Link href="/exercise" className={styles.tab}>
                        Exercise
                    </Link>
                    <Link href="/diet" className={styles.tab}>
                        Diet
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default DashboardNavbar;
