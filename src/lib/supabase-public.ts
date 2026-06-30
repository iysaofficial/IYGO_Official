import { createClient } from "@supabase/supabase-js";

export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuY2xkdmR3cmNpcG5sZ2R2Y3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3NjUzMzQsImV4cCI6MjA5ODM0MTMzNH0.ZzXWj6ASL2AbCUqt9_bpMDLyoIQjNxcE5XMM2T_b11k"
  );
}

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
