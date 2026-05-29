export const runtime = "edge";
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "sonner";
import "@/app/globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const baseUrl = "https://gordon365.com";
  const localeUrl = `${baseUrl}/${locale}`;

  return {
    title: t("title"),
    description: t("description"),

    metadataBase: new URL(baseUrl),

    alternates: {
      canonical: localeUrl,
      languages: {
        en: `${baseUrl}/en`,
        de: `${baseUrl}/de`,
        "x-default": `${baseUrl}/en`,
      },
    },

    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: localeUrl,
      siteName: "Gordon365",
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og/og-image.png`,
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
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
      },
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

    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Gordon365",
        url: baseUrl,
        description: t("description"),
        address: { "@type": "PostalAddress", addressCountry: "DE" },
        areaServed: ["DE", "AT", "CH"],
        serviceType: [
          "Microsoft 365 Consulting",
          "M365 Security Hardening",
          "Copilot Readiness",
          "Modern Workplace Transformation",
          "Microsoft Licensing Optimization",
          "Intune Deployment",
          "Windows Autopilot",
          "Endpoint Compliance Management",
        ],
        priceRange: "€€€",
      }),
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

  return (
    <NextIntlClientProvider messages={messages}>
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