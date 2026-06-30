"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createPublicClient, computeRegistrationStatus, EVENT_SLUG, RegistrationStatus } from "@/lib/supabase-public";

interface Props {
  registrationPath: string;
  className?: string;
}

const BUTTON_UI: Record<RegistrationStatus, { label: string; disabled: boolean; style: React.CSSProperties }> = {
  open: {
    label: "Register Now",
    disabled: false,
    style: { backgroundColor: "#ef4444", color: "#fff", cursor: "pointer" },
  },
  coming_soon: {
    label: "Coming Soon",
    disabled: true,
    style: { backgroundColor: "#3b82f6", color: "#fff", cursor: "not-allowed", opacity: 0.8 },
  },
  closed: {
    label: "Registration Closed",
    disabled: true,
    style: { backgroundColor: "#6b7280", color: "#fff", cursor: "not-allowed", opacity: 0.7 },
  },
};

export default function RegistrationButtonComp({ registrationPath, className }: Props) {
  const [status, setStatus] = useState<RegistrationStatus>("coming_soon");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const supabase = createPublicClient();
    supabase
      .from("events")
      .select("registration_open_at, registration_close_at, is_active")
      .eq("slug", EVENT_SLUG)
      .single()
      .then(({ data, error }) => {
        if (data && !error) {
          setStatus(computeRegistrationStatus(data.registration_open_at, data.registration_close_at, data.is_active));
        }
        setLoaded(true);
      });
  }, []);

  if (!loaded) {
    return (
      <span className={className} style={{ backgroundColor: "#374151", color: "#9ca3af", borderRadius: "6px", padding: "0.5rem 1rem", display: "inline-block", fontSize: "0.875rem" }}>
        Loading...
      </span>
    );
  }

  const ui = BUTTON_UI[status];

  if (ui.disabled) {
    return (
      <span className={className} style={{ ...ui.style, borderRadius: "6px", padding: "0.5rem 1rem", display: "inline-block", fontSize: "0.875rem", fontWeight: 600, userSelect: "none" }}>
        {ui.label}
      </span>
    );
  }

  return (
    <Link href={registrationPath} className={className} style={{ ...ui.style, borderRadius: "6px", padding: "0.5rem 1rem", display: "inline-block", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none" }}>
      {ui.label}
    </Link>
  );
}
