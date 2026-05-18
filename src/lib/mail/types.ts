// ─────────────────────────────────────────────────────────────────────────────
// src/lib/mail/types.ts
// Zentrale Typdefinitionen für das Mail-System
// ─────────────────────────────────────────────────────────────────────────────

export type Locale = "de" | "en";

export type MailType = "customerConfirmation" | "internalLeadNotification";

// ─── Payload ─────────────────────────────────────────────────────────────────

export interface StrategyRequestPayload {
  name: string;
  email: string;
  company: string;
  size?: string;
  budget?: string;
  challenge?: string;
  locale: Locale;
}

// ─── Template ────────────────────────────────────────────────────────────────

export interface MailTemplateResult {
  subject: string;
  html: string;
  text: string;
}

export type MailTemplateFactory = (
  payload: StrategyRequestPayload
) => MailTemplateResult;

// ─── Template Registry ───────────────────────────────────────────────────────

export type LocalizedTemplateRegistry = Record<Locale, MailTemplateFactory>;

// ─── Log Entry ───────────────────────────────────────────────────────────────

export interface MailLogEntry {
  timestamp: string;
  mailType: MailType;
  locale: Locale;
  recipient: string;
  success: boolean;
  messageId?: string;
  error?: string;
}

// ─── Mail Service Result ─────────────────────────────────────────────────────

export interface MailServiceResult {
  success: boolean;
  messageId?: string;
  error?: string;
}
