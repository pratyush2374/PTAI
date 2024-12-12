import { useState } from "react";
import styles from "../dashboard.module.css";
import Link from "next/link";
import Image from "next/image";

const DashboardNavbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarTabs}>
                <Image
                    src="/Dashboard Images/Icon Black.svg"
                    alt="App Icon"
                    className={styles.logo}
                    width={40}
                    height={40}
                />
                <div className={styles.mobileMenu} onClick={toggleMenu}>
                    <Image
                        src={
                            isMenuOpen
                                ? "/Dashboard Images/close.svg"
                                : "/Dashboard Images/hamburger.svg"
                        }
                        alt="Hamburger Icon"
                        width={30}
                        height={30}
                    />
                </div>

                <div
                    className={`${styles.menuItems} ${
                        isMenuOpen ? styles.menuOpen : ""
                    }`}
                >
                    <div className={styles.outerMenu}>
                        <Link href="/dashboard" className={styles.tab}>
                            Dashboard
                        </Link>
                        <Link href="/exercise" className={styles.tab}>
                            Exercise
                        </Link>
                        <Link href="/diet" className={styles.tab}>
                            Diet
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
