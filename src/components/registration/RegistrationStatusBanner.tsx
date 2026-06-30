"use client";
import { useEffect, useState } from "react";
import { createPublicClient, computeRegistrationStatus, EVENT_SLUG, RegistrationStatus } from "@/lib/supabase-public";

interface EventData {
  registration_open_at: string | null;
  registration_close_at: string | null;
  event_date_start: string | null;
  is_active: boolean;
  tagline: string | null;
  venue: string | null;
}

const STATUS_UI: Record<RegistrationStatus, { bg: string; border: string; icon: string; label: string; textColor: string }> = {
  open: {
    bg: "#0f2a1a",
    border: "#10b981",
    icon: "✅",
    label: "Registration is Open!",
    textColor: "#10b981",
  },
  coming_soon: {
    bg: "#0f1a2a",
    border: "#3b82f6",
    icon: "🕐",
    label: "Registration Coming Soon",
    textColor: "#3b82f6",
  },
  closed: {
    bg: "#2a0f0f",
    border: "#ef4444",
    icon: "🔒",
    label: "Registration Closed",
    textColor: "#ef4444",
  },
};

export default function RegistrationStatusBanner() {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [status, setStatus] = useState<RegistrationStatus>("coming_soon");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createPublicClient();
    supabase
      .from("events")
      .select("registration_open_at, registration_close_at, event_date_start, is_active, tagline, venue")
      .eq("slug", EVENT_SLUG)
      .single()
      .then(({ data, error }) => {
        if (data && !error) {
          setEventData(data as EventData);
          setStatus(computeRegistrationStatus(data.registration_open_at, data.registration_close_at, data.is_active));
        }
        setLoading(false);
      });
  }, []);

  if (loading || !eventData) return null;

  const ui = STATUS_UI[status];

  return (
    <div
      style={{
        background: ui.bg,
        border: `1.5px solid ${ui.border}`,
        borderRadius: "12px",
        padding: "1rem 1.25rem",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
      }}
    >
      <span style={{ fontSize: "1.25rem" }}>{ui.icon}</span>
      <div style={{ flex: 1 }}>
        <p style={{ color: ui.textColor, fontWeight: 700, fontSize: "0.875rem", margin: 0 }}>
          {ui.label}
        </p>
        {eventData.registration_open_at && status === "coming_soon" && (
          <p style={{ color: "#94a3b8", fontSize: "0.75rem", margin: "0.25rem 0 0" }}>
            Opens: {new Date(eventData.registration_open_at).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}
        {status === "open" && eventData.registration_close_at && (
          <p style={{ color: "#94a3b8", fontSize: "0.75rem", margin: "0.25rem 0 0" }}>
            Closes: {new Date(eventData.registration_close_at).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}
      </div>
    </div>
  );
}
