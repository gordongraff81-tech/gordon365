// ─────────────────────────────────────────────────────────────────────────────
// src/lib/mail/templates/internalLeadNotification.ts
// Interne Lead-Benachrichtigung – kein Locale, klar strukturiert
// ─────────────────────────────────────────────────────────────────────────────

import type { MailTemplateFactory } from "../types";
import { escapePayload } from "../utils";

export const internalLeadNotification: MailTemplateFactory = (payload) => {
  const { name, company, challenge } = escapePayload(payload);

  const subject = `New Lead – ${payload.company} [${payload.locale.toUpperCase()}]`;

  const timestamp = new Date().toLocaleString("de-DE", {
    timeZone: "Europe/Berlin",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Unternehmen", company],
    ["E-Mail", `<a href="mailto:${payload.email}" style="color:#2563eb; text-decoration:none;">${payload.email}</a>`],
    ["Locale", payload.locale.toUpperCase()],
    ["Größe", payload.size ?? "–"],
    ["Budget", payload.budget ?? "–"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
                <tr>
                  <td style="padding:8px 0; border-bottom:1px solid #f1f5f9;
                             font-size:12px; font-weight:bold; color:#64748b;
                             width:130px; vertical-align:top;
                             text-transform:uppercase; letter-spacing:0.06em;">
                    ${label}
                  </td>
                  <td style="padding:8px 0 8px 12px; border-bottom:1px solid #f1f5f9;
                             font-size:13px; color:#1e293b; vertical-align:top;">
                    ${value}
                  </td>
                </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>New Lead – Gordon365</title>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family:Arial, Helvetica, sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="background-color:#f1f5f9; padding:24px 16px;">
    <tr>
      <td align="center">

        <table role="presentation" width="560" cellpadding="0" cellspacing="0"
          style="width:560px; max-width:100%; background-color:#ffffff;
                 border-radius:8px; overflow:hidden;
                 box-shadow:0 2px 6px rgba(0,0,0,0.07);">

          <!-- Header -->
          <tr>
            <td style="background-color:#0f172a; padding:18px 28px;">
              <span style="font-size:16px; font-weight:bold; color:#ffffff;">
                gordon<span style="color:#2563eb;">365</span>
                <span style="font-size:12px; color:#94a3b8; font-weight:normal; margin-left:12px;">
                  Internal Lead Alert
                </span>
              </span>
            </td>
          </tr>

          <!-- Lead Badge -->
          <tr>
            <td style="background-color:#1e3a5f; padding:16px 28px;">
              <span style="font-size:13px; font-weight:bold; color:#ffffff;">
                Neue Anfrage von ${name} — ${company}
              </span>
              <span style="margin-left:12px; background-color:#2563eb;
                           color:#ffffff; font-size:10px; font-weight:bold;
                           padding:2px 8px; border-radius:3px;
                           letter-spacing:0.08em; text-transform:uppercase;">
                ${payload.locale}
              </span>
            </td>
          </tr>

          <!-- Data Table -->
          <tr>
            <td style="padding:24px 28px 0 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="border-collapse:collapse;">
                ${tableRows}
              </table>
            </td>
          </tr>

          <!-- Challenge -->
          <tr>
            <td style="padding:16px 28px 24px 28px;">
              <p style="margin:0 0 8px 0; font-size:12px; font-weight:bold;
                         color:#64748b; text-transform:uppercase; letter-spacing:0.06em;">
                Challenge / Nachricht
              </p>
              <div style="background-color:#f8fafc; border-left:3px solid #2563eb;
                          padding:12px 14px; font-size:13px; color:#334155;
                          line-height:1.65; border-radius:0 4px 4px 0;">
                ${challenge || "<em style=\"color:#94a3b8;\">Keine Angabe</em>"}
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 28px 24px 28px;">
              <a href="mailto:${payload.email}"
                 style="display:inline-block; background-color:#2563eb;
                        color:#ffffff; font-size:13px; font-weight:bold;
                        padding:10px 22px; border-radius:5px; text-decoration:none;">
                → Direkt antworten
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc; padding:12px 28px; border-top:1px solid #e2e8f0;">
              <p style="margin:0; font-size:11px; color:#94a3b8;">
                Generiert von gordon365.com &middot; ${timestamp}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `NEUE LEAD-ANFRAGE – gordon365.com

Name:        ${payload.name}
Unternehmen: ${payload.company}
E-Mail:      ${payload.email}
Locale:      ${payload.locale.toUpperCase()}
Größe:       ${payload.size ?? "–"}
Budget:      ${payload.budget ?? "–"}

Challenge:
${payload.challenge ?? "Keine Angabe"}

---
Generiert von gordon365.com · ${timestamp}`;

  return { subject, html, text };
};
