"use client";

import React, { useState } from "react";
import styles from "@/assets/css/registration/EmailGate.module.css";

interface Props {
  onVerified: (email: string) => void;
}

type State = "idle" | "checking" | "exists" | "error" | "invalid";

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "https://iyora-dashboard.vercel.app";

export default function EmailGateComp({ onVerified }: Props) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setState("checking");

    try {
      const res = await fetch("/api/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setState(res.status === 422 ? "invalid" : "error");
        return;
      }

      if (data.exists) {
        setState("exists");
        return;
      }

      // Email valid and new — proceed to form
      onVerified(email.trim());
    } catch {
      setState("error");
    }
  };

  return (
    <div className={styles.gateWrapper}>
      <div className={styles.gateCard}>
        <div className={styles.gateIcon}>✉️</div>
        <h2 className={styles.gateTitle}>Enter Your Email First</h2>
        <p className={styles.gateDesc}>
          We&apos;ll verify your email before you fill out the registration form.
          Your confirmation and login credentials will be sent to this address.
        </p>

        {state === "exists" ? (
          <div className={styles.existsBox}>
            <div className={styles.existsIcon}>⚠️</div>
            <p className={styles.existsTitle}>Email Already Registered</p>
            <p className={styles.existsDesc}>
              <strong>{email}</strong> has already been used to register for an IYORA event.
              You can log in to your dashboard to view your registration details.
            </p>
            <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.dashboardBtn}
            >
              Go to Dashboard →
            </a>
            <button
              className={styles.tryOtherBtn}
              onClick={() => { setEmail(""); setState("idle"); }}
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleCheck} className={styles.gateForm}>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
              placeholder="Enter your email address"
              className={`${styles.emailInput} ${state === "invalid" ? styles.inputError : ""}`}
              required
              disabled={state === "checking"}
            />

            {state === "invalid" && (
              <p className={styles.errorMsg}>⚠ Please enter a valid email address.</p>
            )}
            {state === "error" && (
              <p className={styles.errorMsg}>⚠ Something went wrong. Please try again.</p>
            )}

            <button
              type="submit"
              className={styles.continueBtn}
              disabled={state === "checking" || !email.trim()}
            >
              {state === "checking" ? "Checking..." : "Continue to Registration →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
