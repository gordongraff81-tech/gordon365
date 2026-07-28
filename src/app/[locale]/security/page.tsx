import { redirect } from "next/navigation";
import { localeHref } from "@/lib/localePath";

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(localeHref(locale, "security-audit-microsoft-365"));
}
