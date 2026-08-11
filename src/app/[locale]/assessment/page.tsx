import type { Metadata } from "next";
import AssessmentClient from "./AssessmentClient";
import { buildPageMetadata } from "@/lib/seo";
import type { SiteLocale } from "@/lib/seo";

const SLUG = "assessment";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === "de";
  return buildPageMetadata({
    locale: locale as SiteLocale,
    slug: SLUG,
    title: isDE
      ? "Microsoft 365 Security Check — Gordon365"
      : "Microsoft 365 Security Check — Gordon365",
    description: isDE
      ? "Kostenloser Microsoft 365 Sicherheitscheck: 5 Fragen, sofortige Bewertung Ihrer M365-Sicherheitslage, identifizierte Risiken und priorisierte Handlungsempfehlungen."
      : "Free Microsoft 365 security check: 5 questions, instant assessment of your M365 security posture, identified risks and prioritised recommendations.",
  });
}

export default function AssessmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <AssessmentClient params={params} />;
}
