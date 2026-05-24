import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gordon365.com";
  const locales = ["en", "de"];
  const now = new Date();

  // Hauptseiten pro Locale
  const homePages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 1.0 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l === "de" ? "de-DE" : "en-US", `${baseUrl}/${l}`])
      ),
    },
  }));

  // Unterseiten pro Locale
  const subPages = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}/assessment`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l === "de" ? "de-DE" : "en-US", `${baseUrl}/${l}/assessment`])
        ),
      },
    },
    {
      url: `${baseUrl}/${locale}/impressum`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/${locale}/datenschutz`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/${locale}/agb`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ]);

  // Wichtige Anchor-Sektionen als eigenständige URLs (für interne Verlinkung & SEO-Signale)
  const anchorSections = [
    { id: "intune-platform", priority: 0.8 },
    { id: "services",        priority: 0.75 },
    { id: "security-checker", priority: 0.7 },
    { id: "results",         priority: 0.65 },
    { id: "contact",         priority: 0.6 },
  ];

  const anchorPages = locales.flatMap((locale) =>
    anchorSections.map(({ id, priority }) => ({
      url: `${baseUrl}/${locale}#${id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    }))
  );

  return [...homePages, ...subPages, ...anchorPages];
}
