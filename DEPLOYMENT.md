# Gordon365 — Deployment Guide

---

## 1. Local Development Setup

```bash
# Prerequisites: Node.js 20+, npm 10+

git clone <your-repo>
cd gordon365
npm install
cp .env.example .env.local

# Edit .env.local:
# ZOHO_TOKEN=...
# ZOHO_ACCOUNT_ID=...
# NOTIFY_EMAIL=gordon@gordon365.com

npm run dev
# → http://localhost:3000 (redirects to /en)
```

**Verify:**
- `http://localhost:3000/en` → English homepage
- `http://localhost:3000/de` → German homepage
- Security checker functions end-to-end
- Contact form submits (check console — Zoho skipped without token)

---

## 2. Vercel Deployment (Recommended)

### Step 1 — Push to GitHub
```bash
git init && git add . && git commit -m "Initial Gordon365 deployment"
git remote add origin https://github.com/yourname/gordon365.git
git push -u origin main
```

### Step 2 — Connect Vercel
1. Go to https://vercel.com → **New Project**
2. Import from GitHub → select `gordon365`
3. Framework preset: **Next.js** (auto-detected)
4. Build command: `npm run build` (default)
5. Output directory: `.next` (default)
6. Click **Deploy**

### Step 3 — Environment Variables
In Vercel project → **Settings → Environment Variables**:
```
ZOHO_TOKEN           = your_zoho_oauth_token
ZOHO_ACCOUNT_ID      = your_zoho_account_id
NOTIFY_EMAIL         = gordon@gordon365.com
NEXT_PUBLIC_BASE_URL = https://gordon365.com
```
Set all to **Production + Preview + Development**.

### Step 4 — Custom Domain
1. Vercel project → **Settings → Domains**
2. Add `gordon365.com` and `www.gordon365.com`
3. Follow DNS instructions (see DNS section below)

---

## 3. Cloudflare Pages Deployment (Alternative)

For static export to Cloudflare Pages, uncomment in `next.config.ts`:
```ts
output: "export",
```

**Note:** Static export disables the `/api/contact` route.  
Use a Cloudflare Worker for the contact form instead (see Worker section below).

```bash
npm run build   # generates /out directory
```

In Cloudflare Pages:
1. **Dashboard → Pages → Create a project → Connect to Git**
2. Framework preset: `Next.js (Static HTML Export)`
3. Build command: `npm run build`
4. Build output directory: `out`

### Cloudflare Worker (Contact Form)
Deploy `workers/form-handler.js` from the previous guide as a Worker.
Bind it to route: `gordon365.com/api/contact`

---

## 4. DNS Configuration

Point `gordon365.com` to Cloudflare nameservers, then add:

### For Vercel
| Type | Name | Value | Proxy |
|---|---|---|---|
| A | @ | 76.76.21.21 | ✅ |
| CNAME | www | cname.vercel-dns.com | ✅ |

### For Cloudflare Pages
| Type | Name | Value | Proxy |
|---|---|---|---|
| CNAME | @ | your-project.pages.dev | ✅ |
| CNAME | www | gordon365.com | ✅ |

### Zoho Mail DNS Records
| Type | Name | Value | Proxy |
|---|---|---|---|
| MX | @ | mx.zoho.eu (P:10) | ❌ |
| MX | @ | mx2.zoho.eu (P:20) | ❌ |
| MX | @ | mx3.zoho.eu (P:50) | ❌ |
| TXT | @ | v=spf1 include:zoho.eu ~all | ❌ |
| TXT | zmail | (Zoho verification code) | ❌ |
| CNAME | zmdkim._domainkey | (Zoho DKIM value) | ❌ |
| TXT | _dmarc | v=DMARC1; p=quarantine; rua=mailto:dmarc@gordon365.com | ❌ |

---

## 5. Zoho Mail Setup

1. Go to https://www.zoho.com/mail/ → Sign up → **Business Email**
2. Select **EU Data Centre** (critical for DSGVO compliance)
3. Add domain `gordon365.com` → verify with DNS TXT record
4. Create mailboxes:
   - `gordon@gordon365.com` — primary
   - `hello@gordon365.com` — general enquiries
   - `noreply@gordon365.com` — transactional

### Get OAuth Token
1. https://api-console.zoho.eu → **Add Client → Server-based Applications**
2. Authorized Redirect URI: `https://gordon365.com`
3. Scopes: `ZohoMail.messages.CREATE`
4. Generate token → copy to `ZOHO_TOKEN` env var
5. Get Account ID from Zoho Mail settings URL or API response → `ZOHO_ACCOUNT_ID`

