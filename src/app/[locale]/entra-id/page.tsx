import NavV2 from "@/components/ui/NavV2";
import EntraId from "@/components/sections/EntraId";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import AmbientBg from "@/components/ui/AmbientBg";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import type { SiteLocale } from "@/lib/seo";

const SLUG = "entra-id";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "entraId" });
  return buildPageMetadata({
    locale: locale as SiteLocale,
    slug: SLUG,
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default async function EntraIdPage({
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
        <EntraId />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
