import Image from 'next/image'
import styles from '../styles/Home.module.css'
import TicketFilter from "@/app/TicketFilter";
import TicketsList from "@/app/TicketsList";

export default async function Home() {

    return (
        <main className={styles.MainContainer}>
            {/*<TicketFilter/>*/}

            <TicketsList/>
        </main>
    )
}
