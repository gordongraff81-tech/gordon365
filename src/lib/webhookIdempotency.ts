import { Redis } from "@upstash/redis";

// This Vercel integration names variables after the legacy Vercel KV scheme,
// so the REST URL and token come prefixed with KV_REST_API rather than the
// plain UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN that Redis.fromEnv()
// looks for. Building the client explicitly avoids relying on that naming.
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL!,
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN!,
});

const EVENT_TTL_SECONDS = 60 * 60 * 24; // Stripe retries land well within 24 hours

/**
 * Returns true the first time an event id is seen, false on every retry.
 * Call this at the very start of the webhook handler, right after signature
 * verification, before sending the confirmation email or generating a download link.
 */
export async function isNewStripeEvent(eventId: string): Promise<boolean> {
  const key = `stripe_event:${eventId}`;
  const result = await redis.set(key, "1", { nx: true, ex: EVENT_TTL_SECONDS });
  return result === "OK";
}
