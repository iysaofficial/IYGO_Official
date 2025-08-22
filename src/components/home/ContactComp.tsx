import Link from "next/link"

const ContactComp = () =>{
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
                    <form action="https://formspree.io/f/mgegjprw" method="POST">
                    <div className="formBox">
                        
                        <div className="inputBox w50">
                            <input type="text" name="name" required/>
                            <span>Name</span>
                        </div>
                        
                        <div className="inputBox w50">
                            <input type="email" name="email" required/>
                            <span>Email</span>
                        </div>
                       
                        <div className="inputBox w100">
                            <textarea name="message" required></textarea>
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