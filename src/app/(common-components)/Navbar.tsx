"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./component.module.css";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const menuItems = [
        { name: "Dashboard", link: "/dashboard" },
        { name: "Exercise", link: "/exercise" },
        { name: "Diet", link: "/diet" },
        // { name: "Track Exercise", link: "/track-exercise" },
        { name: "Track Diet", link: "/track-diet" },
        { name: "Health & Stats", link: "/health-and-stats" },
        { name: "Account Settings", link: "/account-settings" },
        { name: "Sign Out", link: "/sign-out" },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarTabs}>
                <Link href="/">
                    <Image
                        src="/Dashboard Images/Icon Black.svg"
                        alt="App Icon"
                        className={styles.logo}
                        width={40}
                        height={40}
                    />
                </Link>
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
                        {menuItems.map((item) => (
                            <Link
                                key={item.link}
                                href={item.link}
                                className={styles.tab}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
