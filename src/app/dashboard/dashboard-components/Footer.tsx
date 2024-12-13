import Image from "next/image";
import styles from "../dashboard.module.css";
import SocialMediaLink from "./SocialMediaLink";
import FooterLink from "./FooterLink";

const Footer: React.FC = () => {
    const quickLinks = [
        { href: "#dashboard", label: "Home" },
        { href: "#exercise", label: "Exercise" },
        { href: "#diet", label: "Diet" },
        { href: "#contact", label: "Contact Us" },
    ];

    const socialLinks = [
        { href: "#", src: "/Dashboard Images/facebook.svg", alt: "Facebook" },
        { href: "#", src: "/Dashboard Images/twitter.svg", alt: "Twitter" },
        { href: "#", src: "/Dashboard Images/ins.svg", alt: "Instagram" },
        { href: "#", src: "/Dashboard Images/link.svg", alt: "LinkedIn" },
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerLogo}>
                    <Image
                        src="/Dashboard Images/Icon Black.svg"
                        alt="PTAI Logo"
                        width={50}
                        height={50}
                    />
                </div>
                <div className={styles.footerLinks}>
                    <h3>Quick Links</h3>
                    <ul>
                        {quickLinks.map((link, index) => (
                            <FooterLink
                                key={index}
                                href={link.href}
                                label={link.label}
                            />
                        ))}
                    </ul>
                </div>
                <div className={styles.footerSocial}>
                    <h3>Follow Us</h3>
                    <ul>
                        {socialLinks.map((link, index) => (
                            <SocialMediaLink
                                key={index}
                                href={link.href}
                                src={link.src}
                                alt={link.alt}
                            />
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>&copy; 2024 PTAI. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
