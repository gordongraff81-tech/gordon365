export const runtime = "edge";
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "sonner";
import "@/app/globals.css";
import {
  buildAlternates,
  buildOgLocale,
  buildUrl,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/lib/seo";
import type { SiteLocale } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const l = locale as SiteLocale;
  const canonicalUrl = buildUrl(l);

  return {
    title: { absolute: t("title") },
    description: t("description"),
    metadataBase: new URL("https://gordon365.com"),
    alternates: buildAlternates(l),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalUrl,
      siteName: "Gordon365",
      locale: buildOgLocale(l),
      type: "website",
      images: [
        {
          url: "https://gordon365.com/og/og-image.png",
          width: 1200,
          height: 630,
          alt: t("ogTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["https://gordon365.com/og/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1 },
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/favicon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/favicon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        {
          url: "/icons/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
      shortcut: "/favicon.svg",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "de")) {
    notFound();
  }

  const messages = await getMessages();
  const schemas = [buildOrganizationSchema(), buildWebSiteSchema()];

  return (
    <NextIntlClientProvider messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#F5F5F7",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#F0F4FF",
          },
        }}
      />
    </NextIntlClientProvider>
  );
}
