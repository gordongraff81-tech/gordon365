// Place the logo at public/brand/gordon-logo.png (use GordonLogo.png from the
// brand kit). Email clients vary widely in support for embedded or base64
// images, so the logo is referenced through a normal hosted URL here instead
// of the base64 approach used in the PDF generator.

const COLORS = {
  navy: "#0B1B35",
  cyan: "#0DE4FD",
  blue: "#043CD9",
  paper: "#FFFFFF",
  bg: "#F4F6F8",
  slate: "#5B6472",
  hairline: "#E4E7EC",
};

type Locale = "de" | "en";

interface ConfirmationEmailData {
  locale: Locale;
  customerFirstName?: string;
  productName: string;
  amountFormatted: string; // e.g. "149,00 €"
  downloadUrl: string;
  invoiceNumber: string;
}

const TEXT: Record<Locale, Record<string, string>> = {
  de: {
    preheader: "Deine Bestätigung und der Downloadlink",
    greeting: "Hallo",
    thanks: "vielen Dank für deinen Kauf bei Gordon365.",
    orderLabel: "Bestellung",
    amountLabel: "Betrag",
    invoiceLabel: "Rechnungsnummer",
    cta: "Jetzt herunterladen",
    note: "Der Downloadlink ist 24 Stunden gültig. Die Rechnung liegt dieser Mail als PDF an.",
    support: "Fragen? Schreib uns einfach an",
  },
  en: {
    preheader: "Your confirmation and download link",
    greeting: "Hi",
    thanks: "thank you for your purchase from Gordon365.",
    orderLabel: "Order",
    amountLabel: "Amount",
    invoiceLabel: "Invoice number",
    cta: "Download now",
    note: "The download link is valid for 24 hours. The invoice is attached to this email as a PDF.",
    support: "Questions? Just write to",
  },
};

export function renderConfirmationEmailHtml(data: ConfirmationEmailData): string {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "https://gordon365.com";
  const t = TEXT[data.locale];
  const greetingName = data.customerFirstName ? `, ${data.customerFirstName}` : "";

  return `<!DOCTYPE html>
<html lang="${data.locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gordon365</title>
  </head>
  <body style="margin:0; padding:0; background-color:${COLORS.bg}; font-family: Helvetica, Arial, sans-serif;">
    <span style="display:none; max-height:0; overflow:hidden;">${t.preheader}</span>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.bg};">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:${COLORS.paper}; border-radius:8px; overflow:hidden;">
            <tr>
              <td style="height:6px; background-color:${COLORS.blue}; background-image:linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.blue});"></td>
            </tr>
            <tr>
              <td style="padding: 36px 40px 0 40px;">
                <img src="${baseUrl}/brand/gordon-logo.png" width="160" alt="Gordon365" style="display:block; height:auto; border:0;" />
              </td>
            </tr>
            <tr>
              <td style="padding: 28px 40px 0 40px; color:${COLORS.navy};">
                <p style="margin:0 0 4px 0; font-size:18px; font-weight:bold;">${t.greeting}${greetingName},</p>
                <p style="margin:0; font-size:14px; color:${COLORS.slate};">${t.thanks}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 40px 0 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${COLORS.hairline}; border-radius:6px;">
                  <tr>
                    <td style="padding:16px 20px; font-size:13px; color:${COLORS.slate};">${t.orderLabel}</td>
                    <td style="padding:16px 20px; font-size:13px; color:${COLORS.navy}; font-weight:bold; text-align:right;">${data.productName}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 20px 16px 20px; font-size:13px; color:${COLORS.slate}; border-top:1px solid ${COLORS.hairline}; padding-top:16px;">${t.amountLabel}</td>
                    <td style="padding:0 20px 16px 20px; font-size:13px; color:${COLORS.navy}; font-weight:bold; text-align:right; border-top:1px solid ${COLORS.hairline}; padding-top:16px;">${data.amountFormatted}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 20px 16px 20px; font-size:13px; color:${COLORS.slate}; border-top:1px solid ${COLORS.hairline}; padding-top:16px;">${t.invoiceLabel}</td>
                    <td style="padding:0 20px 16px 20px; font-size:13px; color:${COLORS.navy}; font-weight:bold; text-align:right; border-top:1px solid ${COLORS.hairline}; padding-top:16px;">${data.invoiceNumber}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 28px 40px 0 40px;">
                <a href="${data.downloadUrl}" style="display:inline-block; background-color:${COLORS.navy}; color:${COLORS.paper}; text-decoration:none; font-size:14px; font-weight:bold; padding:14px 32px; border-radius:6px;">${t.cta}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 40px 0 40px;">
                <p style="margin:0; font-size:12px; color:${COLORS.slate}; text-align:center;">${t.note}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px 40px 32px 40px;">
                <div style="border-top:1px solid ${COLORS.hairline}; padding-top:16px; font-size:11px; color:${COLORS.slate}; text-align:center;">
                  ${t.support} <a href="mailto:info@gordon365.com" style="color:${COLORS.blue};">info@gordon365.com</a>
                  <br />
                  Gordon365, Gordon Graff, Nordbahnstr. 25, 13409 Berlin
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/*
Usage inside the Stripe webhook handler:

const html = renderConfirmationEmailHtml({
  locale: session.locale === "en" ? "en" : "de",
  customerFirstName: session.customer_details?.name?.split(" ")[0],
  productName: product.title,
  amountFormatted: formatEUR(session.amount_total!),
  downloadUrl: createSignedDownloadUrl(product.id, session.id),
  invoiceNumber,
});

await transporter.sendMail({
  to: session.customer_details!.email!,
  from: "Gordon365 <info@gordon365.com>",
  subject: "Deine Bestellung bei Gordon365",
  html,
  attachments: [{ filename: `${invoiceNumber}.pdf`, content: pdfBuffer }],
});
*/
