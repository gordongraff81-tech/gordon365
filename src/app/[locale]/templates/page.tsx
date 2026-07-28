export const runtime = "nodejs";

import { getTranslations } from "next-intl/server";
import { getAllProducts, getProductDescription, formatPrice } from "@/lib/products";
import NavV2 from "@/components/ui/NavV2";
import Footer from "@/components/sections/Footer";
import AmbientBg from "@/components/ui/AmbientBg";
import Link from "next/link";
import { localeHref } from "@/lib/localePath";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://gordon365.com";
  const isDE = locale === "de";
  return {
    title: isDE
      ? "Microsoft 365 Templates — Gordon365"
      : "Microsoft 365 Templates — Gordon365",
    description: isDE
      ? "Geprüfte Templates für Conditional Access, Intune, Copilot Readiness und Security Reporting. Direkt einsatzbereit."
      : "Tested templates for Conditional Access, Intune, Copilot Readiness and Security Reporting. Ready to deploy.",
    alternates: {
      canonical: `${baseUrl}${isDE ? "" : "/en"}/templates`,
      languages: {
        "de-DE": `${baseUrl}/templates`,
        "en-US": `${baseUrl}/en/templates`,
        "x-default": `${baseUrl}/templates`,
      },
    },
  };
}

const TIER_ORDER = ["basic", "professional", "msp", "enterprise"] as const;

const CATEGORY_COLORS: Record<string, string> = {
  security: "bg-accent/10 text-accent",
  intune: "bg-green/10 text-green",
  copilot: "bg-gold/10 text-gold",
  reporting: "bg-amber/10 text-amber",
};

const TIER_COLORS: Record<string, string> = {
  basic: "bg-bg-2 text-text-2",
  professional: "bg-accent/10 text-accent",
  msp: "bg-gold/10 text-gold",
  enterprise: "bg-amber/10 text-amber",
};

function getExcerpt(description: string): string {
  return description
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#"))
    .join(" ")
    .replace(/^[-*]\s*/, "")
    .slice(0, 140)
    .trim();
}

export default async function TemplatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "templates" });
  const products = getAllProducts().sort(
    (a, b) =>
      TIER_ORDER.indexOf(a.tier as typeof TIER_ORDER[number]) -
      TIER_ORDER.indexOf(b.tier as typeof TIER_ORDER[number])
  );

  return (
    <>
      <AmbientBg />
      <NavV2 locale={locale} />
      <main className="min-h-screen pt-32 pb-section px-4 bg-bg-0">
        {/* Hero */}
        <section className="max-w-4xl mx-auto text-center mb-20">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
            {t("hero.eyebrow")}
          </p>
          <h1 className="text-display-lg font-display font-bold text-text-1 mb-4">
            {t("hero.h1")}{" "}
            <span className="text-accent">{t("hero.h1b")}</span>
          </h1>
          <p className="text-lg text-text-2 max-w-2xl mx-auto mb-8">
            {t("hero.sub")}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-text-2">
            <span>✓ {t("detail.download_hint")}</span>
            <span>✓ {t("detail.guarantee")}</span>
            <span>✓ {t("detail.lifetime")}</span>
          </div>
        </section>

        {/* Product grid */}
        <section className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const description = getProductDescription(product);
              const excerpt = getExcerpt(description);
              return (
                <Link
                  key={product.id}
                  href={localeHref(locale, `templates/${product.id}`)}
                  className="group flex flex-col rounded-4xl border border-border bg-card shadow-card hover:shadow-card-hover hover:border-accent/30 transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col flex-1 p-6 gap-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                          CATEGORY_COLORS[product.category] ?? "bg-bg-2 text-text-2"
                        }`}
                      >
                        {t(`overview.filter_${product.category}` as Parameters<typeof t>[0])}
                      </span>
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                          TIER_COLORS[product.tier] ?? "bg-bg-2 text-text-2"
                        }`}
                      >
                        {t(`overview.tier_${product.tier}` as Parameters<typeof t>[0])}
                      </span>
                      {product.ms365dscReady && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-bg-2 text-text-3">
                          DSC-ready
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-display font-semibold text-text-1 leading-snug group-hover:text-accent transition-colors">
                      {product.title}
                    </h2>

                    <p className="text-sm text-text-2 leading-relaxed flex-1 line-clamp-3">
                      {excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-xl font-bold text-text-1">
                        {formatPrice(product.priceCents, locale)}
                      </span>
                      <span className="text-sm text-accent group-hover:translate-x-1 transition-transform">
                        {t("overview.buy")} →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
