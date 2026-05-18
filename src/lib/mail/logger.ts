// ─────────────────────────────────────────────────────────────────────────────
// src/lib/mail/logger.ts
// Strukturiertes JSON-Logging für alle Mail-Ereignisse
// ─────────────────────────────────────────────────────────────────────────────

import type { MailLogEntry, MailType, Locale } from "./types";

function now(): string {
  return new Date().toISOString();
}

function normalizeError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Unbekannter Fehler";
}

function emit(entry: MailLogEntry): void {
  process.stdout.write(JSON.stringify(entry) + "\n");
}

export function logMailSuccess(params: {
  mailType: MailType;
  locale: Locale;
  recipient: string;
  messageId: string;
}): void {
  emit({
    timestamp: now(),
    mailType: params.mailType,
    locale: params.locale,
    recipient: params.recipient,
    success: true,
    messageId: params.messageId,
  });
}

export function logMailFailure(params: {
  mailType: MailType;
  locale: Locale;
  recipient: string;
  error: unknown;
}): void {
  emit({
    timestamp: now(),
    mailType: params.mailType,
    locale: params.locale,
    recipient: params.recipient,
    success: false,
    error: normalizeError(params.error),
  });
}
