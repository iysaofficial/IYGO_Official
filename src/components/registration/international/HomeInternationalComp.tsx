import Link from "next/link"

const HomeInternationalComp = () =>{
    return(
        <>
        <section className="registration-section">
            <div className="registration-container">
            <div className="registration-header">
                <h2 className="registration-title">REGISTRATION FORM FOR INTERNATIONAL PARTICIPANTS</h2>
                <h3 className="registration-subtitle">Choose Categories Competition for Registration IYGO 2026</h3>
            </div>
            </div>
            <div className="registration-links">
            <Link href="/registration/international/international-offline" className="registration-link">Offline Competition</Link>
            <Link href="/registration/international/international-online" className="registration-link">Online Competition</Link>
            </div>
        </section>
        </>
    )
}

export default HomeInternationalComp