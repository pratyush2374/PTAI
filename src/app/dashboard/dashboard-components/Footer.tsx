import Image from "next/image";
import styles from "../dashboard.module.css";

const Footer: React.FC = () => {
    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerLogo}>
                        <Image
                            src="/Dashboard Images/Icon Black.svg"
                            alt="PTAI Logo"
                            width={50} // Specify the image width
                            height={50} // Specify the image height
                        />
                    </div>
                    <div className={styles.footerLinks}>
                        <h3>Quick Links</h3>
                        <ul>
                            <li>
                                <a href="#dashboard">Home</a>
                            </li>
                            <li>
                                <a href="#exercise">Exercise</a>
                            </li>
                            <li>
                                <a href="#diet">Diet</a>
                            </li>
                            <li>
                                <a href="#contact">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.footerSocial}>
                        <h3>Follow Us</h3>
                        <ul>
                            <li>
                                <a href="#">
                                    <Image
                                        src="/Dashboard Images/facebook.svg"
                                        alt="Facebook"
                                        width={20} // Set width for the icon
                                        height={20} // Set height for the icon
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Image
                                        src="/Dashboard Images/twitter.svg"
                                        alt="Twitter"
                                        width={20}
                                        height={20}
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Image
                                        src="/Dashboard Images/ins.svg"
                                        alt="Instagram"
                                        width={20}
                                        height={20}
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Image
                                        src="/Dashboard Images/link.svg"
                                        alt="LinkedIn"
                                        width={20}
                                        height={20}
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <p>&copy; 2024 PTAI. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
