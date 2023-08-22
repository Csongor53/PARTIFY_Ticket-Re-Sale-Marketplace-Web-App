"use client";
import styles from "@/styles/Sell.module.css";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";

const uploadTicket = async (formData) => {
    return await axios.post("/api/post/ticketUpload", formData, {
        withCredentials: true,
        "Content-Type": "multipart/form-data",
    });
};

export default function Sell() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [venue, setVenue] = useState("");
    // const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);

    const {data: session, status} = useSession();
    if (status === "unauthenticated") {
        redirect("/auth/login");
        return;
    }
    if (status === "authenticated" && !session.user.accComplete) {
        redirect("/auth/login/complete");
        return;
    }

    const allowedFileTypes = ["application/pdf", "image/jpeg", "image/png"];
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!allowedFileTypes.includes(file.type)) {
            toast.error("Invalid file type. Please upload a PDF, JPEG, or PNG file.");
            return;
        }else {
            setFile(file);
        }
        console.log("File Change!");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDisabled(true);

        if (!allowedFileTypes.includes(file.type)) {
            toast.error("Invalid file type. Please upload a PDF, JPEG, or PNG file.");
            return;
        }
        // Check if price is a positive whole number
        if (!Number.isInteger(price) || Math.sign(price) !== 1) {
            toast.error("Please enter a positive whole number for price.");
            setIsDisabled(false);
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("date", date);
        formData.append("venue", venue);
        // formData.append("quantity", quantity);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("sellerFirstName", session.user.firstName);
        formData.append("sellerSurname", session.user.surname);

        try {
            const response = await uploadTicket(formData);
            console.log(response.data);
            console.log("File uploaded successfully");
            setTitle("");
            setDate("");
            setVenue("");
            // setQuantity(0);
            setPrice(0);
            setDescription("");
            setFile(null);

            toast.success("Ticket uploaded successfully!", {
                // position: "top-right",
                // duration: 2000,
            });
        } catch (error) {
            console.error(error);
        }

        setIsDisabled(false);
    };

    return (
        <div className={styles.container}>
            <h1>Post Your Ticket for sale!</h1>
            <form
                className={styles.form}
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Title"
                    required
                />
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                />
                <label htmlFor="venue">Venue:</label>
                <input
                    type="text"
                    id="venue"
                    name="venue"
                    value={venue}
                    onChange={(event) => setVenue(event.target.value)}
                    placeholder="Venue"
                    required
                />
                {/* <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(event) => setQuantity(parseInt(event.target.value))}
                    placeholder="0"
                />*/}
                <label htmlFor="price">Price (€):</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(event) => setPrice(parseInt(event.target.value))}
                    placeholder="0"
                    required
                />
                <div></div>
                <p>* A service commission of 5% from your payout will apply when your ticket is sold.</p>

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Description"
                ></textarea>
                <label htmlFor="file">Ticket:</label>
                <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    required
                />
                <button type="submit" disabled={isDisabled}>Post</button>
            </form>
        </div>
    );
}
