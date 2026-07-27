import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
});

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Root language resolver
  if (pathname === "/") {
    const acceptLanguage =
      req.headers.get("accept-language")?.toLowerCase() || "";

    const locale = acceptLanguage.startsWith("en")
      ? "en"
      : "de";

    return NextResponse.redirect(
      new URL(`/${locale}`, req.url),
      302
    );
  }

  const response = intlMiddleware(req);

  if (response) {
    response.headers.set(
      "X-DNS-Prefetch-Control",
      "on"
    );

    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );

    response.headers.set(
      "X-Frame-Options",
      "DENY"
    );

    response.headers.set(
      "X-Content-Type-Options",
      "nosniff"
    );

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
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://plausible.io",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self' https://api.stripe.com https://plausible.io https://*.zoho.eu",
        "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
      ].join("; ")
    );
  }

  return response || NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};