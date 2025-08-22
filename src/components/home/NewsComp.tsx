import Link from "next/link"

const NewsComp = () => {
    return(
        <>
        <section className="news-main-section" id="news-main-section">
        <br />
        <br />
        <br />
        <h1 className="section-header">Media Coverage</h1>
        <br />
        {/* <br /> */}
        <br />
        <section className="post news-container news-section">
            <div className="post-box">
                <Link href="/NewsContentPage1">
                <img src="/assets/images/news/news1.jpg" alt="" className="post-img"/>
                <h2 className="category">IYBO NYBO</h2>
                <Link href="/NewsContentPage1" className="post-title">Inaugural National Youth Biology Olympiad and 3rd International Youth Biology Olympiad Successfully Implemented Full Online</Link>
                <span className="post-date">7 May 2024</span>
                <p className="post-decription">DEPOKPOS - You already know that IYSA now also organizes National and International Olympiad events? Well in this April, IYSA is again organizing a full online Biology Olympiad at the International level, namely the International Youth Biology Olympiad (IYBO) for the second time and also holding a national level which is intended for national participants only under the name National Youth Biology Olympiad (NYBO).</p>

                <div className="profile">
                    <img src="/assets/images/news/Logo Profile News1.png" alt="" className="profile-img"/>
                    <span className="profile-name">Depokpos</span>
                </div>
                </Link>
            </div>
        </section>
        <br />
        <br />
        <br />
        </section>
        </>
    )
}

export default NewsComp