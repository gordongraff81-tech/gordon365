// ─────────────────────────────────────────────────────────────────────────────
// src/lib/mail/utils.ts
// HTML-Escaping für sichere Mail-Templates
// ─────────────────────────────────────────────────────────────────────────────

const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;",
};

/**
 * Escaped alle HTML-Sonderzeichen in user-provided Strings.
 * Muss auf ALLE Nutzereingaben angewendet werden, bevor sie in
 * ein HTML-Template eingefügt werden – verhindert HTML-Injection.
 */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"'`]/g, (char) => HTML_ESCAPE_MAP[char] ?? char);
}

/**
 * Escaped alle relevanten Felder eines Payloads auf einmal.
 * Gibt ein neues Objekt zurück – das Original wird nicht mutiert.
 */
export function escapePayload(payload: {
  name: string;
  company: string;
  challenge?: string;
}): { name: string; company: string; challenge: string } {
  return {
    name: escapeHtml(payload.name),
    company: escapeHtml(payload.company),
    challenge: escapeHtml(payload.challenge ?? ""),
  };
}
