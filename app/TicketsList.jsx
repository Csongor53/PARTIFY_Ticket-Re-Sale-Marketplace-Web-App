"use client"
import styles from "@/styles/Home.module.css";
import axios from "axios";
import {useQuery} from "react-query";
import Ticket from "@/app/Ticket";

const allTickets = async () => {
    const response = await axios.get("/api/post/getPosts")
    return response.data
}

export default function TicketsList() {

    const { data, error, isLoading } = useQuery({
        queryFn: allTickets,
        queryKey: ["tickets"],
    })
    if (error) return <div>{error.message}</div>
    if (isLoading) return "Loading....."

    // console.log(data)
    return (
        <div>
            {data?.map((ticket) => (
                <Ticket
                    key={ticket.id}
                    id={ticket.id}
                    userEmail={ticket.userEmail}
                    firstName={ticket.firstName}
                    surname={ticket.surname}
                    title={ticket.title}
                    date={ticket.eventDate}
                    venue={ticket.venue}
                    price={ticket.price}
                    description={ticket.description}
                    fileUrl={ticket.fileUrl}
                />
            ))}
        </div>
    )
}