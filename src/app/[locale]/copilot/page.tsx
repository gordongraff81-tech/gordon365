import NavV2 from "@/components/ui/NavV2";
import Copilot from "@/components/sections/Copilot";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import AmbientBg from "@/components/ui/AmbientBg";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === "de";
  const baseUrl = "https://gordon365.com";
  const slug = "copilot";

  return {
    title: isDE
      ? "Microsoft Copilot Readiness — Gordon365"
      : "Microsoft Copilot Readiness — Gordon365",
    description: isDE
      ? "Datenbasis aufbauen, Governance bereinigen und Sensitivity Labels deployen — damit Microsoft Copilot sicher und compliant läuft."
      : "Build the data foundation, clean up governance and deploy sensitivity labels — so Microsoft Copilot runs securely and compliantly.",
    alternates: {
      canonical: `${baseUrl}/${locale}/${slug}`,
      languages: {
        en: `${baseUrl}/en/${slug}`,
        de: `${baseUrl}/de/${slug}`,
        "x-default": `${baseUrl}/en/${slug}`,
      },
    },
    openGraph: {
      title: "Microsoft Copilot Readiness — Gordon365",
      url: `${baseUrl}/${locale}/${slug}`,
      siteName: "Gordon365",
      locale: isDE ? "de_DE" : "en_US",
      type: "website",
    },
  };
}

export default async function CopilotPage({
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
        <Copilot />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
