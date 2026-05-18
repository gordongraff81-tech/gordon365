// ─────────────────────────────────────────────────────────────────────────────
// src/lib/mail/mailService.ts
// Service-Schicht – orchestriert Templates, Transport und Logging
// ─────────────────────────────────────────────────────────────────────────────

import type { StrategyRequestPayload, Locale, MailServiceResult } from "./types";
import { getTransporter } from "./transporter";
import { logMailSuccess, logMailFailure } from "./logger";
import { customerTemplates, internalLeadNotification } from "./templates/index";

const FROM_ADDRESS = '"Gordon365" <info@gordon365.com>';
const FALLBACK_LOCALE: Locale = "en";

/**
 * Sendet die Kunden-Bestätigungsmail in der korrekten Sprache.
 * Fällt auf Englisch zurück, falls das Locale unbekannt ist.
 */
export async function sendCustomerConfirmation(
  payload: StrategyRequestPayload
): Promise<MailServiceResult> {
  const locale: Locale =
    payload.locale in customerTemplates ? payload.locale : FALLBACK_LOCALE;

  const templateFactory = customerTemplates[locale];
  const { subject, html, text } = templateFactory(payload);

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: FROM_ADDRESS,
      to: payload.email,
      subject,
      html,
      text,
    });

    logMailSuccess({
      mailType: "customerConfirmation",
      locale,
      recipient: payload.email,
      messageId: info.messageId ?? "",
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    logMailFailure({
      mailType: "customerConfirmation",
      locale,
      recipient: payload.email,
      error,
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unbekannter Fehler",
    };
  }
}

/**
 * Sendet die interne Lead-Benachrichtigung an das Betreiber-Postfach.
 * replyTo wird auf die Kunden-E-Mail gesetzt für direkten Rückantwort-Komfort.
 */
export async function sendInternalLeadNotification(
  payload: StrategyRequestPayload
): Promise<MailServiceResult> {
  const notifyEmail = process.env.NOTIFY_EMAIL ?? "info@gordon365.com";
  const { subject, html, text } = internalLeadNotification(payload);

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: FROM_ADDRESS,
      to: notifyEmail,
      replyTo: payload.email,
      subject,
      html,
      text,
    });

    logMailSuccess({
      mailType: "internalLeadNotification",
      locale: payload.locale,
      recipient: notifyEmail,
      messageId: info.messageId ?? "",
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    logMailFailure({
      mailType: "internalLeadNotification",
      locale: payload.locale,
      recipient: notifyEmail,
      error,
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unbekannter Fehler",
    };
  }
}
