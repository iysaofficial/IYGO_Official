import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ valid: false, exists: false, error: "Invalid email format" }, { status: 422 });
    }

    const supabase = createAdminClient();

    // Check if user already exists in auth
    const { data } = await supabase.auth.admin.listUsers();
    const exists = data?.users?.some(
      (u) => u.email?.toLowerCase() === email.trim().toLowerCase()
    ) ?? false;

    return NextResponse.json({ valid: true, exists });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
