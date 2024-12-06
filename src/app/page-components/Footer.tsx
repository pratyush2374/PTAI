"use client"; // Indicating this component is client-side rendered

import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <Image
            src="/Landing Images/Icon.svg"
            alt="PTAI Logo"
            width={50}  // Use number values instead of strings
            height={50} // Provide height for proper aspect ratio
          />
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <ul>
            <li>
              <a href="#">
                <Image
                  src="/Landing Images/facebook.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                />
              </a>
            </li>
            <li>
              <a href="#">
                <Image
                  src="/Landing Images/twitter.svg"
                  alt="Twitter"
                  width={20}
                  height={20}
                />
              </a>
            </li>
            <li>
              <a href="#">
                <Image
                  src="/Landing Images/instagram.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                />
              </a>
            </li>
            <li>
              <a href="#">
                <Image
                  src="/Landing Images/linkedin.svg"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                />
              </a>
            </li>
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
