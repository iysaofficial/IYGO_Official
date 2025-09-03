"use client";
import React, { useEffect } from "react";
import Link from "next/link"

const ContactComp = () =>{
    useEffect(() => {
        const scriptURL =
        "https://script.google.com/macros/s/AKfycbzdgUOy_s6zjJQTgqXQ7GX3H1_w6TvWq1hsBZgH0mSREWt3qXCKA34-qo74-jfDVbHE/exec";

        const form = document.forms.namedItem("home-contact");

        if (form) {
        const handleSubmit = async (e: Event) => {
            e.preventDefault();
            try {
            await fetch(scriptURL, {
                method: "POST",
                body: new FormData(form),
            });
            alert("Message sent successfully!");
            form.reset();
            } catch (error) {
            console.error("Error:", error);
            alert("Failed to send Message.");
            }
        };

        form.addEventListener("submit", handleSubmit);

        // cleanup listener
        return () => {
            form.removeEventListener("submit", handleSubmit);
        };
        }
    }, []);
    return(
        <>
        <section className="contact-section" id="contact-section">
            <div className="contact-container">
                <div className="contactInfo">
                    <div>
                        <h2>Contact Info</h2>
                        <ul className="info">
                            <li>
                                <span><img src="/assets/images/icon/location.png" alt="" /></span>
                                <span>Jl. Kemang, Pasir Putih, <br />
                                Kecamatan. Sawangan, Kota Depok, 
                                <br />Jawa Barat 16519
                                </span>
                            </li>
                            <li>
                                <span><img src="/assets/images/icon/mail.png" alt="" /></span>
                                <span>iysa.olympiad@gmail.com</span>
                            </li>
                            <li>
                                <span><img src="/assets/images/icon/call.png" alt="" /></span>
                                <span>+6283870026877</span>
                            </li>
                        </ul>
                    </div>
                    <ul className="sci">
                        <li><Link href="https://www.facebook.com/profile.php?id=100063979907207" target="_blank"><img src="/assets/images/icon/1.png" alt="" /></Link></li>
                        <li><Link href="https://www.instagram.com/iyg.olympiad?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank"><img src="/assets/images/icon/2.png" alt="" /></Link></li>
                        <li><Link href="https://www.youtube.com/@IYSAOfficial" target="_blank"><img src="/assets/images/icon/3.png" alt="" /></Link></li>
                        <li><Link href="https://www.tiktok.com/@iysa.official" target="_blank"><img src="/assets/images/icon/4.png" alt="" /></Link></li>
                        <li><Link href="https://www.linkedin.com/company/indonesian-young-scientist-association-iysa" target="_blank"><img src="/assets/images/icon/5.png" alt="" /></Link></li>
                    </ul>
                </div>

                <div className="contactForm">
                    <h2>Send a Message</h2>
                    <form action="" method="POST" name="home-contact">
                    <div className="formBox">
                        
                        <div className="inputBox w50">
                            <input type="text" name="Name" required/>
                            <span>Name</span>
                        </div>
                        
                        <div className="inputBox w50">
                            <input type="email" name="Email" required/>
                            <span>Email</span>
                        </div>
                       
                        <div className="inputBox w100">
                            <textarea name="Message" required></textarea>
                            <span>Message</span>
                        </div>
                        <div className="inputBox w100">
                            <input type="submit" value={"Send"}/>
                        </div>
                        
                    </div>
                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default ContactComp