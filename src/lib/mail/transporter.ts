// ─────────────────────────────────────────────────────────────────────────────
// src/lib/mail/transporter.ts
// Nodemailer-Singleton – Zoho SMTP via Port 465
// ─────────────────────────────────────────────────────────────────────────────

import nodemailer, { type Transporter } from "nodemailer";

let _transporter: Transporter | null = null;

/**
 * Gibt den Nodemailer-Transporter zurück (Singleton).
 * Alle Parameter stammen ausschließlich aus Umgebungsvariablen.
 */
export function getTransporter(): Transporter {
  if (_transporter) return _transporter;

  const user = process.env.SMTP_USER ?? "info@gordon365.com";
  const pass = process.env.ZOHO_TOKEN;

  if (!pass) {
    throw new Error(
      "SMTP-Konfiguration unvollständig: ZOHO_TOKEN fehlt."
    );
  }

  _transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true,
    auth: { user, pass },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
  });

  return _transporter;
}
