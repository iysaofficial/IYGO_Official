import { createClient } from "@supabase/supabase-js";

export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Single source of truth for this event's slug.
// Set NEXT_PUBLIC_EVENT_SLUG in .env.local — the only thing to change per event website.
export const EVENT_SLUG = process.env.NEXT_PUBLIC_EVENT_SLUG!;

export type RegistrationStatus = "open" | "coming_soon" | "closed";

export function computeRegistrationStatus(
  openAt: string | null,
  closeAt: string | null,
  isActive: boolean
): RegistrationStatus {
  if (!isActive) return "closed";
  if (!openAt || !closeAt) return "coming_soon";
  const now = new Date();
  if (now < new Date(openAt)) return "coming_soon";
  if (now > new Date(closeAt)) return "closed";
  return "open";
}
