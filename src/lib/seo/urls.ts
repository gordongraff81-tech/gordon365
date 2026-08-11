import { SEO_CONFIG, type SiteLocale } from "./config";

export function buildUrl(locale: SiteLocale, slug?: string): string {
  const prefix = SEO_CONFIG.localePrefix[locale];
  if (!slug) {
    return prefix ? `${SEO_CONFIG.baseUrl}${prefix}` : `${SEO_CONFIG.baseUrl}/`;
  }
  return `${SEO_CONFIG.baseUrl}${prefix}/${slug}`;
}

export function buildLanguages(slug?: string) {
  return {
    "de-DE": buildUrl("de", slug),
    "en-US": buildUrl("en", slug),
    "x-default": buildUrl("de", slug),
  };
}

export function buildAlternates(locale: SiteLocale, slug?: string) {
  return {
    canonical: buildUrl(locale, slug),
    languages: buildLanguages(slug),
  };
}

export function buildOgLocale(locale: SiteLocale): string {
  return locale === "de" ? "de_DE" : "en_US";
}
