export const runtime = "nodejs";

import { Suspense } from "react";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import NavV2 from "@/components/ui/NavV2";
import Footer from "@/components/sections/Footer";
import AmbientBg from "@/components/ui/AmbientBg";
import Link from "next/link";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

const COPY = {
  de: {
    badge:    "Zahlung erfolgreich",
    title:    "Vielen Dank für deinen Kauf!",
    sub:      "Deine Bestellung ist eingegangen. Du erhältst in Kürze eine Bestätigung per E-Mail.",
    order:    "Bestellnummer",
    amount:   "Betrag",
    back:     "Zurück zur Startseite",
    support:  "Fragen? Schreib uns an",
  },
  en: {
    badge:    "Payment successful",
    title:    "Thank you for your purchase!",
    sub:      "Your order has been received. You will shortly receive a confirmation by email.",
    order:    "Order ID",
    amount:   "Amount",
    back:     "Back to home",
    support:  "Questions? Contact us at",
  },
} as const;

async function SuccessContent({
  sessionId,
  locale,
}: {
  sessionId: string;
  locale: string;
}) {
  const t = COPY[locale === "de" ? "de" : "en"];

  let session: Stripe.Checkout.Session | null = null;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    redirect(`/${locale}`);
  }

  if (!session || session.payment_status !== "paid") {
    redirect(`/${locale}`);
  }

  const amountFormatted = session.amount_total
    ? new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-GB", {
        style: "currency",
        currency: session.currency?.toUpperCase() ?? "EUR",
      }).format(session.amount_total / 100)
    : null;

  const A1 = "#5E5CE6";
  const A2 = "#22d3ee";

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full text-center space-y-8">

        {/* Icon */}
        <div className="relative mx-auto w-20 h-20">
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{ background: `radial-gradient(circle, ${A1}20 0%, transparent 70%)` }}
          />
          <div
            className="relative w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${A1}18 0%, ${A2}10 100%)`,
              border: `1.5px solid ${A1}40`,
              boxShadow: `0 0 32px ${A1}30`,
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke={A1} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
        </div>

        {/* Badge */}
        <span
          className="inline-flex items-center gap-1.5 text-[0.75rem] font-bold px-3 py-1 rounded-full"
          style={{ background: `${A1}12`, border: `1px solid ${A1}28`, color: A1 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {t.badge}
        </span>

        {/* Headline */}
        <div className="space-y-3">
          <h1
            className="font-display font-bold text-[2rem] tracking-[-0.04em] leading-tight"
            style={{ color: "#f1f5f9" }}
          >
            {t.title}
          </h1>
          <p className="text-[1rem] leading-relaxed" style={{ color: "rgba(148,163,184,0.8)" }}>
            {t.sub}
          </p>
        </div>

        {/* Order details */}
        <div
          className="rounded-2xl p-5 text-left space-y-3"
          style={{
            background: "linear-gradient(135deg, rgba(8,8,20,0.97) 0%, rgba(12,8,28,0.97) 100%)",
            border: `1px solid ${A1}18`,
            boxShadow: `0 0 0 1px ${A1}0C, inset 0 1px 0 rgba(255,255,255,0.04)`,
          }}
        >
          {session.customer_email && (
            <div className="flex justify-between items-center text-[0.875rem]">
              <span style={{ color: "rgba(100,116,139,0.7)" }}>E-Mail</span>
              <span className="font-medium" style={{ color: "#f1f5f9" }}>
                {session.customer_email}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center text-[0.875rem]"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.75rem" }}>
            <span style={{ color: "rgba(100,116,139,0.7)" }}>{t.order}</span>
            <span className="font-mono text-[0.75rem]" style={{ color: "rgba(148,163,184,0.6)" }}>
              {session.id.slice(0, 24)}…
            </span>
          </div>
          {amountFormatted && (
            <div className="flex justify-between items-center text-[0.875rem]"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.75rem" }}>
              <span style={{ color: "rgba(100,116,139,0.7)" }}>{t.amount}</span>
              <span
                className="font-display font-bold text-[1.125rem]"
                style={{ color: A1, textShadow: `0 0 16px ${A1}50` }}
              >
                {amountFormatted}
              </span>
            </div>
          )}
        </div>

        {/* Support */}
        <p className="text-[0.8125rem]" style={{ color: "rgba(100,116,139,0.6)" }}>
          {t.support}{" "}
          <a
            href="mailto:gordon@gordon365.com"
            className="underline underline-offset-2 transition-colors"
            style={{ color: A1 }}
          >
            gordon@gordon365.com
          </a>
        </p>

        {/* CTA */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[0.9375rem] transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
          style={{
            background: `linear-gradient(135deg, ${A1} 0%, ${A2} 100%)`,
            color: "#fff",
            boxShadow: `0 0 24px ${A1}40`,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          {t.back}
        </Link>

      </div>
    </main>
  );
}

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { locale } = await params;
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect(`/${locale}`);
  }

  return (
    <>
      <AmbientBg />
      <NavV2 locale={locale} />
      <Suspense fallback={
        <main className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#5E5CE6] border-t-transparent animate-spin" />
        </main>
      }>
        <SuccessContent sessionId={session_id} locale={locale} />
      </Suspense>
      <Footer locale={locale} />
    </>
  );
}
