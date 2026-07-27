import type { MetadataRoute } from "next";

const BASE_URL = "https://gordon365.com";
const locales = ["de", "en"] as const;

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
  { path: "/copilot", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.flatMap(({ path, priority }) =>
    locales.map((locale) => {
      const localizedPath = `/${locale}${path === "" ? "" : path}`;
      const localizedUrl = `${BASE_URL}${localizedPath}`;

      return {
        url: localizedUrl,
        lastModified: now,
        priority,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${path === "" ? "" : path}`,
            de: `${BASE_URL}/de${path === "" ? "" : path}`,
            "x-default": `${BASE_URL}/de${path === "" ? "" : path}`,
          },
        },
      };
    })
  );
}