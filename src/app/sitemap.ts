import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gordon365.com";
  const locales = ["en", "de"];
  const now = new Date();

  return locales.map((locale) => ({
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
}
