import { buildUrl } from "@/lib/seo";
import type { SiteLocale } from "@/lib/seo";

/**
 * Gibt den lokalisierten Pfad fuer interne Navigation zurueck.
 * Nutzt dieselbe URL-Engine wie die zentrale SEO Architektur.
 *
 * @example
 * localeHref("de", "intune")   // -> "/intune"
 * localeHref("en", "intune")   // -> "/en/intune"
 * localeHref("de")             // -> "/"
 * localeHref("en")             // -> "/en"
 */
export function localeHref(locale: string, path: string = ""): string {
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "");
  const absUrl = buildUrl(locale as SiteLocale, clean || undefined);
  return new URL(absUrl).pathname;
}

/**
 * Wandelt den aktuellen Pfad in den entsprechenden Pfad fuer targetLocale um.
 * Fuer den Sprachumschalter in NavV2.
 */
export function switchLocalePath(
  pathname: string,
  targetLocale: string
): string {
  const withoutEnPrefix = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return localeHref(targetLocale, withoutEnPrefix);
}
