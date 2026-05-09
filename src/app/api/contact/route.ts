import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name:      z.string().min(2).max(100),
  company:   z.string().min(1).max(100),
  email:     z.string().email(),
  size:      z.string().optional(),
  budget:    z.string().optional(),
  challenge: z.string().max(2000).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = ContactSchema.parse(body);

    const zohoToken = process.env.ZOHO_TOKEN;
    const zohoAccountId = process.env.ZOHO_ACCOUNT_ID;
    const notifyEmail = process.env.NOTIFY_EMAIL ?? "gordon@gordon365.com";

    if (zohoToken && zohoAccountId) {
      // Notification to Gordon
      await fetch(`https://mail.zoho.eu/api/accounts/${zohoAccountId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${zohoToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromAddress: "noreply@gordon365.com",
          toAddress: notifyEmail,
          subject: `New Strategy Call Request — ${data.company}`,
          content: [
            `Name: ${data.name}`,
            `Company: ${data.company}`,
            `Email: ${data.email}`,
            `Company size: ${data.size ?? "Not specified"}`,
            `Budget: ${data.budget ?? "Not specified"}`,
            `Challenge: ${data.challenge ?? "Not specified"}`,
            ``,
            `Reply directly to: ${data.email}`,
          ].join("\n"),
          mailFormat: "plaintext",
        }),
      });

      // Autoresponder to lead
      await fetch(`https://mail.zoho.eu/api/accounts/${zohoAccountId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${zohoToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromAddress: "gordon@gordon365.com",
          toAddress: data.email,
          subject: "Your strategy call request — Gordon365",
          content: [
            `Hi ${data.name},`,
            ``,
            `Thank you for reaching out to Gordon365.`,
            ``,
            `I've received your request and will be in touch within one business day`,
            `to confirm your strategy call.`,
            ``,
            `If you have any urgent questions in the meantime, you can reach me`,
            `directly at gordon@gordon365.com.`,
            ``,
            `Best regards,`,
            `Gordon Graff`,
            `Gordon365 — Microsoft 365 Consulting`,
            `gordon365.com`,
          ].join("\n"),
          mailFormat: "plaintext",
        }),
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: err.flatten() },
        { status: 400 }
      );
    }
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}