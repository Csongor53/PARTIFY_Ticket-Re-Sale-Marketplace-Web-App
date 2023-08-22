"use client"
import styles from "../../../styles/SingIn.module.css";
import {useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    const {data: session, status} = useSession();
    if (status === "authenticated") {
        redirect("/");
        return;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsDisabled(true);
        signIn("email", {email})
            .then((r) => console.log("user logged in!"));
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setIsDisabled(false);
    };

    return(
        <main className={styles.mainContainer}>
            <h1 className={styles.title}>Sign In</h1>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="email">
                    Email
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className={styles.input}
                        placeholder="example@example.com"
                    />
                </label>
                <button type="submit" className={styles.button} disabled={isDisabled}>
                    Sign In
                </button>
            </form>
        </main>
    )
}