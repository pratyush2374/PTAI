"use client";

import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
    const navLinks = [
        { href: "#features", label: "Features" },
        { href: "#about", label: "About Us" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <div className="navbar" id="home">
            <div className="innerNav">
                <div className="nameAndIcon">
                    <a href="#">
                        <Image
                            src="/Landing Images/Icon Black.svg"
                            alt="Logo"
                            width={50}
                            height={50}
                        />
                    </a>
                </div>
                <ul className="links">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a href={link.href}>{link.label}</a>
                        </li>
                    ))}
                </ul>
                <div>
                    <Link href="/sign-in" className="nextLink">
                        <p className="login">Login/Sign Up</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
