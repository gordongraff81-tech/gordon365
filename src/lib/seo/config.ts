export const SEO_CONFIG = {
  baseUrl: "https://gordon365.com",
  siteName: "Gordon365",
  defaultLocale: "de",
  locales: ["de", "en"] as const,
  localePrefix: { de: "", en: "/en" },
  ogImage: "/og/og-image.png",
} as const;

export type SiteLocale = "de" | "en";
