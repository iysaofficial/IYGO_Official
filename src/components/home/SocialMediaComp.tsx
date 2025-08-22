import Link from "next/link"

const SocialMediaComp = () => {
    return(
        <>
        <section className="social-media-section">
            <h2>Follow Us</h2>
        <ul>
            <li><Link href="https://www.facebook.com/profile.php?id=100063979907207" target="_blank"><i className="fab fa-facebook-f"></i></Link></li>
            <li><Link href="https://www.instagram.com/iyg.olympiad?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank"><i className="fab fa-instagram"></i></Link></li>
            <li><Link href="https://www.youtube.com/@IYSAOfficial" target="_blank"><i className="fab fa-youtube"></i></Link></li>
            <li><Link href="https://www.tiktok.com/@iysa.official" target="_blank"><i className="fab fa-tiktok"></i></Link></li>
            <li><Link href="https://www.linkedin.com/company/indonesian-young-scientist-association-iysa" target="_blank"><i className="fab fa-linkedin"></i></Link></li>
        </ul>
        </section>
        </>
    )
}

export default SocialMediaComp