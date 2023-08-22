import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "@/app/redux/cartSlice";
import { toast } from "react-hot-toast";

export default function Ticket(props) {
    const [id, setId] = useState(props.id || "");
    const [userEmail, setUserEmail] = useState(props.userEmail || "");
    const [firstName, setFirstName] = useState(props.firstName || "");
    const [surname, setSurname] = useState(props.surname || "");
    const [title, setTitle] = useState(props.title || "");
    const [date, setDate] = useState(props.date || "");
    const [venue, setVenue] = useState(props.venue || "");
    const [price, setPrice] = useState(props.price || "");
    const [description, setDescription] = useState(props.description || "");
    const [fileUrl, setFileUrl] = useState(props.fileUrl || "");


    const formattedDate = new Date(date).toLocaleDateString("en-EU", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(increment(props));
        toast.success("Ticket added to cart!", {
            // position: "top-right",
            // duration: 2000,
        });
    };

    return (
        <div className={styles.card}>
            <div className={styles.left}>
                <h2>{title}</h2>
                <p>{description}</p>
                {/*<span>Seller: {firstName} {surname}</span>*/}
            </div>
            <div className={styles.center}>
                <span>Venue: {venue}</span>
                <span>Event Date: {formattedDate}</span>
            </div>
            <div className={styles.right}>
                <p className={styles.price}>{price}€</p>
                <button className={styles.buyBtn} onClick={addToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
