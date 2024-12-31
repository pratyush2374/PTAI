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
    const [resendTimer, setResendTimer] = useState(0);
    const [isResendDisabled, setIsResendDisabled] = useState(false);

    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session.data?.user.isNewUser === true) {
            router.push("/user-input");
        }
    }, [session.status]);

    // Timer effect for resend cooldown
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setIsResendDisabled(false);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

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

    // Function to handle OTP sending
    const handleSendOTP = async (userData: { fullName: string; email: string }) => {
        setSent(true);
        try {
            const response = await axios.post("/api/send-verification-mail", userData);

            if (response.status !== 200) {
                setSent(false);
                return toast({
                    title: "Error",
                    description: `Couldn't send code: ${response.data.message}`,
                    variant: "destructive",
                });
            }

            setVerifyCode(response.data.verificationCode);
            toast({
                title: "Success",
                description: "OTP has been sent to your email!",
                variant: "default",
            });
            setOtpSent(true);
            setSent(false);
            setResendTimer(15);
            setIsResendDisabled(true);
        } catch (error: any) {
            setSent(false);
            if (error.response) {
                if (error.response.status === 401) {
                    toast({
                        title: "Error",
                        description: error.response.data.message || "User already exists, try signing in",
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
                toast({
                    title: "Error",
                    description: "Something went wrong. Please try again.",
                    variant: "destructive",
                });
            }
        }
    };

    // Step one of sign up
    const onSubmit = async (data: FormData) => {
        const { fullName, email, password } = data;

        if (!fullName || !email || !password) {
            return toast({
                title: "Error",
                description: "All fields are required!",
                variant: "destructive",
            });
        }

        const encryptedPassword = encryptPassword(password);
        setUserData({
            fullName,
            email,
            password: encryptedPassword,
        });

        await handleSendOTP({ fullName, email });
    };

    // Handle resend OTP
    const handleResendOTP = async () => {
        if (isResendDisabled) return;

        const userDataObj = userData as { fullName: string; email: string };
        await handleSendOTP({
            fullName: userDataObj.fullName,
            email: userDataObj.email,
        });
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
                                onSubmit={handleSubmitCode(handleVerify, onError)}
                            >
                                <div className={styles.otpSection}>
                                    <label htmlFor="otp">Enter OTP</label>
                                    <input
                                        type="number"
                                        className={styles.otpInput}
                                        id="otp"
                                        {...registerCode("verificationCode", {
                                            required: true,
                                        })}
                                        placeholder="Enter the OTP sent to your email"
                                    />
                                    <div className={styles.resend}>
                                        <p>Didn't receive:{" "}</p>
                                        <button
                                            type="button"
                                            onClick={handleResendOTP}
                                            disabled={isResendDisabled}
                                            style={{
                                                cursor: isResendDisabled ? "not-allowed" : "pointer",
                                                opacity: isResendDisabled ? 0.5 : 1,
                                                border: "none",
                                                background: "none",
                                                color: "#0066ff",
                                                textDecoration: "underline",
                                            }}
                                        >
                                            Resend {resendTimer > 0 ? `(${resendTimer}s)` : ""}
                                        </button>
                                    </div>
                                    <button type="submit">Verify</button>
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