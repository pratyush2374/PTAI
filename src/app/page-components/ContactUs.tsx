"use client"; // Indicating this component is client-side rendered

import Image from "next/image";

const formFields = [
    { type: "text", name: "name", placeholder: "Your Name", className: "contact-input", required: true },
    { type: "email", name: "email", placeholder: "Your Email", className: "contact-input", required: true },
    { type: "textarea", name: "message", placeholder: "Your Message", className: "contact-textarea", required: true },
];

const ContactUs: React.FC = () => {
    return (
        <>
            <div className="contact-us" id="contact">
                <div className="contact-form-container">
                    <div className="contact-form">
                        <h1>Contact Us</h1>
                        <form>
                            {formFields.map((field, index) => {
                                if (field.type === "textarea") {
                                    return (
                                        <textarea
                                            key={index}
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            className={field.className}
                                            required={field.required}
                                        ></textarea>
                                    );
                                } else {
                                    return (
                                        <input
                                            key={index}
                                            type={field.type}
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            className={field.className}
                                            required={field.required}
                                        />
                                    );
                                }
                            })}
                            <button type="submit" className="contact-submit">
                                Send Message
                            </button>
                        </form>
                    </div>
                    <div className="contact-image">
                        <Image
                            src="/Landing Images/contact.png"
                            alt="contact"
                            width={200}
                            height={200}
                            layout="responsive"
                        />
                    </div>
                </div>
            </div>

            <div className="seperator"></div>
        </>
    );
};

export default ContactUs;
