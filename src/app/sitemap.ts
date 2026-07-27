import type { MetadataRoute } from "next";

const BASE_URL = "https://gordon365.com";
const locales = ["de", "en"] as const;

type SitemapRoute = {
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
};

const routes: SitemapRoute[] = [
  { path: "", priority: 1.0, changeFrequency: "monthly" },
  { path: "/managed-services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/administrator-on-demand", priority: 0.9, changeFrequency: "monthly" },
  { path: "/security-audit-microsoft-365", priority: 0.9, changeFrequency: "monthly" },
  { path: "/intune", priority: 0.8, changeFrequency: "monthly" },
  { path: "/copilot", priority: 0.8, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => {
      const localizedPath = `/${locale}${path === "" ? "" : path}`;
      const localizedUrl = `${BASE_URL}${localizedPath}`;

      return {
        url: localizedUrl,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${path === "" ? "" : path}`,
            de: `${BASE_URL}/de${path === "" ? "" : path}`,
            "x-default": `${BASE_URL}/en${path === "" ? "" : path}`,
          },
        },
      };
    })
  );
}