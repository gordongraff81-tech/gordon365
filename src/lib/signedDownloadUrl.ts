import crypto from "crypto";

// Reference pattern only. Compare against whatever already exists in the
// download route. If a signed URL mechanism is already in place, the only
// thing worth checking is whether it has an expiry, not just a session check.

const SECRET = process.env.DOWNLOAD_LINK_SECRET!;
const DEFAULT_EXPIRY_SECONDS = 60 * 60 * 24; // 24 hours

export function createSignedDownloadUrl(
  productId: string,
  stripeSessionId: string,
  expiresInSeconds: number = DEFAULT_EXPIRY_SECONDS
): string {
  const expires = Date.now() + expiresInSeconds * 1000;
  const payload = `${productId}:${stripeSessionId}:${expires}`;
  const signature = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");

  return `/api/download?product=${encodeURIComponent(productId)}&session=${encodeURIComponent(
    stripeSessionId
  )}&expires=${expires}&sig=${signature}`;
}

export function verifySignedDownloadUrl(
  productId: string,
  stripeSessionId: string,
  expires: string,
  signature: string
): boolean {
  if (Date.now() > Number(expires)) return false;

  const payload = `${productId}:${stripeSessionId}:${expires}`;
  const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");

  const provided = Buffer.from(signature);
  const reference = Buffer.from(expected);
  if (provided.length !== reference.length) return false;

  return crypto.timingSafeEqual(provided, reference);
}
