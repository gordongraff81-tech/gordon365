import type { MetadataRoute } from "next";
import { buildUrl } from "@/lib/seo";
import { getAllProducts } from "@/lib/products";

const INDEXABLE_ROUTES = [
  { slug: "",                              priority: 1.0, freq: "weekly"  },
  { slug: "managed-services",              priority: 0.9, freq: "monthly" },
  { slug: "administrator-on-demand",       priority: 0.9, freq: "monthly" },
  { slug: "security-audit-microsoft-365", priority: 0.9, freq: "monthly" },
  { slug: "intune",                        priority: 0.8, freq: "monthly" },
  { slug: "entra-id",                      priority: 0.8, freq: "monthly" },
  { slug: "copilot",                       priority: 0.8, freq: "monthly" },
  { slug: "assessment",                    priority: 0.8, freq: "monthly" },
  { slug: "security",                      priority: 0.7, freq: "monthly" },
  { slug: "templates",                     priority: 0.7, freq: "monthly" },
] as const;

// Bewusst NICHT indexierbar (noindex korrekt gesetzt):
// agb, datenschutz, impressum, success, cancel

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of INDEXABLE_ROUTES) {
    for (const locale of ["de", "en"] as const) {
      entries.push({
        url: buildUrl(locale, route.slug || undefined),
        lastModified: now,
        changeFrequency: route.freq as MetadataRoute.Sitemap[0]["changeFrequency"],
        priority: locale === "de" ? route.priority : route.priority - 0.1,
        alternates: {
          languages: {
            "de-DE": buildUrl("de", route.slug || undefined),
            "en-US": buildUrl("en", route.slug || undefined),
            "x-default": buildUrl("de", route.slug || undefined),
          },
        },
      });
    }
  }

  try {
    const products = getAllProducts();
    for (const product of products) {
      const slug = `templates/${product.id}`;
      for (const locale of ["de", "en"] as const) {
        entries.push({
          url: buildUrl(locale, slug),
          lastModified: now,
          changeFrequency: "monthly",
          priority: locale === "de" ? 0.6 : 0.5,
          alternates: {
            languages: {
              "de-DE": buildUrl("de", slug),
              "en-US": buildUrl("en", slug),
              "x-default": buildUrl("de", slug),
            },
          },
        });
      }
    }
  } catch {
    // getAllProducts nicht verfügbar beim statischen Build
  }

  return entries;
}
