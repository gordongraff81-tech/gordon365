import { MetadataRoute } from "next";

// Canonical base: non-www, https only.
// Vercel should redirect www -> non-www (see vercel.json redirects).
const BASE_URL = "https://gordon365.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // -------------------------------------------------------
  // Main pages: /en (default) and /de
  // We do NOT include the bare root "/" here because the
  // middleware serves /en at / — the canonical for that
  // content is /en. Including both would create a duplicate.
  // -------------------------------------------------------
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          de: `${BASE_URL}/de`,
          "x-default": `${BASE_URL}/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/de`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          de: `${BASE_URL}/de`,
          "x-default": `${BASE_URL}/en`,
        },
      },
    },
  ];

  // -------------------------------------------------------
  // Assessment page (indexable, bilingual)
  // -------------------------------------------------------
  const assessmentPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/en/assessment`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/assessment`,
          de: `${BASE_URL}/de/assessment`,
          "x-default": `${BASE_URL}/en/assessment`,
        },
      },
    },
    {
      url: `${BASE_URL}/de/assessment`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/assessment`,
          de: `${BASE_URL}/de/assessment`,
          "x-default": `${BASE_URL}/en/assessment`,
        },
      },
    },
  ];

  // -------------------------------------------------------
  // Legal pages: robots noindex = excluded from sitemap.
  // Google's own guidelines: noindex pages must not appear
  // in the sitemap. Keeping them here contradicts the
  // robots directive and confuses Googlebot.
  // -------------------------------------------------------

  return [...mainPages, ...assessmentPages];
}