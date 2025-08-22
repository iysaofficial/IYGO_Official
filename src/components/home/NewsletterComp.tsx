const NewsletterComp = () =>{
    return(
        <>
        <section className="newsletter-section">
            <div className="newsletter-main_wrapper">
                <div className="newsletter-subscribe_wrapper">
                    <h2>Subscribe Now!</h2>
                    <p>Subscribe to our newsletter to receive our latest news</p>
                    <form action="https://formspree.io/f/xoqgjrok" method="POST">
                        <div className="inner">
                            <input type="email" name="email" placeholder="Enter Email" />
                        </div>
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default NewsletterComp