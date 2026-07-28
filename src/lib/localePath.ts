/**
 * Baut einen internen Link für ein bestimmtes Gebietsschema.
 * Deutsch ist Standardsprache und bleibt unpräfixiert ("/pfad"),
 * Englisch wird stets mit "/en" präfixiert ("/en/pfad").
 *
 * @example
 * localeHref("de", "intune")   // -> "/intune"
 * localeHref("en", "intune")   // -> "/en/intune"
 * localeHref("de")             // -> "/"
 * localeHref("en")             // -> "/en"
 */
export function localeHref(locale: string, path: string = ""): string {
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "");
  const suffix = clean ? `/${clean}` : "";
  return locale === "en" ? `/en${suffix}` : suffix || "/";
}

/**
 * Wandelt den aktuellen Pfad (mit oder ohne "/en"-Präfix) in den
 * entsprechenden Pfad für targetLocale um. Für den Sprachumschalter.
 *
 * @example
 * switchLocalePath("/intune", "en")     // -> "/en/intune"
 * switchLocalePath("/en/intune", "de")  // -> "/intune"
 */
export function switchLocalePath(pathname: string, targetLocale: string): string {
  const withoutEnPrefix = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return localeHref(targetLocale, withoutEnPrefix);
}
