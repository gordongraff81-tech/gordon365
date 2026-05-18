// ─────────────────────────────────────────────────────────────────────────────
// src/lib/mail/templates/index.ts
// Template Registry – zentrale Lookup-Tabelle für alle Mail-Templates
// ─────────────────────────────────────────────────────────────────────────────

import type { LocalizedTemplateRegistry } from "../types";
import { customerStrategyDe } from "./customerStrategy.de";
import { customerStrategyEn } from "./customerStrategy.en";
import { internalLeadNotification } from "./internalLeadNotification";

/**
 * Registry für lokalisierte Kunden-Bestätigungsmails.
 * Neues Locale hinzufügen: Template-Datei erstellen + hier eintragen.
 */
export const customerTemplates: LocalizedTemplateRegistry = {
  de: customerStrategyDe,
  en: customerStrategyEn,
};

/**
 * Interne Lead-Benachrichtigung (keine Lokalisierung erforderlich).
 */
export { internalLeadNotification };
