"use client";

import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { decodeToken } from "@/lib/jwt";
import styles from "./resetPassword.module.css";
import { useToast } from "@/hooks/use-toast";

interface ResetPasswordForm {
    password: string;
    confirmPassword: string;
}

const ResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<ResetPasswordForm>();

    const { toast } = useToast();

    useEffect(() => {
        const tokenFromUrl = searchParams.get("token");
        if (tokenFromUrl) {
            const decodedToken = decodeURIComponent(tokenFromUrl);
            try {
                const validToken = decodeToken(decodedToken);
                if (validToken?.hasOwnProperty("email")) {
                    setToken(decodedToken);
                } else {
                    setError("Invalid token");
                }
            } catch (err) {
                setError("Invalid or expired reset token");
            }
        }
    }, [searchParams]);

    useEffect(() => {
        if (error) {
            toast({
                title: "Error",
                description: error,
                variant: "destructive",
            });
        }
    }, [error]);

    const onSubmit = async (data: ResetPasswordForm) => {
        if (!token) {
            setError("No valid reset token found");
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await axios.post("/api/change-password", {
                token,
                password: data.password,
            });

            if (response.status !== 200) {
                setError(response.data?.message);
                return;
            }
            router.push("/sign-in");
            router.refresh();
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "An error occurred while resetting your password"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const validatePassword = (value: string) => {
        if (value.length < 8) {
            return "Password must be at least 8 characters";
        }
        return true;
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.formSection}>
                    <h2>Reset Your Password</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="password">New Password</label>
                            <input
                                id="password"
                                type="password"
                                className={`${styles.password} ${
                                    errors.password ? styles.errorInput : ""
                                }`}
                                {...register("password", {
                                    required: "Password is required",
                                    validate: validatePassword,
                                })}
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className={styles.error}>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                className={`${
                                    errors.confirmPassword
                                        ? styles.errorInput
                                        : ""
                                }`}
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === watch("password") ||
                                        "Passwords do not match",
                                })}
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && (
                                <p className={styles.error}>
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={isLoading ? styles.loading : ""}
                        >
                            {isLoading
                                ? "Resetting Password..."
                                : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;