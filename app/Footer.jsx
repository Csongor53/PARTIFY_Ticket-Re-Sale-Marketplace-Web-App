import React from "react";
import styles from '../styles/Footer.module.css';
import Image from "next/image";
import {FaFacebook, FaInstagram, FaMailBulk} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerSection}>
                <h1 className={styles.footerSectionTitle}>Partify</h1>
                <p className={styles.footerSectionText}>
                    We simplify finding last-minute Party Tickets, leaving you to focus on having a great time!
                </p>
                <div className={styles.footerSocialIcon}>
                    {/*<a href="#" className={styles.footerSocialIcon}><FaFacebook /></a>*/}
                    <a href="https://instagram.com/partify_eu?igshid=YmMyMTA2M2Y=" className={styles.footerSocialIcon}><FaInstagram /></a>
                </div>
            </div>
            <div className={styles.line}/>
            <div className={styles.footerSection}>
                <h3 className={styles.footerSectionTitle}>Useful Links</h3>
                <ul className={styles.footerSectionList}>
                    <li className={styles.footerSectionListItem}>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li className={styles.footerSectionListItem}>
                        <Link href="/cart">
                            Cart
                        </Link>
                    </li>
                    <li className={styles.footerSectionListItem}>
                        <Link href="/terms">
                            Terms
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.line}/>
            <div className={styles.footerSection}>
                <h3 className={styles.footerSectionTitle}>Contact</h3>
                {/*<div className={styles.footerContactItem}>
                    <Room/>
                    622 Dixie Path , South Tobinchester 98336
                </div>
                <div className={styles.footerContactItem}>
                    <Phone/>
                    +69 12 420 1230
                </div>*/}
                <div className={styles.footerContactItem}>
                    {/*<FaMailBulk/>*/}
                    Instagram:  @partify_eu
                </div>
                {/*<Image src="https://i.ibb.co/Qfvn4z6/payment.png" alt="Payment methods" className={styles.footerPayment} />*/}
            </div>
        </div>
    );
};

export default Footer;
