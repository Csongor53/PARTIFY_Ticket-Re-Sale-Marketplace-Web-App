
import styles from "@/styles/CompleteAccount.module.css"
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {redirect} from "next/navigation";
import CompleteForm from "@/app/auth/login/complete/CompleteForm";

export default async function CompletePage() {
    const session = await getServerSession(authOptions)
    if(!session){
        redirect("/auth/login")
        return
    }

    return(
        <>
            <main className={styles.mainContainer}>
                <h1 className={styles.title}>Complete Your Account</h1>
                <CompleteForm email={session.user.email}/>
            </main>
        </>
    )
}