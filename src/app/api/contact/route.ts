import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

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

    const zohoPassword = process.env.ZOHO_TOKEN; // Hier liegt dein neues 16-stelliges App-Passwort
    const notifyEmail = process.env.NOTIFY_EMAIL ?? "info@gordon365.com";

    if (!zohoPassword) {
      console.error("ZOHO_TOKEN (App-Passwort) fehlt in den Umgebungsvariablen.");
      return NextResponse.json({ error: "Konfigurationsfehler" }, { status: 500 });
    }

    // SMTP-Transporter für Zoho EU einrichten
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true, // true für Port 465
      auth: {
        user: "info@gordon365.com",
        pass: zohoPassword,
      },
    });

    // 1. Benachrichtigung an dich selbst
    await transporter.sendMail({
      from: '"Gordon365" <info@gordon365.com>',
      to: notifyEmail,
      subject: `New Strategy Call Request — ${data.company}`,
      text: [
        `Name: ${data.name}`,
        `Company: ${data.company}`,
        `Email: ${data.email}`,
        `Company size: ${data.size ?? "Not specified"}`,
        `Budget: ${data.budget ?? "Not specified"}`,
        `Challenge: ${data.challenge ?? "Not specified"}`,
        ``,
        `Reply directly to: ${data.email}`,
      ].join("\n"),
    });

    // 2. Autoresponder an den Kunden
    await transporter.sendMail({
      from: '"Gordon Graff" <info@gordon365.com>',
      to: data.email,
      subject: "Your strategy call request — Gordon365",
      text: [
        `Hi ${data.name},`,
        ``,
        `Thank you for reaching out to Gordon365.`,
        ``,
        `I've received your request and will be in touch within one business day`,
        `to confirm your strategy call.`,
        ``,
        `If you have any urgent questions in the meantime, you can reach me`,
        `directly at info@gordon365.com.`,
        ``,
        `Best regards,`,
        `Gordon Graff`,
        `Gordon365 — Microsoft 365 Consulting`,
        `gordon365.com`,
      ].join("\n"),
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}