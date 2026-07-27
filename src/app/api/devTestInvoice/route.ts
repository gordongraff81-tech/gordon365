import { NextResponse } from "next/server";
import { generateInvoicePdf } from "@/lib/InvoiceDocument";
import { nextInvoiceNumber } from "@/lib/InvoiceNumber";

export const runtime = "nodejs";

// Temporary route, only for local testing. Visit /api/devTestInvoice in the
// browser while npm run dev is running, the PDF opens directly in the tab.
// Delete this whole folder before deploying.

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  const invoiceNumber = await nextInvoiceNumber();
  const pdf = await generateInvoicePdf({
    invoiceNumber,
    invoiceDate: new Date(),
    customerName: "Maria Testkundin",
    customerEmail: "test@example.com",
    customerAddress: "Musterstraße 1, 10115 Berlin",
    productName: "Conditional Access Hardening Pack",
    amountCents: 14900,
    stripeSessionId: "cs_test_devpreview",
  });

  return new NextResponse(new Uint8Array(pdf), {
  headers: {
    "Content-Type": "application/pdf",
    "Content-Disposition": `inline; filename="${invoiceNumber}.pdf"`,
  },
});
}
