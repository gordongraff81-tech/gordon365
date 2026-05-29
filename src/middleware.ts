import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  ...routing,
  localePrefix: "always",
  localeDetection: false,
  defaultLocale: "en",
});

export const config = {
  matcher: [
    "/",
    "/(de|en)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};