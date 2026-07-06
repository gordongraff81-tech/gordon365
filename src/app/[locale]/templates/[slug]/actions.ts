"use server";

import { redirect } from "next/navigation";
import { stripe, assertStripeConfigured } from "@/lib/stripe";
import { getProductById } from "@/lib/products";

export async function createCheckout(formData: FormData) {
  assertStripeConfigured();

  const productId = formData.get("productId") as string;
  const locale = formData.get("locale") as string;

  if (!productId || !locale) {
    throw new Error("Missing productId or locale");
  }

  const product = getProductById(productId);
  if (!product) {
    throw new Error(`Product not found: ${productId}`);
  }

  if (!product.stripePriceId) {
    throw new Error(
      `Stripe Price ID not configured for product: ${productId}. ` +
        "Set stripePriceId in products/${productId}/product.json after creating the price in Stripe Dashboard."
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "https://gordon365.com";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: product.stripePriceId, quantity: 1 }],
    success_url: `${baseUrl}/${locale}/templates/success?session_id={CHECKOUT_SESSION_ID}&product=${productId}`,
    cancel_url: `${baseUrl}/${locale}/templates/${productId}`,
    metadata: {
      productId,
      locale,
    },
    payment_intent_data: {
      metadata: {
        productId,
        locale,
      },
    },
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  redirect(session.url);
}
