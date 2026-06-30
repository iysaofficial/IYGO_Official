import Link from "next/link";

const SuccessComp: React.FC = () => {
  return (
    <div className="success-container">
      <div className="success-content">
        <div className="success-checkmark">✓</div>
        <h1 className="success-title">Registration Successful!</h1>
        <p className="success-message">
          Thank you for registering. Your registration data has been successfully sent.
        </p>
        <p className="success-message">
          You will receive an email with your dashboard login credentials at dashboard.iyora.or.id
        </p>
        <Link href="/" className="success-button">Back to Home</Link>
      </div>
    </div>
  );
};

export default SuccessComp;