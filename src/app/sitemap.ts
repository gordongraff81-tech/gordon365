import type { MetadataRoute } from "next";

const BASE_URL = "https://gordon365.com";

type SitemapRoute = {
  path: string;
  priority: number;
};

const routes: SitemapRoute[] = [
  { path: "", priority: 1.0 },
  { path: "/managed-services", priority: 0.9 },
  { path: "/administrator-on-demand", priority: 0.9 },
  { path: "/security-audit-microsoft-365", priority: 0.9 },
  { path: "/intune", priority: 0.8 },
  { path: "/entra-id", priority: 0.8 },
  { path: "/copilot", priority: 0.8 },
  { path: "/assessment", priority: 0.8 },
];

// Deutsch (Standard) ist unpräfixiert, Englisch trägt das /en-Präfix.
function urlFor(locale: "de" | "en", path: string): string {
  const prefix = locale === "en" ? "/en" : "";
  return `${BASE_URL}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.flatMap(({ path, priority }) =>
    (["de", "en"] as const).map((locale) => ({
      url: urlFor(locale, path),
      lastModified: now,
      priority,
      alternates: {
        languages: {
          "de-DE": urlFor("de", path),
          "en-US": urlFor("en", path),
          "x-default": urlFor("de", path),
        },
      },
    }))
  );
}
