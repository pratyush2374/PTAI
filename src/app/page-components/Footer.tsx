"use client"; // Indicating this component is client-side rendered

import Image from "next/image";

const quickLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#features", label: "Features" },
    { href: "#contact", label: "Contact Us" },
];

const socialLinks = [
    { href: "#", src: "/Landing Images/facebook.svg", alt: "Facebook" },
    { href: "#", src: "/Landing Images/twitter.svg", alt: "Twitter" },
    { href: "#", src: "/Landing Images/instagram.svg", alt: "Instagram" },
    { href: "#", src: "/Landing Images/linkedin.svg", alt: "LinkedIn" },
];

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <Image
                        src="/Landing Images/Icon.svg"
                        alt="PTAI Logo"
                        width={50}
                        height={50}
                    />
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        {quickLinks.map((link, index) => (
                            <li key={index}>
                                <a href={link.href}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-social">
                    <h3>Follow Us</h3>
                    <ul>
                        {socialLinks.map((social, index) => (
                            <li key={index}>
                                <a href={social.href}>
                                    <Image
                                        src={social.src}
                                        alt={social.alt}
                                        width={20}
                                        height={20}
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 PTAI. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
