import NavV2 from "@/components/ui/NavV2";
import ManagedServices from "@/components/sections/ManagedServices";
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
  const t = await getTranslations({ locale, namespace: "managedServices" });
  const baseUrl = "https://gordon365.com";
  const slug = "managed-services";
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${baseUrl}/${locale}/${slug}`,
      languages: {
        en: `${baseUrl}/en/${slug}`,
        de: `${baseUrl}/de/${slug}`,
        "x-default": `${baseUrl}/en/${slug}`,
      },
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `${baseUrl}/${locale}/${slug}`,
      siteName: "Gordon365",
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
  };
}

export default async function ManagedServicesPage({
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
        <ManagedServices />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
