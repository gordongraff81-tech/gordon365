// ─────────────────────────────────────────────────────────────────────────────
// src/lib/mail/templates/customerStrategy.de.ts
// Deutsche Kundenbestätigung – enterprise-clean, table-based, Outlook-kompatibel
// ─────────────────────────────────────────────────────────────────────────────

import type { MailTemplateFactory } from "../types";
import { escapePayload } from "../utils";

export const customerStrategyDe: MailTemplateFactory = (payload) => {
  const { name, company } = escapePayload(payload);

  const subject = `Ihre Anfrage ist eingegangen – Gordon365`;

  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ihre Anfrage – Gordon365</title>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family:Arial, Helvetica, sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="background-color:#f1f5f9; padding:32px 16px;">
    <tr>
      <td align="center">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0"
          style="width:600px; max-width:100%; background-color:#ffffff;
                 border-radius:8px; overflow:hidden;
                 box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:#0f172a; padding:24px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-family:Arial,Helvetica,sans-serif;
                                 font-size:22px; font-weight:bold;
                                 color:#ffffff; letter-spacing:-0.5px;">
                      gordon<span style="color:#2563eb;">365</span>
                    </span>
                  </td>
                  <td align="right">
                    <span style="font-size:11px; color:#94a3b8;
                                 letter-spacing:0.08em; text-transform:uppercase;">
                      Microsoft 365 &amp; AI Integration
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style="background-color:#1e3a5f; padding:28px 32px;">
              <p style="margin:0; font-size:13px; color:#93c5fd;
                         letter-spacing:0.08em; text-transform:uppercase;
                         font-weight:bold;">
                Strategiegespräch
              </p>
              <h1 style="margin:8px 0 0 0; font-size:26px; font-weight:bold;
                          color:#ffffff; line-height:1.25;">
                Ihre Anfrage ist eingegangen
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 32px 0 32px;">
              <p style="margin:0 0 18px 0; font-size:15px; color:#1e293b; line-height:1.6;">
                Guten Tag ${name},
              </p>
              <p style="margin:0 0 18px 0; font-size:14px; color:#334155; line-height:1.7;">
                vielen Dank für Ihre Anfrage zum Strategiegespräch.
                Ich habe Ihre Informationen zu <strong>${company}</strong> erhalten
                und melde mich innerhalb eines Werktages mit den nächsten Schritten.
              </p>
              <p style="margin:0 0 24px 0; font-size:14px; color:#334155; line-height:1.7;">
                In der Zwischenzeit können Sie gern direkt auf diese E-Mail antworten,
                falls Sie noch etwas ergänzen möchten.
              </p>
            </td>
          </tr>

          <!-- Nächste Schritte -->
          <tr>
            <td style="padding:0 32px 24px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="background-color:#f8fafc; border-left:4px solid #2563eb; border-radius:4px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="margin:0 0 10px 0; font-size:12px; font-weight:bold;
                               color:#1e293b; letter-spacing:0.06em; text-transform:uppercase;">
                      Nächste Schritte
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:4px 0; font-size:13px; color:#334155;">
                          <span style="color:#2563eb; font-weight:bold; margin-right:8px;">1.</span>
                          Prüfung Ihrer Anfrage und Unterlagen
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0; font-size:13px; color:#334155;">
                          <span style="color:#2563eb; font-weight:bold; margin-right:8px;">2.</span>
                          Bestätigungs-E-Mail mit Terminvorschlägen
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0; font-size:13px; color:#334155;">
                          <span style="color:#2563eb; font-weight:bold; margin-right:8px;">3.</span>
                          30-minütiges Strategiegespräch (kostenlos)
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Kontakt-Hinweis -->
          <tr>
            <td style="padding:0 32px 28px 32px;">
              <p style="margin:0; font-size:13px; color:#64748b; line-height:1.6;">
                Bei dringenden Anliegen antworten Sie direkt auf diese E-Mail oder
                schreiben Sie an
                <a href="mailto:info@gordon365.com" style="color:#2563eb; text-decoration:none;">
                  info@gordon365.com
                </a>.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="height:1px; background-color:#e2e8f0; font-size:0;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Signatur -->
          <tr>
            <td style="padding:24px 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:16px; vertical-align:top;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:44px; height:44px; background-color:#1e3a5f;
                                   border-radius:50%; text-align:center; vertical-align:middle;">
                          <span style="font-size:18px; font-weight:bold;
                                       color:#ffffff; line-height:44px;">G</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="vertical-align:top;">
                    <p style="margin:0; font-size:14px; font-weight:bold; color:#0f172a;">
                      Gordon Graff
                    </p>
                    <p style="margin:2px 0 0 0; font-size:12px; color:#64748b;">
                      Modern Workplace Engineer &amp; Consultant
                    </p>
                    <p style="margin:6px 0 0 0; font-size:12px;">
                      <a href="https://gordon365.com" style="color:#2563eb; text-decoration:none;">
                        gordon365.com
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc; padding:16px 32px; border-top:1px solid #e2e8f0;">
              <p style="margin:0; font-size:11px; color:#94a3b8; line-height:1.5;">
                Sie erhalten diese E-Mail, weil Sie über gordon365.com ein
                Strategiegespräch angefragt haben.<br />
                &copy; ${new Date().getFullYear()} Gordon365 – Microsoft 365 &amp; AI Integration
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Guten Tag ${payload.name},

vielen Dank für Ihre Anfrage zum Strategiegespräch.

Ich habe Ihre Informationen zu ${payload.company} erhalten und melde mich innerhalb eines Werktages.

Nächste Schritte:
1. Prüfung Ihrer Anfrage
2. Bestätigungs-E-Mail mit Terminvorschlägen
3. 30-minütiges Strategiegespräch (kostenlos)

Bei Fragen: info@gordon365.com

Mit freundlichen Grüßen,
Gordon Graff
Modern Workplace Engineer & Consultant
https://gordon365.com`;

  return { subject, html, text };
};
