"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import styles from "./signin.module.css";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignInFormData>();

    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [userEmail, setUserEmail] = useState<string>("");

    const router = useRouter();
    const session = useSession();
    const { toast } = useToast();

    useEffect(() => {
        if (session.status === "authenticated") {
            if (session.data.user.isNewUser === true) {
                router.push("/sign-up");
            } else {
                router.push("/dashboard");
            }
        }
    }, [session.status, router]);

    const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (res?.error) {
                toast({
                    title: "Authentication Error",
                    description: "Invalid email or password. Please try again.",
                    variant: "destructive",
                });
                reset({ password: "" });
            } else if (!res?.ok) {
                toast({
                    title: "Error",
                    description:
                        "Something went wrong. Please try again later.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: "Signed in successfully!",
                    variant: "default",
                });
                router.push("/dashboard");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setIsGoogleLoading(true);
            await signIn("google", { callbackUrl: "/dashboard" });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to sign in with Google. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const forgotPassword = async () => {
        try {
            if (!userEmail) {
                toast({
                    title: "Error!",
                    description: "Enter your email address",
                    variant: "destructive",
                });
            } else {
                const res = await axios.post("/api/forgot-password", {
                    email: userEmail,
                });

                if (res.status === 200) {
                    toast({
                        title: "Success!",
                        description:
                            res.data.message ||
                            "If the email is registered, you will receive a reset link",
                        variant: "default",
                    });
                }
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 404) {
                    toast({
                        title: "Error",
                        description:
                            error.response.data.message || "User not found",
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
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.imageSection}>
                    <Image
                        src="/Login Images/Login.png"
                        alt="Login"
                        width={500}
                        height={500}
                        priority
                    />
                </div>
                <div className={styles.formSection}>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                                placeholder="Enter your email here"
                                className={
                                    errors.email ? styles.errorInput : ""
                                }
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be at least 5 characters",
                                    },
                                })}
                                placeholder="Enter your password here"
                                className={`${styles.password} ${
                                    errors.password ? styles.errorInput : ""
                                }`}
                            />
                            <p
                                className={styles.forgotPassword}
                                onClick={forgotPassword}
                            >
                                Forgot password?
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={isSubmitting ? styles.loading : ""}
                        >
                            {isSubmitting ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <p className={styles.signupLink}>
                        Don't have an account?{" "}
                        <Link href="/sign-up">Sign Up</Link>
                    </p>

                    <div className={styles.socialLogin}>
                        <p>— OR —</p>
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={isGoogleLoading}
                            className={`${styles.google} ${
                                isGoogleLoading ? styles.loading : ""
                            }`}
                        >
                            <Image
                                src="/Login Images/Google Icon.svg"
                                alt="Google icon"
                                width={30}
                                height={30}
                            />
                            {isGoogleLoading
                                ? "Signing in..."
                                : "Sign in with Google"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
