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
      colors: {
        // Brand palette derived from logo
        bg: {
          0:   "#060816",
          1:   "#0B1120",
          2:   "#0F1A2E",
          3:   "#14203A",
          4:   "#1a2a4a",
        },
        accent: {
          DEFAULT: "#2563FF",
          hover:   "#1d4fd8",
          glow:    "rgba(37,99,255,0.25)",
          2:       "#18D5FF",
        },
        gold:  "#C8A96B",
        green: "#10D97C",
        red:   "#FF4D6A",
        amber: "#F59E0B",
        text: {
          1: "#F0F4FF",
          2: "#94A3B8",
          3: "#64748B",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          strong:  "rgba(255,255,255,0.12)",
          accent:  "rgba(37,99,255,0.3)",
        },
        card: {
          DEFAULT: "rgba(255,255,255,0.03)",
          hover:   "rgba(255,255,255,0.06)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        body:    ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem,6vw,5rem)", { lineHeight: "1.02", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.5rem,4.5vw,4rem)", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "display-md": ["clamp(2rem,3.5vw,3rem)", { lineHeight: "1.08", letterSpacing: "-0.04em" }],
        "display-sm": ["clamp(1.75rem,2.5vw,2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
      },
      spacing: {
        section: "7rem",
        "section-sm": "5rem",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.75rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        card:   "0 1px 0 rgba(255,255,255,0.05) inset, 0 20px 40px rgba(0,0,0,0.35)",
        "card-hover": "0 1px 0 rgba(255,255,255,0.08) inset, 0 32px 64px rgba(0,0,0,0.45)",
        glow:   "0 0 60px rgba(37,99,255,0.2)",
        "glow-sm": "0 0 24px rgba(37,99,255,0.35)",
        "glow-accent2": "0 0 40px rgba(24,213,255,0.15)",
      },
      animation: {
        "fade-up":    "fadeUp 0.7s cubic-bezier(0.4,0,0.2,1) both",
        "fade-in":    "fadeIn 0.5s cubic-bezier(0.4,0,0.2,1) both",
        "orb-float":  "orbFloat 20s ease-in-out infinite alternate",
        "pulse-dot":  "pulseDot 2s ease-in-out infinite",
        "shimmer":    "shimmer 2s linear infinite",
        "score-ring": "scoreRing 1.5s cubic-bezier(0.4,0,0.2,1) forwards",
        "slide-right":"slideRight 0.4s cubic-bezier(0.4,0,0.2,1) both",
      },
      keyframes: {
        fadeUp:    { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn:    { from: { opacity: "0" }, to: { opacity: "1" } },
        orbFloat:  { from: { transform: "translate(0,0) scale(1)" }, to: { transform: "translate(30px,-40px) scale(1.1)" } },
        pulseDot:  { "0%,100%": { opacity: "1", transform: "scale(1)" }, "50%": { opacity: "0.4", transform: "scale(0.75)" } },
        shimmer:   { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        slideRight:{ from: { opacity: "0", transform: "translateX(16px)" }, to: { opacity: "1", transform: "translateX(0)" } },
      },
      backgroundImage: {
        "gradient-radial":   "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "grid-lines": "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        "shimmer-gradient": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
      },
      backgroundSize: {
        "grid": "48px 48px",
        "shimmer": "200% 100%",
      },
    },
  },
  plugins: [],
};

export default config;
