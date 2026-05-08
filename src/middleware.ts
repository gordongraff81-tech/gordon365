import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/(de|en)/:path*",
    "/((?!_next|api|favicon.ico|icons|fonts|og|robots.txt|sitemap.xml).*)"
  ]
};