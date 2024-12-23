"use client";

import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import {
    useForm,
    SubmitHandler,
    FieldValues,
    FieldErrors,
} from "react-hook-form";
import axios from "axios";
import { useState } from "react";

interface FormField {
    type: string;
    name: string;
    placeholder: string;
    className: string;
}

const formFields: FormField[] = [
    {
        type: "text",
        name: "name",
        placeholder: "Your Name",
        className: "contact-input",
    },
    {
        type: "email",
        name: "email",
        placeholder: "Your Email",
        className: "contact-input",
    },
    {
        type: "textarea",
        name: "message",
        placeholder: "Your Message",
        className: "contact-textarea",
    },
];

const ContactUs: React.FC = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false); // State to manage the button text

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FieldValues>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsSubmitting(true); 
        try {

            const response = await axios.post(
                "/api/contact-us",
                data
            );


            if (response.status === 200) {
                // Show success toast
                toast({
                    title: "Message Sent",
                    description: "Your message has been successfully sent.",
                    variant: "default",
                });
                // Reset the form
                reset();
            }
        } catch (error: any) {
            // Show error toast
            toast({
                title: "Error",
                description:
                    error.response?.data?.message ||
                    "An error occurred. Please try again",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false); // Reset the loading state after submission
        }
    };

    const onError = () => {
        // Show validation error toast
        toast({
            title: "Error !",
            description: "Enter all fields",
            variant: "destructive",
        });
    };

    return (
        <>
            <div className="contact-us" id="contact">
                <div className="contact-form-container">
                    <div className="contact-form">
                        <h1>Contact Us</h1>
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            {formFields.map((field, index) => {
                                if (field.type === "textarea") {
                                    return (
                                        <textarea
                                            key={index}
                                            {...register(field.name, {
                                                required: true,
                                            })}
                                            placeholder={field.placeholder}
                                            className={field.className}
                                        ></textarea>
                                    );
                                } else {
                                    return (
                                        <input
                                            key={index}
                                            type={field.type}
                                            {...register(field.name, {
                                                required: true,
                                            })}
                                            placeholder={field.placeholder}
                                            className={field.className}
                                        />
                                    );
                                }
                            })}
                            <button
                                type="submit"
                                className="contact-submit"
                                disabled={isSubmitting} // Disable button during submission
                            >
                                {isSubmitting ? "Submitting..." : "Send Message"} {/* Toggle text */}
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
