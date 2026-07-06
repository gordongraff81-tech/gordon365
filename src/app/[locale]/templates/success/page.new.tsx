export const runtime = "nodejs";

import Image from "next/image";
// Adjust these two import paths to match the actual locations in the project.
import { stripe } from "@/lib/stripe";
import { createSignedDownloadUrl } from "@/lib/signedDownloadUrl";

// Place at src/app/[locale]/templates/success/page.tsx
// Expects the Stripe Checkout success_url to include ?session_id={CHECKOUT_SESSION_ID}
// Place the logo at public/brand/gordon-logo.png (use GordonLogo.png from the brand kit).

interface SuccessPageProps {
  searchParams: { session_id?: string };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <p className="text-sm text-slate-500">Keine gültige Bestellung gefunden.</p>
      </main>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  const productName = session.line_items?.data[0]?.description ?? "Dein Template";
  const amountFormatted = ((session.amount_total ?? 0) / 100).toLocaleString("de DE", {
    style: "currency",
    currency: "EUR",
  });
  const productId = session.metadata?.productId ?? "";
  const downloadUrl = createSignedDownloadUrl(productId, sessionId);

  return (
    <main className="min-h-screen bg-white">
      <div className="h-1.5 w-full bg-gradient-to-r from-[#0DE4FD] to-[#043CD9]" />

      <div className="mx-auto max-w-xl px-6 py-20 text-center">
        <Image
          src="/brand/gordon-logo.png"
          alt="Gordon365"
          width={170}
          height={45}
          priority
          className="mx-auto mb-12 h-9 w-auto"
        />

        <h1 className="text-2xl font-semibold text-[#0B1B35]">Danke für deinen Kauf</h1>
        <p className="mt-3 text-sm text-slate-500">
          {productName} steht jetzt für dich zum Download bereit. Die Rechnung haben wir dir
          zusätzlich per E Mail geschickt.
        </p>

        <div className="mt-10 rounded-lg border border-slate-200 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <span className="text-sm text-slate-500">Bestellung</span>
            <span className="text-sm font-semibold text-[#0B1B35]">{productName}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-sm text-slate-500">Betrag</span>
            <span className="text-sm font-semibold text-[#0B1B35]">{amountFormatted}</span>
          </div>
        </div>

        <a
          href={downloadUrl}
          className="mt-10 inline-block rounded-md bg-[#0B1B35] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#16284d]"
        >
          Jetzt herunterladen
        </a>

        <p className="mt-8 text-xs text-slate-400">
          Der Downloadlink ist 24 Stunden gültig. Fragen? info@gordon365.com
        </p>
      </div>
    </main>
  );
}
