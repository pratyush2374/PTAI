"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"; // Import FieldValues and SubmitHandler
import Link from "next/link";
import Image from "next/image";
import styles from "./signin.module.css";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Ensure onSubmit uses SubmitHandler with FieldValues
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { email, password } = data as { email: string; password: string }; // Typecasting
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError(res.error);
        } else if (res?.ok) {
            router.push("/dashboard");
        }
    };

    const onError = (errors: any) => {
        console.log(errors);
    };
    return (
        <>
            <div className={styles.body}>
                <div className={styles.container}>
                    <div className={styles.imageSection}>
                        <Image
                            src="/Login Images/Login.png"
                            alt="Login"
                            width={500}
                            height={500}
                            layout="intrinsic"
                        />
                    </div>
                    <div className={styles.formSection}>
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                                placeholder="Enter your Email here"
                            />

                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                placeholder="Enter your Password here"
                                className={styles.password}
                            />

                            {error && <p className={styles.error}>{error}</p>}

                            <button type="submit">Sign In</button>
                        </form>
                        <p>
                            Don't have an account?{" "}
                            <Link href="/sign-up">Sign Up</Link>
                        </p>
                        <div className={styles.socialLogin}>
                            <p>— OR —</p>
                            <div className={styles.google}>
                                <Image
                                    src="/Login Images/Google Icon.svg"
                                    alt="G icon"
                                    width={30}
                                    height={30}
                                />
                                Sign in with Google
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
