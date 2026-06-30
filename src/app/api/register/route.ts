import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase-admin";

const resend = new Resend(process.env.RESEND_API_KEY);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function generatePassword(length = 8): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

function determineCategory(
  participantCategory: string,
  competitionCategory: string
): string {
  const isInternational = participantCategory
    .toLowerCase()
    .includes("international");
  const isOffline = competitionCategory.toLowerCase().includes("offline");

  if (isInternational && isOffline) return "international_offline";
  if (isInternational && !isOffline) return "international_online";
  if (!isInternational && isOffline) return "national_offline";
  return "national_online";
}

function buildEmailHtml(params: {
  leaderName: string;
  email: string;
  password: string;
  registrationNumber: string;
  dashboardUrl: string;
}): string {
  const { leaderName, email, password, registrationNumber, dashboardUrl } =
    params;
  const loginUrl = `${dashboardUrl}/login`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>IYGO 2026 Registration Confirmed</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:#66449b;padding:40px 48px;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:3px;color:rgba(255,255,255,0.75);text-transform:uppercase;">Indonesian Youth Geography Olympiad</p>
              <h1 style="margin:0;font-size:32px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">IYGO 2026</h1>
              <div style="width:48px;height:3px;background:rgba(255,255,255,0.4);border-radius:2px;margin:16px auto 0;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 48px;">

              <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:2px;color:#66449b;text-transform:uppercase;">Registration Confirmed</p>
              <h2 style="margin:0 0 24px;font-size:24px;font-weight:700;color:#1a1a2e;">Welcome, ${leaderName}!</h2>

              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#4a4a6a;">
                Your registration for <strong>IYGO 2026</strong> has been received and confirmed. Our team will validate your submission within <strong>3 working days</strong>, and your Letter of Acceptance (LOA) will be sent to this email address.
              </p>

              <!-- Registration Number Badge -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#f0ebf8;border-left:4px solid #66449b;border-radius:0 8px 8px 0;padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:12px;font-weight:600;letter-spacing:1.5px;color:#66449b;text-transform:uppercase;">Registration Number</p>
                    <p style="margin:0;font-size:22px;font-weight:800;color:#1a1a2e;letter-spacing:1px;">${registrationNumber}</p>
                  </td>
                </tr>
              </table>

              <!-- Dashboard Access -->
              <p style="margin:0 0 16px;font-size:15px;font-weight:600;color:#1a1a2e;">Your Dashboard Access</p>
              <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#4a4a6a;">
                Use the credentials below to log in to your participant dashboard, where you can track your registration status and access event materials.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8fb;border:1px solid #e8e4f0;border-radius:8px;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;border-bottom:1px solid #e8e4f0;">
                          <span style="font-size:12px;font-weight:600;color:#8b7aa8;text-transform:uppercase;letter-spacing:1px;">Login URL</span><br/>
                          <a href="${loginUrl}" style="font-size:14px;color:#66449b;font-weight:600;text-decoration:none;">${loginUrl}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;border-bottom:1px solid #e8e4f0;">
                          <span style="font-size:12px;font-weight:600;color:#8b7aa8;text-transform:uppercase;letter-spacing:1px;">Email</span><br/>
                          <span style="font-size:14px;color:#1a1a2e;font-weight:500;">${email}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="font-size:12px;font-weight:600;color:#8b7aa8;text-transform:uppercase;letter-spacing:1px;">Password</span><br/>
                          <span style="font-size:18px;color:#1a1a2e;font-weight:700;letter-spacing:2px;font-family:'Courier New',monospace;">${password}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center">
                    <a href="${loginUrl}" style="display:inline-block;background-color:#66449b;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 40px;border-radius:8px;letter-spacing:0.5px;">
                      Go to Dashboard &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Security Note -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="background:#fff8e6;border:1px solid #f5d87a;border-radius:8px;padding:14px 18px;">
                    <p style="margin:0;font-size:13px;line-height:1.6;color:#7a5c00;">
                      <strong>Security tip:</strong> Please change your password after your first login. Keep your credentials safe and do not share them.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;line-height:1.7;color:#4a4a6a;">
                If you have any questions, please contact us at <a href="mailto:iygo@iysa.or.id" style="color:#66449b;text-decoration:none;font-weight:600;">iygo@iysa.or.id</a>.
                We look forward to seeing you at IYGO 2026!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f0ebf8;padding:24px 48px;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#66449b;">IYGO 2026 — Indonesian Youth Geography Olympiad</p>
              <p style="margin:0;font-size:12px;color:#8b7aa8;">Organized by IYORA &amp; IYSA · <a href="https://iysa.or.id" style="color:#66449b;text-decoration:none;">iysa.or.id</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    // ── 1. Parse FormData ────────────────────────────────────────────────────
    const formData = await request.formData();

    const leaderEmail = (formData.get("LEADER_EMAIL") as string | null)?.trim();
    const fullName = (formData.get("FULL_NAME") as string | null)?.trim();
    const participantCategory = (
      formData.get("PARTICIPANT_CATEGORY") as string | null
    )?.trim();
    const competitionCategory = (
      formData.get("COMPETITION_CATEGORY") as string | null
    )?.trim();

    if (!leaderEmail || !fullName || !participantCategory || !competitionCategory) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // First line of FULL_NAME is the leader's name
    const leaderName = fullName.split("\n")[0].trim() || fullName;

    // Collect all remaining form fields into form_data JSONB
    const formDataObj: Record<string, string> = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value as string;
    });

    // ── 2. Determine category ────────────────────────────────────────────────
    const category = determineCategory(participantCategory, competitionCategory);

    const supabase = createAdminClient();

    // ── 3. Get event_id for slug "iygo" ─────────────────────────────────────
    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .select("id")
      .eq("slug", "iygo")
      .single();

    if (eventError || !eventData) {
      console.error("Event lookup failed:", eventError);
      return NextResponse.json(
        { success: false, error: "Event not found." },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    const eventId = eventData.id as string;

    // ── 4. Generate password ─────────────────────────────────────────────────
    const password = generatePassword(8);

    // ── 5. Create Supabase Auth user ─────────────────────────────────────────
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email: leaderEmail,
        password,
        email_confirm: true,
      });

    // ── 6. Handle duplicate email ────────────────────────────────────────────
    if (authError) {
      const isDuplicate =
        authError.message.toLowerCase().includes("already") ||
        authError.message.toLowerCase().includes("duplicate") ||
        authError.code === "email_exists";

      if (isDuplicate) {
        return NextResponse.json(
          {
            success: false,
            error: "Email already registered for this event.",
          },
          { status: 409, headers: CORS_HEADERS }
        );
      }

      console.error("Auth user creation failed:", authError);
      return NextResponse.json(
        { success: false, error: "Failed to create account." },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    const userId = authData.user.id;

    // ── 7. Insert registration record ────────────────────────────────────────
    const { data: registrationData, error: registrationError } = await supabase
      .from("registrations")
      .insert({
        user_id: userId,
        event_id: eventId,
        email: leaderEmail,
        leader_name: leaderName,
        category,
        status: "pending",
        form_data: formDataObj,
      })
      .select("registration_number")
      .single();

    if (registrationError || !registrationData) {
      console.error("Registration insert failed:", registrationError);
      // Best-effort: clean up the auth user we just created
      await supabase.auth.admin.deleteUser(userId);
      return NextResponse.json(
        { success: false, error: "Failed to save registration." },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    const registrationNumber = registrationData.registration_number as string;
    const dashboardUrl =
      process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "https://dashboard.iygo.id";

    // ── 8. Send confirmation email ───────────────────────────────────────────
    const { error: emailError } = await resend.emails.send({
      from: "IYGO 2026 <noreply@iysa.or.id>",
      to: leaderEmail,
      subject: "IYGO 2026 Registration Confirmed — Your Dashboard Access",
      html: buildEmailHtml({
        leaderName,
        email: leaderEmail,
        password,
        registrationNumber,
        dashboardUrl,
      }),
    });

    if (emailError) {
      // Registration succeeded; log the email failure but don't block the response
      console.error("Confirmation email failed:", emailError);
    }

    // ── 9. Return success ────────────────────────────────────────────────────
    return NextResponse.json(
      { success: true, registration_number: registrationNumber },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (err) {
    console.error("Unexpected error in /api/register:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