---

## 6. Adding Favicon & Icons

Create these files in `/public/icons/`:
- `favicon-32.png` — 32×32px (logo mark on dark bg)
- `favicon-16.png` — 16×16px
- `apple-touch-icon.png` — 180×180px
- `og-image.png` — 1200×630px (in `/public/og/`)

Recommended tool: https://realfavicongenerator.net

---

## 7. Analytics Setup (GDPR Compliant)

### Option A: Plausible (Recommended — no consent banner needed)
```bash
# Add to .env:
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=gordon365.com
```

Add to `[locale]/layout.tsx` `<head>`:
```tsx
<Script
  defer
  data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
  src="https://plausible.io/js/script.js"
/>
```

### Option B: Microsoft Clarity (free, GDPR-friendly, heatmaps)
Add the Clarity script snippet to `layout.tsx`.

---

## 8. SEO Checklist

### Pre-launch
- [ ] `og-image.png` created (1200×630, dark bg, Gordon365 logo + tagline)
- [ ] All 5 favicon sizes generated
- [ ] Sitemap at `gordon365.com/sitemap.xml` accessible
- [ ] `robots.txt` at `gordon365.com/robots.txt` accessible
- [ ] JSON-LD schema in `layout.tsx` (already included)
- [ ] `lang` attribute on `<html>` (handled by next-intl)
- [ ] Canonical URLs set (handled in generateMetadata)
- [ ] hreflang tags for EN/DE (handled via alternates in metadata)

### Post-launch
- [ ] Submit sitemap to **Google Search Console**
- [ ] Submit sitemap to **Bing Webmaster Tools**
- [ ] Verify both `/en` and `/de` routes in Search Console
- [ ] Set up Plausible or GA4 goal tracking (form submit)
- [ ] Run Lighthouse audit (target: 95+ Performance, 100 Accessibility)
- [ ] Run PageSpeed Insights: https://pagespeed.web.dev

### Primary Keywords to Target
| Keyword (EN) | Keyword (DE) |
|---|---|
| Microsoft 365 consultant Germany | Microsoft 365 Berater Deutschland |
| Microsoft 365 optimization consultant | M365 Optimierung Consultant |
| Copilot readiness consultant | Copilot Readiness Beratung |
| Microsoft security consultant SME | Microsoft Sicherheit Berater KMU |
| Microsoft licensing optimization | Microsoft Lizenzoptimierung |
| Modern workplace consultant DACH | Modern Workplace Berater DACH |

---

## 9. Performance Optimization

### Tailwind CSS
```bash
# Production build auto-purges unused classes
npm run build
# → Tailwind output typically < 15KB gzipped
```

### Next.js Image Optimization
- Replace `<img>` tags with Next.js `<Image>` for the founder portrait
- Add `width`, `height`, and `priority` prop to above-the-fold images

### Font Loading
- Fonts are loaded via `next/font/google` with `display: "swap"` — zero layout shift
- Preconnect headers handled automatically by Next.js

### Core Web Vitals targets
| Metric | Target |
|---|---|
| LCP | < 2.5s |
| FID/INP | < 100ms |
| CLS | < 0.1 |
| TTFB | < 800ms |

---

## 10. Post-Launch Growth Plan

### Content (Months 1–3)
- Publish 3 cornerstone guides (already seeded in Insights section)
- Target: "Microsoft 365 Secure Score verbessern", "M365 Copilot Bereitschaft"
- Create a free "M365 Security Self-Assessment PDF" lead magnet

### LinkedIn Content Strategy
- Weekly posts: 1 M365 tip or finding from real audits
- Share case study metrics (anonymised)
- Engage in groups: IT-Leiter DACH, Microsoft 365 Community

### Outreach
- Partner with HR/IT resellers who don't offer advisory services
- IHK events, Mittelstand IT conferences (CeBIT, DMS EXPO)
- Microsoft Partner Network referral programme

### Conversion Optimisation (Months 2–4)
- A/B test hero CTA copy after 500+ visitors
- Add Calendly embed directly in contact section
- Install Microsoft Clarity for heatmaps (GDPR-compliant)
- Add exit-intent popup with "Free Security Check" CTA

### Retention (Ongoing)
- Monthly newsletter: "M365 Update — Was sich diesen Monat geändert hat"
- Annual health check offer for past project clients
- Client referral incentive: 1 month retainer credit per qualified referral

---

*Gordon365 Deployment Guide v2.0 — Next.js 15 / Vercel / Zoho Mail*
