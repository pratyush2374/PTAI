"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import styles from "./signup.module.css";
import axios from "axios";
import crypto from "crypto";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type FormData = {
    fullName: string;
    email: string;
    password: string;
};

type verifyCodeData = {
    verificationCode: number;
};

const SignUp: React.FC = () => {
    //For 1st section
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    //For 2nd section
    const {
        register: registerCode,
        handleSubmit: handleSubmitCode,
        formState: { errors: errorCode },
    } = useForm<verifyCodeData>();

    const { toast } = useToast();
    const [otpSent, setOtpSent] = useState(false);
    const [verifyCode, setVerifyCode] = useState(0);
    const [sent, setSent] = useState(false);
    const [userData, setUserData] = useState({});

    const session = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session.status === "authenticated") {
            router.push("/user-input");
        }
    }, [session.status]);
    //Encrypting password
    const encryptPassword = (password: string) => {
        const AES_SECRET = process.env.NEXT_PUBLIC_AES_SECRET as string;
        const cipher = crypto.createCipheriv(
            "aes-256-ctr",
            Buffer.from(AES_SECRET),
            Buffer.alloc(16, 0)
        );
        const encryptedPassword =
            cipher.update(password, "utf8", "hex") + cipher.final("hex");
        return encryptedPassword;
    };

    // Step one of sign up
    const onSubmit = async (data: FormData) => {
        const { fullName, email, password } = data;
        setSent(true);

        if (!fullName || !email || !password) {
            return toast({
                title: "Error",
                description: "All fields are required!",
                variant: "destructive",
            });
        }

        try {
            const response = await axios.post("/api/send-verification-mail", {
                fullName,
                email,
            });

            if (response.status !== 200) {
                setSent(false);
                return toast({
                    title: "Error",
                    description: `Couldnt send code :( ,${response.data.message}`,
                    variant: "destructive",
                });
            } else {
                setVerifyCode(response.data.verificationCode);

                const encryptedPassword = encryptPassword(data.password);

                setUserData({
                    fullName: data.fullName,
                    email: data.email,
                    password: encryptedPassword,
                });

                toast({
                    title: "Success",
                    description: `OTP has been sent to your email!`,
                    variant: "default",
                });
                setOtpSent(true);
                setSent(false);
            }
        } catch (error: any) {
            setSent(false);

            // Check if the error is from axios and contains a response
            if (error.response) {
                // If error response exists, it means it came from the backend
                if (error.response.status === 401) {
                    toast({
                        title: "Error",
                        description:
                            error.response.data.message ||
                            "User already exists, try signing in",
                        variant: "destructive",
                    });
                } else {
                    toast({
                        title: "Error",
                        description: "Something went wrong. Please try again.",
                        variant: "destructive",
                    });
                }
            } else {
                // If error response does not exist, general network or axios error
                toast({
                    title: "Error",
                    description: "Something went wrong. Please try again.",
                    variant: "destructive",
                });
            }
        }
    };

    // Step two of sign up
    const handleVerify = async (data: verifyCodeData) => {
        const { verificationCode } = data;
        if (!verificationCode) {
            return toast({
                title: "Error",
                description: "Enter Verification Code",
                variant: "destructive",
            });
        } else {
            if (Number(verificationCode) !== verifyCode) {
                return toast({
                    title: "Error",
                    description: "Invalid Verification Code",
                    variant: "destructive",
                });
            } else {
                const userStr = JSON.stringify(userData);
                sessionStorage.setItem("user", userStr);
                toast({
                    title: "Success",
                    description: "Email verified successfully! Redirecting...",
                    variant: "default",
                });
                window.location.href = "/user-input";
            }
        }
    };

    const onError = () => {
        if (errors.password?.type === "minLength") {
            toast({
                title: "Error!",
                description: "Password must be at least 8 characters long.",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Error!",
                description: "Enter all fields",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <div className={styles.body}>
                <div className={styles.container}>
                    <div className={styles.imageSection}>
                        <Image
                            src="/Login Images/Login.png"
                            alt="Signup"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className={styles.formSection}>
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                {...register("fullName", { required: true })}
                                placeholder="Enter your Full Name"
                            />

                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", { required: true })}
                                placeholder="Enter your Email here"
                            />

                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                {...register("password", {
                                    required: true,
                                    minLength: 5,
                                })}
                                placeholder="Enter your Password here"
                                className={styles.password}
                            />
                            <button type="submit">
                                {sent ? "Sending Code..." : "Sign Up"}
                            </button>
                        </form>

                        {otpSent && (
                            <form
                                onSubmit={handleSubmitCode(
                                    handleVerify,
                                    onError
                                )}
                            >
                                <div className={styles.otpSection}>
                                    <label htmlFor="otp">Enter OTP</label>
                                    <input
                                        type="number"
                                        id="otp"
                                        {...registerCode("verificationCode", {
                                            required: true,
                                        })}
                                        placeholder="Enter the OTP sent to your email"
                                    />
                                    <button>Verify</button>
                                </div>
                            </form>
                        )}

                        <p>
                            Already have an account?{" "}
                            <Link href="/sign-in">Sign In</Link>
                        </p>

                        <div className={styles.socialLogin}>
                            <p>— OR —</p>
                            <div
                                className={styles.google}
                                onClick={() => signIn("google")}
                            >
                                <Image
                                    src="/Login Images/Google Icon.svg"
                                    alt="G icon"
                                    width={30}
                                    height={30}
                                />
                                Sign up with Google
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
