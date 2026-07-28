import NavV2 from "@/components/ui/NavV2";
import SecurityAudit from "@/components/sections/SecurityAudit";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import AmbientBg from "@/components/ui/AmbientBg";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "audit" });
  const baseUrl = "https://gordon365.com";
  const slug = "security-audit-microsoft-365";
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${baseUrl}${locale === "de" ? "" : "/en"}/${slug}`,
      languages: {
        "de-DE": `${baseUrl}/${slug}`,
        "en-US": `${baseUrl}/en/${slug}`,
        "x-default": `${baseUrl}/${slug}`,
      },
    },
  };
}

export default async function SecurityAuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <AmbientBg />
      <NavV2 locale={locale} />
      <main>
        <SecurityAudit />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
