"use client"
import styles from "@/styles/Cart.module.css";
import {FaMinus, FaPlus} from "react-icons/fa";
import Link from "next/link";
import {useSelector, useDispatch} from "react-redux";
import {decrement, increment, TotalPriceSelector, updateCart } from "@/app/redux/cartSlice";
import axios from "axios";
import {useEffect} from "react";

const Cart = () => {
    const cart = useSelector((state) => state.cart.cartItems);
    // console.log("Cart: ", cart)
    const dispatch = useDispatch();

    let totalPrice = useSelector(TotalPriceSelector)

    const createCheckoutSession = async () => {
        // console.log("Checkout: ", cart)
        if(cart.length > 0){
            axios.post('/api/checkout/checkout_sessions', {cart})
                .then(res => {
                    console.log(res.data)
                    if(res.data.cart){
                        console.log(res.data.cart)
                        console.log('Ticket un-available');
                        dispatch(updateCart(res.data.cart)); // Dispatch the updateCart action with the response data
                    } else {
                        console.log("Proceeded to checkout!")
                        window.location = res.data.sessionURL
                    }
                })
                .catch(err => console.log(err))
        }else {
            alert('Your shopping cart is empty!');
        }
    }
    /*useEffect(() => {
        dispatch(saveCartState(cart));
    }, [cart]);*/

    return (
        <main className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>YOUR CART</h1>
                <div className={styles.top}>
                    <div className={styles.topContainer}>
                        <Link className={styles.topButton} href={"/"}>
                            Continue Shopping
                        </Link>
                    </div>
                    <div className={styles.topContainerCenter}>
                        <p>Items in cart: {cart.length} pcs</p>
                    </div>
                    <div className={styles.topContainerRight}>
                        <button className={`${styles.topButton} ${styles.darkButton}`}
                                onClick={() => createCheckoutSession()}
                        >
                            Checkout Now
                        </button>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.info}>
                        {cart.map((t) => {
                            let ticket = t.product
                            // console.log("ticket: ")
                            // console.log(ticket)

                            return (
                                <div className={styles.product} key={ticket.id}>
                                    <div className={styles.productDetail}>
                                        <div className={styles.details}>
                                            <div className={styles.productName}>
                                                <h6>Ticket:</h6> <span>{ticket.title}</span>
                                            </div>
                                            <div className={styles.productId}>
                                                <h6>ID:</h6> <span>{ticket.id}</span>
                                            </div>
                                            <div className={styles.productClub}>
                                                <h6>Venue:</h6> <span>{ticket.venue}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.priceDetail}>
                                        <div className={styles.productAmountContainer}>
                                            <div className={styles.quantity}>
                                                <button
                                                    className={styles.button}
                                                    onClick={() => dispatch(decrement(ticket))}
                                                >
                                                    <FaMinus/>
                                                </button>
                                                {/*<span>{ticket.qty}</span>
                                            <button
                                                className={styles.button}
                                                onClick={() => dispatch(increment(ticket))}
                                            >
                                                <FaPlus/>
                                            </button>*/}
                                            </div>
                                        </div>
                                        <div className={styles.productPrice}>
                                            {ticket.price //* ticket.qty
                                            } €
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className={styles.summary}>
                        <h1 className={styles.title}>SUMMARY</h1>
                        <div className={styles.summaryItem}>
                            <span>Subtotal</span>
                            <span>{totalPrice.toFixed(2)} €</span>
                        </div>
                        <div className={styles.summaryItem}>
                            <span>Service fee: </span>
                            <span>{(totalPrice * 0.1).toFixed(2)} €</span>
                        </div>
                        <div className={styles.summaryItem}>
                            <span>Total</span>
                            <span>{(totalPrice * 1.1).toFixed(2)} €</span>
                        </div>
                        <button className={styles.checkoutButton} onClick={() => createCheckoutSession()}>CHECKOUT NOW
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Cart;
