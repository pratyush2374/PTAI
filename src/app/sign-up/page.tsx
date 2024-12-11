import Link from "next/link";
import Image from "next/image";  // Import Next.js Image component
import styles from "./signup.module.css";  // Ensure the styles are correctly named

const SignUp: React.FC = () => {
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
                            layout="intrinsic" 
                        />
                    </div>
                    <div className={styles.formSection}>
                        <h2>Sign Up</h2>
                        <form>
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="Enter your Full Name"
                            />

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

                            <Link href="/user-input">
                            <button>Sign Up</button>
                            </Link>
                        </form>
                        <p>
                            Already have an account?{" "}
                            <Link href="/sign-in">Sign In</Link>
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
