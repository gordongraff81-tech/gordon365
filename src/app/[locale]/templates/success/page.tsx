export const runtime = "nodejs";

import { Suspense } from "react";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import NavV2 from "@/components/ui/NavV2";
import Footer from "@/components/sections/Footer";
import AmbientBg from "@/components/ui/AmbientBg";
import Link from "next/link";
import { localeHref } from "@/lib/localePath";
import { getProductById, getCurrentVersion, formatPrice } from "@/lib/products";

const COPY = {
  de: {
    badge:    "Zahlung erfolgreich",
    title:    "Deine Dateien sind bereit!",
    sub:      "Vielen Dank für deinen Kauf. Du kannst alle Dateien direkt unten herunterladen.",
    files:    "Enthaltene Dateien",
    download: "Herunterladen",
    note:     "Diese Links sind dauerhaft gültig und an deinen Kauf gebunden — du kannst jederzeit erneut herunterladen. Eine Kopie wurde dir zusätzlich per E-Mail zugeschickt.",
    order:    "Bestellnummer",
    amount:   "Betrag",
    back:     "Zurück zu allen Templates",
    support:  "Fragen? Schreib uns an",
  },
  en: {
    badge:    "Payment successful",
    title:    "Your files are ready!",
    sub:      "Thank you for your purchase. You can download all files directly below.",
    files:    "Included files",
    download: "Download",
    note:     "These links remain valid permanently and are tied to your purchase — you can download again at any time. A copy has also been sent to you by email.",
    order:    "Order ID",
    amount:   "Amount",
    back:     "Back to all templates",
    support:  "Questions? Contact us at",
  },
} as const;

async function SuccessContent({
  sessionId,
  productId,
  locale,
}: {
  sessionId: string;
  productId: string | undefined;
  locale: string;
}) {
  const t = COPY[locale === "de" ? "de" : "en"];

  // Initialize Stripe at runtime (not during build)
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-05-27.dahlia',
  });

  let session: Stripe.Checkout.Session | null = null;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    redirect(localeHref(locale, "templates"));
  }

  if (!session || session.payment_status !== "paid") {
    redirect(localeHref(locale, "templates"));
  }

  const resolvedProductId = productId ?? session.metadata?.productId;
  const product = resolvedProductId ? getProductById(resolvedProductId) : null;
  const version = product ? getCurrentVersion(product) : null;

  const amountFormatted = session.amount_total
    ? new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-GB", {
        style: "currency",
        currency: session.currency?.toUpperCase() ?? "EUR",
      }).format(session.amount_total / 100)
    : null;

  const accent = "#15803d";

  const downloadEntries = version
    ? Object.keys(version.files).map((fileKey) => ({
        key:   fileKey,
        label: fileKey.replace(/([A-Z])/g, " $1").trim().replace(/^./, (c) => c.toUpperCase()),
        url:   `/api/download/${sessionId}?file=${fileKey}`,
      }))
    : [];

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24 bg-bg-0">
      <div className="max-w-lg w-full space-y-8">

        {/* Icon + badge — centered */}
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-20 h-20">
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: `radial-gradient(circle, ${accent}1a 0%, transparent 70%)` }}
            />
            <div
              className="relative w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: `${accent}14`,
                border: `1.5px solid ${accent}55`,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
          </div>

          <span
            className="inline-flex items-center gap-1.5 text-[0.75rem] font-bold px-3 py-1 rounded-full"
            style={{ background: `${accent}14`, border: `1px solid ${accent}40`, color: accent }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {t.badge}
          </span>

          <h1 className="font-display font-bold text-[1.75rem] tracking-[-0.03em] leading-tight text-text-1">
            {t.title}
          </h1>
          <p className="text-[0.9375rem] leading-relaxed text-text-2">
            {t.sub}
          </p>
        </div>

        {/* Downloads — high-contrast card, theme-aware via existing tokens */}
        {downloadEntries.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-[0.6875rem] font-bold tracking-[0.08em] uppercase text-text-3 mb-4">
              {t.files}
            </p>
            <div className="space-y-2">
              {downloadEntries.map((d) => (
                <a
                  key={d.key}
                  href={d.url}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border bg-bg-0 px-4 py-3 hover:border-accent/40 transition-colors"
                >
                  <span className="text-[0.875rem] font-medium text-text-1">{d.label}</span>
                  <span
                    className="flex-shrink-0 inline-flex items-center gap-1.5 text-[0.8125rem] font-bold px-3 py-1.5 rounded-lg"
                    style={{ background: accent, color: "#ffffff" }}
                  >
                    {t.download}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                  </span>
                </a>
              ))}
            </div>
            <p className="text-[0.75rem] text-text-3 leading-relaxed mt-4">
              {t.note}
            </p>
          </div>
        )}

        {/* Order details */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
          {product && (
            <div className="flex justify-between items-center text-[0.875rem]">
              <span className="text-text-3">{locale === "de" ? "Produkt" : "Product"}</span>
              <span className="font-medium text-text-1">{product.title}</span>
            </div>
          )}
          <div
            className="flex justify-between items-center text-[0.875rem]"
            style={{ borderTop: "1px solid var(--border, #e2e8f0)", paddingTop: "0.75rem" }}
          >
            <span className="text-text-3">{t.order}</span>
            <span className="font-mono text-[0.75rem] text-text-3">
              {sessionId.slice(0, 24)}…
            </span>
          </div>
          {amountFormatted && (
            <div
              className="flex justify-between items-center text-[0.875rem]"
              style={{ borderTop: "1px solid var(--border, #e2e8f0)", paddingTop: "0.75rem" }}
            >
              <span className="text-text-3">{t.amount}</span>
              <span className="font-display font-bold text-[1.125rem]" style={{ color: accent }}>
                {amountFormatted}
              </span>
            </div>
          )}
        </div>

        {/* Support + back link */}
        <div className="text-center space-y-4">
          <p className="text-[0.8125rem] text-text-3">
            {t.support}{" "}
            <a
              href="mailto:gordon@gordon365.com"
              className="underline underline-offset-2"
              style={{ color: accent }}
            >
              gordon@gordon365.com
            </a>
          </p>

          <Link
            href={localeHref(locale, "templates")}
            className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-text-2 hover:text-text-1 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            {t.back}
          </Link>
        </div>

      </div>
    </main>
  );
}

export default async function TemplateSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string; product?: string }>;
}) {
  const { locale } = await params;
  const { session_id, product } = await searchParams;

  if (!session_id) {
    redirect(localeHref(locale, "templates"));
  }

  return (
    <>
      <AmbientBg />
      <NavV2 locale={locale} />
      <Suspense fallback={
        <main className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </main>
      }>
        <SuccessContent sessionId={session_id} productId={product} locale={locale} />
      </Suspense>
      <Footer locale={locale} />
    </>
  );
}
