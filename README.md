# Gordon365 — Microsoft 365 Advisory & Security Platform

> Premium enterprise SaaS website with interactive M365 Security Posture Checker,  
> full EN/DE internationalization, and dark AI-native design.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 App Router |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 11 |
| i18n | next-intl 3 |
| Forms | React Hook Form + Zod |
| Notifications | Sonner |
| UI Primitives | Radix UI / shadcn-compatible |
| Deployment | Vercel (primary) / Cloudflare Pages |
| Email | Zoho Mail (EU datacenter) |

---

## Quick Start

```bash
# 1. Clone / unzip project
cd gordon365

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Zoho credentials

# 4. Start development server
npm run dev
# → http://localhost:3000
# → Auto-redirects to /en

# 5. Type check
npm run type-check

# 6. Production build
npm run build
npm run start
```

---

## Project Structure

```
gordon365/
├── messages/
│   ├── en.json              ← English copy (full)
│   └── de.json              ← German copy (native quality)
│
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx   ← Root layout with fonts, metadata, providers
│   │   │   └── page.tsx     ← Homepage (composes all sections)
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts ← POST handler → Zoho Mail
│   │   ├── globals.css      ← Tailwind + design tokens + base styles
│   │   └── layout.tsx       ← Root app shell
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Nav.tsx          ← Sticky nav with lang switcher
│   │   │   ├── AmbientBg.tsx    ← Floating orb background
│   │   │   └── ScoreRing.tsx    ← Animated SVG score ring
│   │   │
│   │   └── sections/
│   │       ├── Hero.tsx         ← Hero with dashboard visual
│   │       ├── StatsBar.tsx     ← Animated KPI bar
│   │       ├── SecurityChecker.tsx  ← 5-question interactive tool
│   │       ├── Services.tsx     ← 3 consulting offer cards
│   │       ├── Capabilities.tsx ← 4 platform pillars
│   │       ├── Results.tsx      ← 4 case study cards
│   │       ├── Insights.tsx     ← Blog/guide preview
│   │       ├── Why.tsx          ← Why Gordon365 + founder card
│   │       ├── Testimonials.tsx ← 3 client quotes
│   │       ├── CtaBand.tsx      ← Mid-page CTA
│   │       ├── Contact.tsx      ← Lead capture form
│   │       └── Footer.tsx       ← Full footer with newsletter
│   │
│   ├── i18n/
│   │   ├── request.ts       ← next-intl server config
│   │   └── routing.ts       ← Locale definitions (en, de)
│   │
│   ├── lib/
│   │   ├── utils.ts         ← cn(), formatScore(), ring math
│   │   └── checker.ts       ← Scoring logic + finding text (EN+DE)
│   │
│   └── middleware.ts        ← next-intl locale routing
│
├── public/
│   ├── robots.txt
│   └── icons/               ← Add favicon-32.png, favicon-16.png, apple-touch-icon.png
│
├── .env.example             ← Environment variable template
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Internationalization

Routes:
- `/en` → English
- `/de` → German

All copy lives in `messages/en.json` and `messages/de.json`.  
The language switcher in the nav updates the route prefix in-place.

To add a new locale (e.g. French):
1. Add `"fr"` to `routing.ts` locales array
2. Create `messages/fr.json` (copy from `en.json`)
3. Add FR button to `Nav.tsx` lang switcher

---

## Security Checker

The interactive tool in `SecurityChecker.tsx` + `src/lib/checker.ts`:

- **5 questions** covering MFA, Conditional Access, Legacy Auth, External Sharing, Sensitivity Labels
- **Scoring**: starts at 100, deducts by severity (25 pts for critical no-MFA, down to 7 pts for unknown label status)
- **Score ranges**: ≥75 = Strong (green), 50–74 = Needs Attention (amber), <50 = High Risk (red)
- **Findings**: per-question, per-answer findings with full EN+DE text in `FINDING_TEXT`
- **Animated score ring**: SVG with CSS transition, locale-aware labels
- **CTA**: links to contact form for full report / advisory call

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ZOHO_TOKEN` | For email | Zoho OAuth token (scope: ZohoMail.messages.CREATE) |
| `ZOHO_ACCOUNT_ID` | For email | Your Zoho account ID |
| `NOTIFY_EMAIL` | Optional | Override notification recipient (default: gordon@gordon365.com) |
| `NEXT_PUBLIC_BASE_URL` | Optional | Production URL for canonical links |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Plausible analytics domain |

---

## Deployment

See `DEPLOYMENT.md` for complete guides covering:
- Vercel deployment (primary)
- Cloudflare Pages (static export)
- DNS configuration
- Zoho Mail setup
- SEO checklist
- Post-launch growth plan
