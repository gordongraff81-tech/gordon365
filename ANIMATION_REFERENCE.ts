/**
 * gordon365 — Framer Motion Animation Reference
 * ─────────────────────────────────────────────
 * Drei vollständige, isoliert lauffähige Beispiele für die drei
 * Scrollytelling-Module. Importierbar als Drop-in-Snippets.
 *
 * Stack: Next.js App Router · Framer Motion 11 · TypeScript
 */

"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

// ══════════════════════════════════════════════════════════════════════════════
// 1. HERO — Scroll-Zoom + Text-Fade
//    Quell-Datei: HeroV2.tsx
//
//    Mechanik:
//    • useScroll({ target }) misst den Scroll-Fortschritt des Containers.
//    • useTransform bildet [input] → [output] Wertebereiche ab.
//    • useSpring glättet den rohen scrollYProgress zu einer weichen Kurve.
//    • Der Text-Block fährt nach oben und wird ausgeblendet (textY, textOpacity).
//    • Der 3D-Orb wächst und kommt dabei leicht nach unten (orbScale, orbY).
// ══════════════════════════════════════════════════════════════════════════════

export function HeroScrollZoomExample() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1a — Raw scroll-progress innerhalb des 200vh-Containers
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 1b — Spring-Damping verhindert abrupte Sprünge
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,   // Wie stark zieht der Spring?  ↓ = weicher
    damping:   25,   // Wie viel Dämpfung?            ↑ = weniger Überschwingen
    restDelta: 0.001,
  });

  // 1c — Text: beim Scrollen nach oben gleiten & unsichtbar werden
  const textY       = useTransform(smooth, [0, 0.5],  ["0%", "-12%"]);
  const textOpacity = useTransform(smooth, [0, 0.38], [1, 0]);

  // 1d — Orb: herranzoomen + leicht absinken
  const orbScale    = useTransform(smooth, [0, 0.6],  [1, 1.55]);
  const orbOpacity  = useTransform(smooth, [0, 0.08, 0.7, 1], [0, 1, 1, 0.3]);
  const orbY        = useTransform(smooth, [0, 0.6],  ["0%", "8%"]);

  // 1e — Scroll-Indikator verschwindet sofort beim ersten Pixel
  const scrollHintOpacity = useTransform(smooth, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} style={{ height: "200vh" }}>
      {/* Sticky-Viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center">

        {/* Text-Block */}
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <h1>Microsoft 365 sichern & optimieren</h1>
        </motion.div>

        {/* 3D-Orb */}
        <motion.div style={{ scale: orbScale, opacity: orbOpacity, y: orbY }}>
          {/* → CloudOrb-Komponente oder Three.js-Canvas hier einsetzen */}
          <div className="w-[400px] h-[400px] bg-accent/20 rounded-full" />
        </motion.div>

        {/* Scroll-Hint */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          ↓ Scroll
        </motion.div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. SECURITY SCROLLYTELLING — Layer-Explosion (Apple-style)
//    Quell-Datei: SecurityScrollytelling.tsx
//
//    Mechanik:
//    • 350vh-Container gibt dem sticky Viewport Zeit.
//    • Drei Layer haben jeweils ein eigenes Fenster im [0,1]-Fortschritt:
//        Layer 0: [0.00 → 0.33]   Layer 1: [0.33 → 0.66]   Layer 2: [0.66 → 1.00]
//    • Jeder Layer startet off-screen (startX/Y/Rotate) und fliegt zum Zentrum.
//    • opacity  wird am Eingang und Ausgang des Fensters auf 0 gesetzt →
//      weicher Ein- & Ausblendeeffekt ohne harte Sprünge.
// ══════════════════════════════════════════════════════════════════════════════

const LAYER_CONFIG = [
  { startX: -340, startY: -80,  startRotate: -12, enter: 0.00, exit: 0.33, label: "Entra ID"          },
  { startX:  320, startY: -40,  startRotate:  10, enter: 0.33, exit: 0.66, label: "Intune"             },
  { startX:    0, startY:  180, startRotate:   5, enter: 0.66, exit: 1.00, label: "Defender for M365"  },
];

export function SecurityLayerExample() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22 });

  return (
    <div ref={sectionRef} style={{ height: "350vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {LAYER_CONFIG.map((layer) => {
          // Jeder Layer berechnet seine eigenen transforms aus demselben smooth-Wert.
          // Schlüssel-Pattern: enter → peak (enter+0.18) für die Bewegung,
          //                    enter-0.05 → exit für die Opacity-Hülle.
          const peak = layer.enter + 0.18;

          const x       = useTransform(smooth, [layer.enter, peak],                    [layer.startX,     0]);
          const y       = useTransform(smooth, [layer.enter, peak],                    [layer.startY,     0]);
          const rotate  = useTransform(smooth, [layer.enter, peak],                    [layer.startRotate, 0]);
          const scale   = useTransform(smooth, [layer.enter, peak],                    [0.88, 1]);
          const opacity = useTransform(
            smooth,
            [Math.max(0, layer.enter - 0.05), layer.enter + 0.08, layer.exit - 0.05, layer.exit],
            [0, 1, 1, 0]
          );

          return (
            <motion.div
              key={layer.label}
              style={{ x, y, rotate, scale, opacity }}
              className="absolute"
            >
              {/* → LayerPanel-Komponente hier einsetzen */}
              <div className="w-80 h-48 bg-bg-2 border border-border rounded-4xl flex items-center justify-center text-white font-bold">
                {layer.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 3. BENTO-GRID — Staggered InView-Reveal
//    Quell-Datei: BentoServicesGrid.tsx
//
//    Mechanik:
//    • useInView gibt ein boolean zurück, sobald das Element sichtbar wird.
//    • Jede Card animiert von { opacity:0, y:32, scale:0.97 } → voll sichtbar.
//    • delay = index * 0.1 erzeugt den Stagger-Effekt ohne externe Libs.
//    • Die Stat-Cards nutzen { scale: 0.94 } statt y-Versatz für Variation.
//    • Hover: -translate-y-1.5 über Tailwind (CSS-Transition, kein JS-Overhead).
// ══════════════════════════════════════════════════════════════════════════════

const SERVICE_ITEMS = ["M365 Health Check", "Copilot Readiness Sprint", "Beratungs-Retainer"];

export function BentoStaggerExample() {
  // Trigger: wird ausgelöst, sobald 15% der Section sichtbar sind.
  const sectionRef = useRef<HTMLDivElement>(null);
  // (In echtem Code nutzen wir useInView pro Card — hier vereinfacht.)

  return (
    <div ref={sectionRef} className="grid grid-cols-3 gap-4 p-8">
      {SERVICE_ITEMS.map((name, i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          // whileInView erspart einen separaten useInView-Hook für einfache Fälle.
          // amount: 0.15 = Card muss mindestens 15% im Viewport sein.
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            delay: i * 0.1,            // ← Stagger
            ease: [0.4, 0, 0.2, 1],   // ← Material-Ease (identisch zu CSS ease-in-out-cubic)
          }}
          // CSS-Transition für Hover (kein JS-Overhead)
          className="rounded-4xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1.5 hover:bg-card-hover hover:border-border-strong hover:shadow-card-hover"
        >
          <div className="font-display font-extrabold text-xl text-white">{name}</div>
        </motion.div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 4. NAV — Adaptive backdrop-blur beim Scrollen
//    Quell-Datei: NavV2.tsx
//
//    Mechanik:
//    • Kein Framer-Motion nötig — CSS-Transition auf style-Attribut reicht.
//    • scrollY > 30 aktiviert einen inline style-Switch auf background + filter.
//    • Der Active-Dot unter dem aktuellen Nav-Link nutzt layoutId für smooth
//      Positions-Animation zwischen den Links (Framer Shared Layout).
// ══════════════════════════════════════════════════════════════════════════════

export function NavAdaptiveExample({ scrolled = false }: { scrolled?: boolean }) {
  const activeLink = "services"; // Beispiel

  const links = ["services", "security-checker", "results", "contact"];

  return (
    <nav
      style={{
        // Kein Framer-Motion: CSS-Transition auf inline style ist ausreichend
        background:         scrolled ? "rgba(6,8,22,0.82)" : "rgba(6,8,22,0)",
        backdropFilter:     scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom:       scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        transition:         "background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease",
      }}
      className="fixed top-0 left-0 right-0 h-14 flex items-center gap-1 px-8 z-50"
    >
      {links.map((link) => {
        const isActive = link === activeLink;
        return (
          <a
            key={link}
            href={`#${link}`}
            className="relative px-3.5 py-1.5 text-sm font-medium rounded-[6px] text-text-2 hover:text-white hover:bg-white/[0.04] transition-all duration-200"
          >
            {link}
            {/* layoutId sorgt dafür, dass der Dot beim Wechsel zwischen Links
                smooth animated – Framer erkennt identische layoutId und interpoliert. */}
            {isActive && (
              <motion.span
                layoutId="nav-active-dot"
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-2"
              />
            )}
          </a>
        );
      })}
    </nav>
  );
}
