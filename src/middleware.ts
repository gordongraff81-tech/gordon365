import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // 1. Matcher für die Root-URL "/"
    "/", 
    // 2. Matcher für alle Pfade, die mit de oder en beginnen
    "/(de|en)/:path*",
    // 3. Optional: Catch-all für Pfade ohne Locale, aber ohne statische Dateien
    "/((?!api|_next|_vercel|.*\\..*).*)"
  ]
};