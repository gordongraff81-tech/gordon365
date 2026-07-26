import nodemailer from "nodemailer";
import type { Product } from "./products";
import { getCurrentVersion } from "./products";

/**
 * Email delivery for purchased templates.
 *
 * Reuses the existing nodemailer dependency already in package.json -
 * configure SMTP credentials via environment variables. Works with any
 * SMTP provider (e.g. a transactional email service, or your existing
 * mail setup if Gordon365 already sends contact-form emails via nodemailer).
 */

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in your environment."
    );
  }

  // Initialize transporter at runtime (not during build)
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

interface SendDownloadEmailParams {
  to: string;
  product: Product;
  sessionId: string;
  locale: string;
}

export async function sendDownloadEmail({
  to,
  product,
  sessionId,
  locale,
}: SendDownloadEmailParams): Promise<void> {
  const transporter = getTransporter();
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
  const version = getCurrentVersion(product);
  const fileKeys = version ? Object.keys(version.files) : [];

  const isDE = locale === "de";

  const downloadLinks = fileKeys
    .map((key) => {
      const label = key.replace(/([A-Z])/g, " $1").trim();
      const url = `${baseUrl}/api/download/${sessionId}?file=${key}`;
      return `<li><a href="${url}" style="color:#0071E3;">${
        label.charAt(0).toUpperCase() + label.slice(1)
      }</a></li>`;
    })
    .join("");

  const subject = isDE
    ? `Dein Download: ${product.title}`
    : `Your download: ${product.title}`;

  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
      <h1 style="font-size: 20px; color: #1D1D1F;">
        ${isDE ? "Vielen Dank für deinen Kauf" : "Thank you for your purchase"}
      </h1>
      <p style="color: #6E6E73; font-size: 14px; line-height: 1.6;">
        ${
          isDE
            ? `Dein Download für <strong>${product.title}</strong> steht bereit:`
            : `Your download for <strong>${product.title}</strong> is ready:`
        }
      </p>
      <ul style="font-size: 14px; line-height: 1.8;">
        ${downloadLinks}
      </ul>
      <p style="color: #AEAEB2; font-size: 12px; margin-top: 32px;">
        Gordon365 · gordon365.com
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? '"Gordon365" <noreply@gordon365.com>',
    to,
    subject,
    html,
  });
}
