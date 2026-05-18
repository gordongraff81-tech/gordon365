// ─────────────────────────────────────────────────────────────────────────────
// src/app/api/contact/route.ts
// API Route – nur Validierung, Service-Aufruf und JSON-Response.
// Keine SMTP-Logik, kein HTML, keine Templates.
// ─────────────────────────────────────────────────────────────────────────────

import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  sendCustomerConfirmation,
  sendInternalLeadNotification,
} from "@/lib/mail/mailService";
import type { StrategyRequestPayload } from "@/lib/mail/types";

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const ContactSchema = z.object({
  name:      z.string().min(2).max(100),
  company:   z.string().min(1).max(100),
  email:     z.string().email(),
  size:      z.string().optional(),
  budget:    z.string().optional(),
  challenge: z.string().max(2000).optional(),
  locale:    z.enum(["de", "en"]).default("en"),
});

// ─── POST /api/contact ───────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Body parsen
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // 2. Validierung via Zod (inkl. Locale-Prüfung)
  const result = ContactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const payload: StrategyRequestPayload = result.data;

  // 3. Beide Mails parallel senden
  const [customerResult, internalResult] = await Promise.all([
    sendCustomerConfirmation(payload),
    sendInternalLeadNotification(payload),
  ]);

  // 4. Beide fehlgeschlagen → 502
  if (!customerResult.success && !internalResult.success) {
    return NextResponse.json(
      { error: "Mail delivery failed" },
      { status: 502 }
    );
  }

  // 5. Mindestens eine Mail erfolgreich → 200
  return NextResponse.json({ success: true }, { status: 200 });
}

// ─── GET /api/contact ────────────────────────────────────────────────────────

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
