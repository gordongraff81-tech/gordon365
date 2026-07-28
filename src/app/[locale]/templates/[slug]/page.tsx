export const runtime = "nodejs";

import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getProductById,
  getProductDescription,
  getRelatedProducts,
  getCurrentVersion,
  formatPrice,
} from "@/lib/products";
import NavV2 from "@/components/ui/NavV2";
import Footer from "@/components/sections/Footer";
import AmbientBg from "@/components/ui/AmbientBg";
import Link from "next/link";
import { localeHref } from "@/lib/localePath";
import { createCheckout } from "./actions";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductById(slug);
  if (!product) return {};
  const baseUrl = "https://gordon365.com";
  return {
    title: `${product.title} — Gordon365`,
    alternates: {
      canonical: `${baseUrl}${locale === "de" ? "" : "/en"}/templates/${slug}`,
      languages: {
        "de-DE": `${baseUrl}/templates/${slug}`,
        "en-US": `${baseUrl}/en/templates/${slug}`,
        "x-default": `${baseUrl}/templates/${slug}`,
      },
    },
  };
}

const TIER_COLORS: Record<string, string> = {
  basic: "bg-bg-2 text-text-2",
  professional: "bg-accent/10 text-accent",
  msp: "bg-gold/10 text-gold",
  enterprise: "bg-amber/10 text-amber",
};

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProductById(slug);
  if (!product) notFound();

  const t = await getTranslations({ locale, namespace: "templates" });
  const description = getProductDescription(product);
  const related = getRelatedProducts(product);
  const version = getCurrentVersion(product);

  const descLines = description
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#"))
    .map((l) => l.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);

  return (
    <>
      <AmbientBg />
      <NavV2 locale={locale} />
      <main className="min-h-screen pt-32 pb-section px-4 bg-bg-0">
        <div className="max-w-4xl mx-auto">
          <Link
            href={localeHref(locale, "templates")}
            className="inline-flex items-center gap-2 text-sm text-text-2 hover:text-text-1 transition-colors mb-10"
          >
            ← {t("detail.back")}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left — content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      TIER_COLORS[product.tier] ?? "bg-bg-2 text-text-2"
                    }`}
                  >
                    {t(`overview.tier_${product.tier}` as Parameters<typeof t>[0])}
                  </span>
                  {product.ms365dscReady && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-bg-2 text-text-3">
                      {t("detail.ms365dsc")}
                    </span>
                  )}
                  {version && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-bg-2 text-text-3">
                      v{version.version}
                    </span>
                  )}
                </div>
                <h1 className="text-display-md font-display font-bold text-text-1 mb-4">
                  {product.title}
                </h1>
              </div>

              <div className="space-y-4">
                {descLines.map((line, i) => (
                  <p key={i} className="text-text-2 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>

              {version && Object.keys(version.files).length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-text-3 mb-3">
                    {t("detail.includes")}
                  </h2>
                  <ul className="space-y-2">
                    {Object.keys(version.files).map((fileKey) => (
                      <li key={fileKey} className="flex items-center gap-3 text-sm text-text-2">
                        <span className="text-accent">✓</span>
                        <span className="capitalize">{fileKey.replace(/([A-Z])/g, " $1").trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right — purchase card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 rounded-4xl border border-border bg-card shadow-card p-6 space-y-5">
                <div>
                  <p className="text-sm text-text-3 mb-1">{t("detail.buy")}</p>
                  <p className="text-4xl font-bold text-text-1">
                    {formatPrice(product.priceCents, locale)}
                  </p>
                </div>

                <div className="h-px bg-border" />

                <ul className="space-y-2 text-sm text-text-2">
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    {t("detail.download_hint")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    {t("detail.guarantee")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    {t("detail.lifetime")}
                  </li>
                </ul>

                <div className="h-px bg-border" />

                <form action={createCheckout}>
                  <input type="hidden" name="productId" value={product.id} />
                  <input type="hidden" name="locale" value={locale} />
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-2xl bg-accent hover:bg-accent-hover text-white font-semibold text-sm transition-colors shadow-glow-sm"
                  >
                    {t("detail.buy")} {formatPrice(product.priceCents, locale)} →
                  </button>
                </form>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-20">
              <div className="h-px bg-border mb-10" />
              <h2 className="text-lg font-display font-semibold text-text-1 mb-2">
                {t("detail.crosssell_title")}
              </h2>
              <p className="text-sm text-text-3 mb-6">{t("detail.crosssell_sub")}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={localeHref(locale, `templates/${rel.id}`)}
                    className="flex items-center justify-between rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-card transition-all p-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-text-1">{rel.title}</p>
                      <p className="text-xs text-text-3 mt-0.5">
                        {formatPrice(rel.priceCents, locale)}
                      </p>
                    </div>
                    <span className="text-accent text-sm">→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
