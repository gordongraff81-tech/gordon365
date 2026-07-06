export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { stripe } from "@/lib/stripe";
import { getProductById, resolveProductFilePath, getCurrentVersion } from "@/lib/products";

/**
 * Phase 1 download route (no database).
 *
 * The "token" is the Stripe Checkout Session ID itself. We re-validate
 * directly against Stripe on every request:
 * - session must exist and have payment_status === "paid"
 * - session.metadata.productId must match a real product
 *
 * This avoids needing a Purchase table while still being safe: the
 * session ID is long, random, and only known to the buyer (it was only
 * ever sent via the success_url redirect and the confirmation email).
 *
 * Usage: /api/download/{sessionId}?file=guide
 * `file` corresponds to a key in the product's current version `files` map
 * (e.g. "guide", "policy", "rolloutPlan", "helpdeskFaq", ...).
 */

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const fileKey = req.nextUrl.searchParams.get("file");

  if (!fileKey) {
    return NextResponse.json(
      { error: "Missing ?file= query parameter" },
      { status: 400 }
    );
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(token);
  } catch {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 404 });
  }

  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Payment not completed" }, { status: 403 });
  }

  const productId = session.metadata?.productId;
  if (!productId) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  const product = getProductById(productId);
  if (!product) {
    return NextResponse.json({ error: "Unknown product" }, { status: 404 });
  }

  const filePath = resolveProductFilePath(product, fileKey);
  if (!filePath || !fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  const fileName = filePath.split(/[\\/]/).pop() ?? "download";

  const contentType = fileName.endsWith(".docx")
    ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    : fileName.endsWith(".json")
    ? "application/json"
    : fileName.endsWith(".md")
    ? "text/markdown"
    : "application/octet-stream";

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
