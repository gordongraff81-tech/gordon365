import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // ── Brand-Palette — Apple Light Theme ─────────────────────────────────
      colors: {
        bg: {
          0: "#FFFFFF",   // reines Weiß (Page-Basis)
          1: "#F5F5F7",   // Apple-Hellgrau (Sections, Panels)
          2: "#E8E8ED",   // Section-Trenner, leichte Cards
          3: "#D1D1D6",   // Subtle borders, Divider
          4: "#AEAEB2",   // Disabled, decorative details
        },
        accent: {
          DEFAULT: "#0071E3",   // Apple Blue
          hover:   "#0077ED",
          glow:    "rgba(0,113,227,0.15)",
          2:       "#34AADC",   // Apple Light Blue / Cyan
        },
        gold:  "#BF8F3C",
        green: "#28CD41",   // Apple Green
        red:   "#FF3B30",   // Apple Red
        amber: "#FF9500",   // Apple Orange
        text: {
          1: "#1D1D1F",   // Apple Near-Black (Primär)
          2: "#6E6E73",   // Apple Sekundär
          3: "#AEAEB2",   // Apple Tertiär / Placeholder
        },
        border: {
          DEFAULT: "rgba(0,0,0,0.08)",
          strong:  "rgba(0,0,0,0.14)",
          accent:  "rgba(0,113,227,0.25)",
        },
        card: {
          DEFAULT: "#FFFFFF",
          hover:   "#F5F5F7",
        },
      },

      // ── Typografie ─────────────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        body:    ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem,6vw,5rem)",    { lineHeight: "1.02", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.5rem,4.5vw,4rem)", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "display-md": ["clamp(2rem,3.5vw,3rem)",   { lineHeight: "1.08", letterSpacing: "-0.04em" }],
        "display-sm": ["clamp(1.75rem,2.5vw,2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
      },

      // ── Spacing ────────────────────────────────────────────────────────────
      spacing: {
        section:    "7rem",
        "section-sm": "5rem",
      },

      // ── Border-Radius (Apple: großzügig) ───────────────────────────────────
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.75rem",   // ← Hauptregel für Cards
        "5xl": "2.5rem",
      },

      // ── Schatten — Apple Light Style ──────────────────────────────────────
      boxShadow: {
        card:             "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)",
        "card-hover":     "0 2px 8px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.08)",
        glow:             "0 0 40px rgba(0,113,227,0.12)",
        "glow-sm":        "0 0 16px rgba(0,113,227,0.2)",
        "glow-accent2":   "0 0 30px rgba(52,170,220,0.12)",
        "glow-gold":      "0 0 20px rgba(191,143,60,0.15)",
        "glass":          "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
        "glass-hover":    "0 2px 8px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,1)",
      },

      // ── Animationen ────────────────────────────────────────────────────────
      animation: {
        "fade-up":     "fadeUp 0.7s cubic-bezier(0.4,0,0.2,1) both",
        "fade-in":     "fadeIn 0.5s cubic-bezier(0.4,0,0.2,1) both",
        "orb-float":   "orbFloat 20s ease-in-out infinite alternate",
        "pulse-dot":   "pulseDot 2s ease-in-out infinite",
        "shimmer":     "shimmer 2s linear infinite",
        "score-ring":  "scoreRing 1.5s cubic-bezier(0.4,0,0.2,1) forwards",
        "slide-right": "slideRight 0.4s cubic-bezier(0.4,0,0.2,1) both",
        // Neu für Scrollytelling-Layer
        "layer-in":    "layerIn 0.65s cubic-bezier(0.34,1.56,0.64,1) both",
        "orbit-spin":  "orbitSpin 20s linear infinite",
        "orbit-spin-rev": "orbitSpin 14s linear infinite reverse",
      },
      keyframes: {
        fadeUp:    { from: { opacity: "0", transform: "translateY(24px)" },  to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn:    { from: { opacity: "0" }, to: { opacity: "1" } },
        orbFloat:  { from: { transform: "translate(0,0) scale(1)" },          to: { transform: "translate(30px,-40px) scale(1.1)" } },
        pulseDot:  { "0%,100%": { opacity: "1", transform: "scale(1)" },      "50%": { opacity: "0.4", transform: "scale(0.75)" } },
        shimmer:   { "0%": { backgroundPosition: "-200% 0" },                 "100%": { backgroundPosition: "200% 0" } },
        slideRight:{ from: { opacity: "0", transform: "translateX(16px)" },   to: { opacity: "1", transform: "translateX(0)" } },
        layerIn:   { from: { opacity: "0", transform: "scale(0.85) translateY(20px)" }, to: { opacity: "1", transform: "scale(1) translateY(0)" } },
        orbitSpin: { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
      },

      // ── Hintergrundbilder ──────────────────────────────────────────────────
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // Subtiles Grid (Apple-style, sichtbar auf hellem Hintergrund)
        "grid-lines": "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
        "shimmer-gradient": "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.03) 50%, transparent 100%)",
        // Heller Glasmorphismus-Reflex
        "glass-reflex": "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 40%, transparent 60%)",
      },
      backgroundSize: {
        "grid":    "48px 48px",
        "shimmer": "200% 100%",
      },

      // ── Backdrop-Blur-Stufen ───────────────────────────────────────────────
      // Tailwind liefert backdrop-blur-xl (24px) und backdrop-blur-2xl (40px).
      // Für die Nav nutzen wir backdrop-blur-[20px] inline, was Tailwind JIT abdeckt.

      // ── Z-Index-Schichten ──────────────────────────────────────────────────
      zIndex: {
        "nav":     "50",
        "overlay": "40",
        "sticky":  "30",
        "card":    "20",
        "base":    "10",
      },
    },
  },
  plugins: [],
};

export default config;
