import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

// Single Source of Truth für Locales/Prefix-Strategie (siehe src/i18n/routing.ts).
// localeDetection: false verhindert jede automatische Umleitung anhand von
// Accept-Language oder NEXT_LOCALE-Cookie — die Root-Domain zeigt immer
// Deutsch, Nutzer wechseln die Sprache ausschließlich aktiv über den Switcher.
const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false,
});

function buildCsp(): string {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "script-src 'self' 'unsafe-inline' https://js.stripe.com https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.stripe.com https://plausible.io https://*.zoho.eu https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
    "worker-src 'self' blob:",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export default function middleware(req: NextRequest) {
  const response = intlMiddleware(req) || NextResponse.next();

  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set(
    "Content-Security-Policy",
    buildCsp()
  );

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};