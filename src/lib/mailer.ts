import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "https://gordon365.com";

// Colors sampled directly from the brand logo, kept consistent with the
// invoice PDF instead of the previous arbitrary indigo and green accents.
const BRAND = {
  cyan: "#0DE4FD",
  blue: "#043CD9",
  navy: "#0B1B35",
};

function formatAmount(amount: number, currency: string, locale = "de") {
  return new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-GB", {
    style:    "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

// ── Shared layout (light, high-contrast — safe across all mail clients) ──────

function wrapLayout(locale: string, subject: string, bodyHtml: string): string {
  const isDE = locale === "de";
  return `
<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Gradient accent, the one deliberate flourish on an otherwise calm layout -->
          <tr>
            <td style="height:5px;border-radius:5px;background-color:${BRAND.blue};background-image:linear-gradient(90deg, ${BRAND.cyan}, ${BRAND.blue});"></td>
          </tr>

          <!-- Logo -->
          <tr>
            <td style="padding:24px 0 28px;text-align:center;">
              <img src="${BASE_URL}/brand/gordon-logo.png" alt="Gordon365" width="150" style="display:inline-block;height:auto;border:0;" />
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:40px 36px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;text-align:center;">
              <p style="margin:0;font-size:0.75rem;color:#64748b;line-height:1.6;">
                gordon365.com &middot; info@gordon365.com<br/>
                ${isDE ? "Diese E-Mail wurde automatisch generiert." : "This email was automatically generated."}
              </p>
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

function checkIcon(color: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding-bottom:24px;">
          <div style="width:64px;height:64px;background-color:${color}1a;border:1.5px solid ${color}55;border-radius:50%;display:inline-block;line-height:64px;text-align:center;">
            <span style="font-size:28px;color:${color};">&#10003;</span>
          </div>
        </td>
      </tr>
    </table>
  `;
}

// ── 1) Generic service order confirmation (e.g. Intune deployment) ──────────

export interface OrderMailData {
  customerEmail: string;
  customerName?: string;
  sessionId:     string;
  productName:   string;
  amountTotal:   number;
  currency:      string;
  locale?:       string;
}

export async function sendOrderConfirmation(data: OrderMailData) {
  const {
    customerEmail,
    customerName,
    sessionId,
    productName,
    amountTotal,
    currency,
    locale = "de",
  } = data;

  const isDE      = locale === "de";
  const formatted = formatAmount(amountTotal, currency, locale);
  const greeting  = customerName
    ? (isDE ? `Hallo ${customerName}` : `Hi ${customerName}`)
    : (isDE ? "Hallo" : "Hi there");

  const subject = isDE
    ? `Bestellbestätigung — ${productName}`
    : `Order confirmation — ${productName}`;

  const accent = BRAND.blue;

  const body = `
    ${checkIcon(accent)}

    <p style="margin:0 0 8px;font-size:1.5rem;font-weight:800;color:#0f172a;text-align:center;letter-spacing:-0.02em;">
      ${isDE ? "Vielen Dank für deinen Kauf!" : "Thank you for your purchase!"}
    </p>
    <p style="margin:0 0 32px;font-size:0.9375rem;color:#475569;text-align:center;line-height:1.6;">
      ${greeting},<br/>
      ${isDE
        ? `deine Bestellung für <strong style="color:#0f172a;">${productName}</strong> ist eingegangen.`
        : `your order for <strong style="color:#0f172a;">${productName}</strong> has been received.`
      }
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:32px;">
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #e2e8f0;">
          <span style="font-size:0.8125rem;color:#64748b;">${isDE ? "Produkt" : "Product"}</span>
          <span style="float:right;font-size:0.875rem;font-weight:600;color:#0f172a;">${productName}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #e2e8f0;">
          <span style="font-size:0.8125rem;color:#64748b;">${isDE ? "Betrag" : "Amount"}</span>
          <span style="float:right;font-size:1rem;font-weight:800;color:${accent};">${formatted}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 20px;">
          <span style="font-size:0.8125rem;color:#64748b;">${isDE ? "Bestellnummer" : "Order ID"}</span>
          <span style="float:right;font-family:monospace;font-size:0.75rem;color:#94a3b8;">${sessionId.slice(0, 24)}&hellip;</span>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 8px;font-size:0.875rem;font-weight:700;color:#0f172a;">
      ${isDE ? "Nächste Schritte" : "Next steps"}
    </p>
    <p style="margin:0 0 32px;font-size:0.875rem;color:#475569;line-height:1.7;">
      ${isDE
        ? `Ich melde mich innerhalb von <strong style="color:#0f172a;">24 Stunden</strong> bei dir, um den Deployment-Termin abzustimmen.`
        : `I will get in touch within <strong style="color:#0f172a;">24 hours</strong> to schedule the deployment.`
      }
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <a href="mailto:gordon@gordon365.com"
            style="display:inline-block;padding:12px 28px;background-color:${accent};color:#ffffff;font-size:0.9375rem;font-weight:700;text-decoration:none;border-radius:10px;">
            ${isDE ? "Gordon direkt kontaktieren" : "Contact Gordon directly"}
          </a>
        </td>
      </tr>
    </table>
  `;

  await transporter.sendMail({
    from:    process.env.SMTP_FROM,
    to:      customerEmail,
    subject,
    html:    wrapLayout(locale, subject, body),
  });
}

// ── 2) Template purchase confirmation (with download links + invoice) ──────

export interface TemplateOrderMailData {
  customerEmail: string;
  customerName?: string;
  sessionId:     string;
  productName:   string;
  amountTotal:   number;
  currency:      string;
  locale?:       string;
  downloads:     { label: string; url: string }[];
  invoiceNumber?: string;
  invoicePdf?:    Buffer;
}

export async function sendTemplateOrderConfirmation(data: TemplateOrderMailData) {
  const {
    customerEmail,
    customerName,
    sessionId,
    productName,
    amountTotal,
    currency,
    locale = "de",
    downloads,
    invoiceNumber,
    invoicePdf,
  } = data;

  const isDE      = locale === "de";
  const formatted = formatAmount(amountTotal, currency, locale);
  const greeting  = customerName
    ? (isDE ? `Hallo ${customerName}` : `Hi ${customerName}`)
    : (isDE ? "Hallo" : "Hi there");

  const subject = isDE
    ? `Deine Downloads — ${productName}`
    : `Your downloads — ${productName}`;

  const accent = BRAND.blue;

  const downloadRows = downloads
    .map(
      (d) => `
      <tr>
        <td style="padding:12px 18px;border-bottom:1px solid #e2e8f0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:0.875rem;font-weight:600;color:#0f172a;">${d.label}</td>
              <td align="right">
                <a href="${d.url}"
                  style="display:inline-block;padding:8px 16px;background-color:${accent};color:#ffffff;font-size:0.8125rem;font-weight:700;text-decoration:none;border-radius:8px;">
                  ${isDE ? "Herunterladen" : "Download"}
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    )
    .join("");

  const invoiceRow = invoiceNumber
    ? `
      <tr>
        <td style="padding:14px 20px;border-top:1px solid #e2e8f0;">
          <span style="font-size:0.8125rem;color:#64748b;">${isDE ? "Rechnungsnummer" : "Invoice number"}</span>
          <span style="float:right;font-size:0.875rem;font-weight:700;color:#0f172a;">${invoiceNumber}</span>
        </td>
      </tr>`
    : "";

  const body = `
    ${checkIcon(accent)}

    <p style="margin:0 0 8px;font-size:1.5rem;font-weight:800;color:#0f172a;text-align:center;letter-spacing:-0.02em;">
      ${isDE ? "Deine Dateien sind bereit!" : "Your files are ready!"}
    </p>
    <p style="margin:0 0 32px;font-size:0.9375rem;color:#475569;text-align:center;line-height:1.6;">
      ${greeting},<br/>
      ${isDE
        ? `vielen Dank für deinen Kauf von <strong style="color:#0f172a;">${productName}</strong>. Du kannst alle Dateien direkt unten herunterladen.`
        : `thank you for purchasing <strong style="color:#0f172a;">${productName}</strong>. You can download all files directly below.`
      }
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:24px;">
      ${downloadRows}
    </table>

    <p style="margin:0 0 32px;font-size:0.8125rem;color:#94a3b8;text-align:center;line-height:1.6;">
      ${isDE
        ? "Die Links sind dauerhaft gültig und an deinen Kauf gebunden, du kannst jederzeit erneut herunterladen."
        : "These links remain valid permanently and are tied to your purchase, you can download again at any time."
      }
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:32px;">
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #e2e8f0;">
          <span style="font-size:0.8125rem;color:#64748b;">${isDE ? "Betrag" : "Amount"}</span>
          <span style="float:right;font-size:1rem;font-weight:800;color:${accent};">${formatted}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 20px;">
          <span style="font-size:0.8125rem;color:#64748b;">${isDE ? "Bestellnummer" : "Order ID"}</span>
          <span style="float:right;font-family:monospace;font-size:0.75rem;color:#94a3b8;">${sessionId.slice(0, 24)}&hellip;</span>
        </td>
      </tr>
      ${invoiceRow}
    </table>

    ${invoicePdf ? `<p style="margin:0 0 24px;font-size:0.8125rem;color:#94a3b8;text-align:center;">${isDE ? "Die Rechnung findest du im Anhang dieser Mail." : "The invoice is attached to this email."}</p>` : ""}

    <p style="margin:0;font-size:0.8125rem;color:#64748b;text-align:center;line-height:1.6;">
      ${isDE ? "Fragen zu den Templates?" : "Questions about the templates?"}
      <a href="mailto:info@gordon365.com" style="color:${accent};font-weight:600;text-decoration:underline;">
        info@gordon365.com
      </a>
    </p>
  `;

  await transporter.sendMail({
    from:    process.env.SMTP_FROM,
    to:      customerEmail,
    subject,
    html:    wrapLayout(locale, subject, body),
    attachments: invoicePdf && invoiceNumber
      ? [{ filename: `${invoiceNumber}.pdf`, content: invoicePdf }]
      : undefined,
  });
}
