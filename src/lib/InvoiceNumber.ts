import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL!,
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN!,
});

/**
 * Produces a sequential, year scoped invoice number such as RE20260001.
 * Uses the same Redis store already used for webhook idempotency, so no
 * relational database is introduced for this either.
 */
export async function nextInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const counter = await redis.incr(`invoice_counter:${year}`);
  return `RE${year}${String(counter).padStart(4, "0")}`;
}
