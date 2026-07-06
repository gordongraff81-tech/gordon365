import Stripe from "stripe";

/**
 * Stripe client - lazily initialized.
 *
 * Requires STRIPE_SECRET_KEY in environment variables:
 * - Local development: .env.local
 * - Production: Vercel Project Settings -> Environment Variables
 *
 * Phase 1 uses Stripe Checkout in "payment" mode (one-time purchases).
 * No subscriptions, no customer portal - that is Phase 2 territory
 * alongside Prisma/Neon/accounts.
 *
 * Lazy init avoids crashing at module-evaluation time (e.g. during
 * build or when a page merely imports this file) if the key is not
 * yet configured. The error only surfaces when a Stripe call is
 * actually attempted.
 */

let _stripe: Stripe | null = null;

function getStripeClient(): Stripe {
  if (_stripe) return _stripe;

  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error(
      "Stripe is not configured. Set STRIPE_SECRET_KEY in your environment (.env.local locally, " +
        "Vercel Project Settings -> Environment Variables in production)."
    );
  }

  _stripe = new Stripe(apiKey, {
    apiVersion: "2026-05-27.dahlia",
    typescript: true,
  });
  return _stripe;
}

/**
 * Proxy object that behaves like a Stripe instance but only actually
 * constructs the real client on first property access. This means
 * `import { stripe } from "@/lib/stripe"` is always safe - the error
 * only throws when you call e.g. stripe.checkout.sessions.create(...).
 */
export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    const client = getStripeClient();
    return Reflect.get(client, prop, receiver);
  },
});

/**
 * Throws a clear error if Stripe is not configured. Call this at the
 * start of any Server Action / route handler that uses `stripe` so
 * misconfiguration fails loudly with a clear message.
 */
export function assertStripeConfigured(): void {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      "Stripe is not configured. Set STRIPE_SECRET_KEY in your environment."
    );
  }
}
