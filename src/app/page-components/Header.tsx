"use client";

import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
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
                    <li>
                        <a href="#features">Features</a>
                    </li>
                    <li>
                        <a href="#about">About Us</a>
                    </li>
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
                <div>
                    <Link href="/login" className="nextLink">
                        <p className="login">Login/Sign Up</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
