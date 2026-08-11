import type { Metadata } from "next";
import { SEO_CONFIG, type SiteLocale } from "./config";
import { buildUrl, buildAlternates, buildOgLocale } from "./urls";

interface PageMetaOptions {
  locale: SiteLocale;
  slug?: string;
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
  keywords?: string[];
}

export function buildPageMetadata({
  locale,
  slug,
  title,
  description,
  ogImage,
  noindex = false,
  keywords,
}: PageMetaOptions): Metadata {
  const url = buildUrl(locale, slug);
  const image = ogImage ?? SEO_CONFIG.ogImage;

  return {
    title: { absolute: title },
    description,
    ...(keywords ? { keywords } : {}),
    alternates: buildAlternates(locale, slug),
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1 } },
    openGraph: {
      title,
      description,
      url,
      siteName: SEO_CONFIG.siteName,
      locale: buildOgLocale(locale),
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
