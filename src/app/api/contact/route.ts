import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().min(1).max(100),
  email: z.string().email(),
  size: z.string().optional(),
  budget: z.string().optional(),
  challenge: z.string().max(2000).optional(),
});

function escapeHtml(str: string = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createCustomerMail(name: string) {
  const safeName = escapeHtml(name);

  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
    <tr>
      <td align="center">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:100%; font-family:Arial, Helvetica, sans-serif; color:#1e293b; line-height:1.5;">

          <tr>
            <td style="padding:24px 20px; border-bottom:1px solid #e2e8f0;">
              <div style="font-size:20px; font-weight:bold; color:#0f172a;">
                gordon<span style="color:#2563eb;">365</span>
              </div>
              <div style="font-size:12px; color:#64748b;">
                Microsoft 365 & AI Integration
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 20px; font-size:14px;">

              <p style="margin:0 0 16px 0;">
                Hi ${safeName},
              </p>

              <p style="margin:0 0 16px 0;">
                Your request for a strategy call has been received.
              </p>

              <p style="margin:0 0 16px 0;">
                I will review your information and respond within one business day with next steps.
              </p>

              <table role="presentation" width="100%" style="background:#f8fafc; border-left:4px solid #2563eb; margin:20px 0;">
                <tr>
                  <td style="padding:12px;">
                    <div style="font-size:13px; font-weight:bold; margin-bottom:8px;">
                      Next steps
                    </div>
                    <div style="font-size:13px;">
                      1. Review of your request<br/>
                      2. Confirmation email with scheduling link<br/>
                      3. 30 minute strategy session
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 20px 0; font-size:13px; color:#475569;">
                For urgent matters, reply directly to this email or contact info@gordon365.com
              </p>

              <table role="presentation" width="100%" style="border-top:1px solid #e2e8f0;">
                <tr>
                  <td style="padding-top:16px; font-size:13px;">
                    <strong>Gordon Graff</strong><br/>
                    Modern Workplace Engineer & Consultant<br/>
                    <a href="https://gordon365.com" style="color:#2563eb; text-decoration:none;">
                      gordon365.com
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = ContactSchema.parse(body);

    const zohoPassword = process.env.ZOHO_TOKEN;
    const notifyEmail = process.env.NOTIFY_EMAIL ?? "info@gordon365.com";

    if (!zohoPassword) {
      console.error("Missing ZOHO_TOKEN");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true,
      auth: {
        user: "info@gordon365.com",
        pass: zohoPassword,
      },
    });

    await transporter.sendMail({
      from: '"Gordon365" <info@gordon365.com>',
      to: notifyEmail,
      subject: `New Strategy Call Request — ${data.company}`,
      text: [
        `Name: ${data.name}`,
        `Company: ${data.company}`,
        `Email: ${data.email}`,
        `Size: ${data.size ?? "Not specified"}`,
        `Budget: ${data.budget ?? "Not specified"}`,
        `Challenge: ${data.challenge ?? "Not specified"}`,
      ].join("\n"),
    });

    await transporter.sendMail({
      from: '"Gordon365" <info@gordon365.com>',
      to: data.email,
      subject: "Your strategy call request — Gordon365",
      html: createCustomerMail(data.name),
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: err.flatten() },
        { status: 400 }
      );
    }

    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}