import Link from "next/link"

const HomeNationalComp = () =>{
    return(
        <>
        <section className="registration-section">
            <div className="registration-container">
            <div className="registration-header">
                <h2 className="registration-title">REGISTRATION FORM FOR INDONESIA PARTICIPANTS</h2>
                <h3 className="registration-subtitle">Choose Categories Competition for Registration IYGO 2026</h3>
            </div>
            </div>
            <div className="registration-links">
            <Link href="/registration/national/national-offline" className="registration-link">Offline Competition</Link>
            <Link href="/registration/national/national-online" className="registration-link">Online Competition</Link>
            </div>
        </section>
        </>
    )
}

export default HomeNationalComp