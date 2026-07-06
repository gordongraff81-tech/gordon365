import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendOrderConfirmation, sendTemplateOrderConfirmation } from '@/lib/mailer';
import { getProductById, getCurrentVersion } from '@/lib/products';
import { isNewStripeEvent } from '@/lib/webhookIdempotency';
import { generateInvoicePdf } from '@/lib/InvoiceDocument';
import { nextInvoiceNumber } from '@/lib/InvoiceNumber';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
});

function formatCustomerAddress(address?: Stripe.Address | null): string | undefined {
  if (!address) return undefined;
  const parts = [
    address.line1,
    address.line2,
    `${address.postal_code ?? ''} ${address.city ?? ''}`.trim(),
    address.country,
  ].filter(Boolean);
  return parts.length ? parts.join(', ') : undefined;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('❌ Webhook signature error:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Stripe retries undelivered webhooks with the same event id, this guard
  // stops a retry from sending a second confirmation mail for the same order.
  if (!(await isNewStripeEvent(event.id))) {
    console.log('↩️  Duplicate webhook event ignored:', event.id);
    return NextResponse.json({ received: true, duplicate: true });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('✅ Checkout completed:', session.id);

      const email = session.customer_email ?? session.customer_details?.email ?? undefined;

      if (session.payment_status === 'paid' && email) {
        const productId = session.metadata?.productId;
        const locale     = session.metadata?.locale ?? 'de';

        try {
          if (productId) {
            // ── Template purchase: build download links from product files ──
            const product = getProductById(productId);
            const version = product ? getCurrentVersion(product) : null;

            if (product && version) {
              const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';
              const downloads = Object.keys(version.files).map((fileKey) => ({
                label: fileKey.replace(/([A-Z])/g, ' $1').trim().replace(/^./, (c) => c.toUpperCase()),
                url:   `${baseUrl}/api/download/${session.id}?file=${fileKey}`,
              }));

              const invoiceNumber = await nextInvoiceNumber();
              const invoicePdf = await generateInvoicePdf({
                invoiceNumber,
                invoiceDate: new Date(),
                customerName: session.customer_details?.name ?? undefined,
                customerEmail: email,
                customerAddress: formatCustomerAddress(session.customer_details?.address),
                productName: product.title,
                amountCents: session.amount_total ?? 0,
                stripeSessionId: session.id,
              });

              await sendTemplateOrderConfirmation({
                customerEmail: email,
                customerName:  session.customer_details?.name ?? undefined,
                sessionId:     session.id,
                productName:   product.title,
                amountTotal:   session.amount_total ?? 0,
                currency:      session.currency ?? 'eur',
                locale,
                downloads,
                invoiceNumber,
                invoicePdf,
              });

              console.log('📧 Template-Download-Mail mit Rechnung gesendet an:', email);
            } else {
              console.error('⚠️  Produkt oder Version nicht gefunden für productId:', productId);
            }
          } else {
            // ── Generic service purchase (e.g. Intune deployment) ──
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
            const productName = lineItems.data[0]?.description ?? 'gordon365 Service';

            await sendOrderConfirmation({
              customerEmail: email,
              customerName:  session.customer_details?.name ?? undefined,
              sessionId:     session.id,
              productName,
              amountTotal:   session.amount_total ?? 0,
              currency:      session.currency ?? 'eur',
              locale,
            });

            console.log('📧 Bestätigungs-Mail gesendet an:', email);
          }
        } catch (mailErr) {
          console.error('❌ Mail-Fehler:', mailErr);
        }
      }
      break;
    }

    case 'payment_intent.succeeded': {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.log('💳 PaymentIntent succeeded:', pi.id);
      break;
    }

    case 'payment_intent.payment_failed': {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.log('❌ PaymentIntent failed:', pi.id);
      break;
    }

    default:
      console.log('ℹ️  Unhandled event:', event.type);
  }

  return NextResponse.json({ received: true });
}
