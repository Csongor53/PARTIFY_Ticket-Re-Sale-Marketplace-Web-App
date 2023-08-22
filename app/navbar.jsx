"use client";
import Link from "next/link";
import {
    FaShoppingCart,
    FaTimes,
    FaUserCircle,
} from "react-icons/fa";
import {useState} from "react";
import styles from "../styles/Navbar.module.css";
import {signOut, useSession} from "next-auth/react";

export default function Navbar() {
    const {data: session, status} = useSession();
    /*console.log("Session from: Navbar");
        console.log(status)
        console.log(session);*/

    const [showDropdown, setShowDropdown] = useState(false);
    const [searchBarVisible, setSearchBarVisible] = useState(false);
    const [newsVisible, setNewsVisible] = useState(true);
    const toggleSearchBar = () => setSearchBarVisible(!searchBarVisible);
    const closeNews = () => {
        setNewsVisible(!newsVisible);
    };
    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        signOut().then((r) => console.log("User logged out!"));
    };

    const profileDropdown = (
        <ul className={styles.dropdownMenu}>
            {/*<li>
                <Link href="/account">My Account</Link>
            </li>*/}
            <li>
                <Link href="/sell">Sell</Link>
            </li>
            <li>
                <button onClick={handleLogout}>Logout</button>
            </li>
        </ul>
    );

    const loginOrProfileIcon = session ? (
        <div className={styles.profileIcon} onClick={handleDropdownToggle}>
            <FaUserCircle/>
            {showDropdown && profileDropdown}
        </div>
    ) : (
        <Link href="/auth/login" className={styles.loginLink}>
            Login / Register
        </Link>
    );

    const newsBanner = newsVisible ? (
        <div className={styles.newsBanner}>
            <button onClick={closeNews}>
                <FaTimes/>
            </button>
            If you are selling/purchasing a ticket for Circoloco, contact us on
            Instagram for further information about the ticket! @partify_eu
        </div>
    ) : (
        <div></div>
    );

    return (
        <nav className={styles.navbar}>
            <div className={styles.navWrapper}>
                <Link href="/" className={styles.logo}>
                    Partify
                </Link>

                {/*<div
                className={`${styles.searchBar} ${
                    searchBarVisible ? styles.visible : ""
                }`}
            >
                <input type="text" placeholder="Try searching for events and clubs"/>
                <button type="submit">
                    <FaArrowRight/>
                </button>
            </div>*/}

                <div className={styles.navLinks}>
                    {/*<div className={styles.searchIcon} onClick={toggleSearchBar}>
                    <FaSearch/>
                </div>*/}
                    {loginOrProfileIcon}
                    <Link href="/cart" className={styles.cartIcon}>
                        <FaShoppingCart/>
                    </Link>
                </div>
            </div>

            {newsBanner}

            <div className={styles.bookmark}>
                <Link href={"/sell"}>Sell Tickets</Link>
            </div>
        </nav>
    );
}
