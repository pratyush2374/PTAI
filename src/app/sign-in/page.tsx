"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./signin.module.css";

const SignIn = () => {
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
                        <form>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your Email here"
                            />

                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your Password here"
                                className={styles.password}
                            />

                            <Link href="/userInput">
                                <button type="submit">Sign In</button>
                            </Link>
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
