import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
});

const PRICE_MAP: Record<string, string> = {
  hardening: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_HARDENING!,
  mfa:       process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MFA!,
  intune:    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_INTUNE!,
};

export async function POST(req: NextRequest) {
  const { service } = await req.json();

  const priceId = PRICE_MAP[service];
  if (!priceId) {
    return NextResponse.json({ error: 'Ungültiger Service' }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${baseUrl}/cancel`,
    billing_address_collection: 'required',
    customer_creation: 'always',
  });

  return NextResponse.json({ url: session.url });
}
