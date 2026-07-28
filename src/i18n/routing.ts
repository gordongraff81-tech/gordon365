import { defineRouting } from "next-intl/routing";

// Deutsch ist Standardsprache und bleibt unpräfixiert (/intune),
// Englisch wird stets mit /en präfixiert (/en/intune).
export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "as-needed"
});