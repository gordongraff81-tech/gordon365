import { NextResponse } from "next/server";
import { sendTemplateOrderConfirmation } from "@/lib/mailer";
import { generateInvoicePdf } from "@/lib/InvoiceDocument";
import { nextInvoiceNumber } from "@/lib/InvoiceNumber";

export const runtime = "nodejs";

// Temporary route, only for local testing. Sends a real test mail with a
// real invoice attached to your own inbox, no Stripe involved. Visit
// /api/devTestMail in the browser while npm run dev is running.
// Delete this whole folder before deploying.

const TEST_RECIPIENT = "info@gordon365.com";

export async function GET() {
  try {
    const invoiceNumber = await nextInvoiceNumber();
    const invoicePdf = await generateInvoicePdf({
      invoiceNumber,
      invoiceDate: new Date(),
      customerName: "Maria Testkundin",
      customerEmail: TEST_RECIPIENT,
      customerAddress: "Musterstraße 1, 10115 Berlin",
      productName: "Conditional Access Hardening Pack",
      amountCents: 14900,
      stripeSessionId: "cs_test_devpreview",
    });

    await sendTemplateOrderConfirmation({
      customerEmail: TEST_RECIPIENT,
      customerName: "Maria Testkundin",
      sessionId: "cs_test_devpreview",
      productName: "Conditional Access Hardening Pack",
      amountTotal: 14900,
      currency: "eur",
      locale: "de",
      downloads: [
        { label: "Implementation Guide", url: "https://gordon365.com/api/download/cs_test_devpreview?file=guide" },
        { label: "Policy Json", url: "https://gordon365.com/api/download/cs_test_devpreview?file=json" },
      ],
      invoiceNumber,
      invoicePdf,
    });

    return NextResponse.json({ ok: true, invoiceNumber, sentTo: TEST_RECIPIENT });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
