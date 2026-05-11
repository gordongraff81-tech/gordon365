"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useInView } from "framer-motion";

// ── Layer-Definitionen ─────────────────────────────────────────────────────────
// Jeder Layer "fliegt" von einer Ausgangsposition zum Zentrum zusammen.
// Scroll 0→0.33: Layer 1 sichtbar  |  0.33→0.66: Layer 2  |  0.66→1: Layer 3

const LAYERS = [
  {
    id: "entra",
    tag: "LAYER 01",
    label: "Entra ID",
    subtitle: "Identität & Zugriff",
    color: "#2563FF",
    glow: "rgba(37,99,255,0.35)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="32" height="32">
        <circle cx="24" cy="18" r="9" stroke="#2563FF" strokeWidth="2.5" />
        <path d="M6 42C6 33.163 14.059 26 24 26s18 7.163 18 16" stroke="#2563FF" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="38" cy="14" r="6" fill="rgba(37,99,255,0.2)" stroke="#18D5FF" strokeWidth="1.5" />
        <path d="M35.5 14.5L37.5 16.5L41 12.5" stroke="#18D5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    features: [
      "MFA für alle Benutzer erzwungen",
      "Conditional Access Policies",
      "Privileged Identity Management",
      "Risikobasierte Anmeldeprüfung",
    ],
    status: "Gesichert",
    statusColor: "#10D97C",
    startX: -340,
    startY: -80,
    startRotate: -12,
  },
  {
    id: "intune",
    tag: "LAYER 02",
    label: "Intune",
    subtitle: "Endpoint Management",
    color: "#18D5FF",
    glow: "rgba(24,213,255,0.3)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="32" height="32">
        <rect x="6" y="10" width="36" height="24" rx="3" stroke="#18D5FF" strokeWidth="2.5" />
        <path d="M16 34v4M32 34v4M12 38h24" stroke="#18D5FF" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 22l5 5 10-10" stroke="#18D5FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    features: [
      "Compliance-Richtlinien konfiguriert",
      "App Protection Policies (MAM-WE)",
      "Autopilot-Deployment aktiv",
      "BitLocker Encryption erzwungen",
    ],
    status: "Konform",
    statusColor: "#18D5FF",
    startX: 320,
    startY: -40,
    startRotate: 10,
  },
  {
    id: "defender",
    tag: "LAYER 03",
    label: "Defender for M365",
    subtitle: "Threat Protection",
    color: "#C8A96B",
    glow: "rgba(200,169,107,0.3)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="32" height="32">
        <path d="M24 4L7 11v13c0 10.5 7.3 20.3 17 23 9.7-2.7 17-12.5 17-23V11L24 4Z" stroke="#C8A96B" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M17 24.5l5.5 5.5 9-11" stroke="#C8A96B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    features: [
      "Defender for Office 365 Plan 2",
      "Safe Links & Safe Attachments",
      "Attack Simulation Training",
      "Threat & Vulnerability Management",
    ],
    status: "Plan 2 aktiv",
    statusColor: "#C8A96B",
    startX: 0,
    startY: 180,
    startRotate: 5,
  },
];

// ── Einzelner Layer-Panel ────────────────────────────────────────────────────
function LayerPanel({
  layer,
  progress,
  index,
}: {
  layer: (typeof LAYERS)[0];
  progress: ReturnType<typeof useSpring>;
  index: number;
}) {
  // Jeder Layer hat sein eigenes Eintritts-Fenster im Scroll-Verlauf
  const enter = index / LAYERS.length;
  const peak  = enter + 0.18;
  const exit  = enter + 0.33;

  // Position: von startX/Y → 0/0
  const x = useTransform(progress, [enter, peak], [layer.startX, 0]);
  const y = useTransform(progress, [enter, peak], [layer.startY, 0]);
  const rotate = useTransform(progress, [enter, peak], [layer.startRotate, 0]);
  const opacity = useTransform(
    progress,
    [Math.max(0, enter - 0.05), enter + 0.08, exit - 0.05, exit],
    [0, 1, 1, 0]
  );
  const scale = useTransform(progress, [enter, peak], [0.88, 1]);

  return (
    <motion.div
      style={{ x, y, rotate, opacity, scale }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-[480px] rounded-4xl border overflow-hidden"
        style={{
          background: "rgba(11,17,32,0.90)",
          borderColor: `${layer.color}33`,
          boxShadow: `0 0 60px ${layer.glow}, 0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`,
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${layer.color}, transparent)`,
          }}
        />

        <div className="p-8">
          {/* Tag */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-[0.625rem] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded"
              style={{ color: layer.color, background: `${layer.color}18`, border: `1px solid ${layer.color}30` }}
            >
              {layer.tag}
            </span>
            <span
              className="flex items-center gap-1.5 text-[0.75rem] font-bold"
              style={{ color: layer.statusColor }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: layer.statusColor, boxShadow: `0 0 8px ${layer.statusColor}` }}
              />
              {layer.status}
            </span>
          </div>

          {/* Heading */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${layer.color}18`, border: `1px solid ${layer.color}30` }}
            >
              {layer.icon}
            </div>
            <div>
              <div className="font-display font-extrabold text-[1.625rem] text-white tracking-[-0.04em] leading-none mb-1">
                {layer.label}
              </div>
              <div className="text-[0.875rem] text-text-2 font-medium">{layer.subtitle}</div>
            </div>
          </div>

          {/* Feature-Liste */}
          <ul className="grid grid-cols-1 gap-2.5">
            {layer.features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${layer.color}18` }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke={layer.color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[0.875rem] text-text-2 leading-snug">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

// ── Zentral-Orb (bleibt sticky sichtbar) ────────────────────────────────────
function CenterOrb({ progress }: { progress: ReturnType<typeof useSpring> }) {
  const scale = useTransform(progress, [0, 0.5, 1], [0.7, 1, 1.1]);
  const glowOpacity = useTransform(progress, [0, 0.5, 1], [0.3, 1, 0.8]);

  return (
    <motion.div
      style={{ scale }}
      className="w-[220px] h-[220px] relative flex items-center justify-center"
    >
      {/* Glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-[-30px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37,99,255,0.25) 0%, rgba(24,213,255,0.1) 50%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Outer ring animated */}
      <div className="absolute inset-0 rounded-full border border-accent/20 animate-[spin_20s_linear_infinite]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-2 shadow-[0_0_8px_rgba(24,213,255,0.8)] -translate-y-[3px]" />
      </div>
      <div className="absolute inset-[12px] rounded-full border border-accent-2/15 animate-[spin_14s_linear_infinite_reverse]">
        <div className="absolute bottom-0 right-[20%] w-1 h-1 rounded-full bg-accent/80 shadow-[0_0_6px_rgba(37,99,255,0.8)]" />
      </div>

      {/* Core */}
      <div className="relative w-[130px] h-[130px] rounded-full bg-gradient-to-br from-accent/30 to-accent-2/20 border border-white/10 flex items-center justify-center"
        style={{ boxShadow: "0 0 40px rgba(37,99,255,0.3), inset 0 1px 0 rgba(255,255,255,0.1)" }}
      >
        <svg viewBox="0 0 60 60" fill="none" width="52" height="52">
          <path
            d="M30 5L8 15V28C8 41 18.5 52.5 30 55C41.5 52.5 52 41 52 28V15L30 5Z"
            fill="rgba(37,99,255,0.2)"
            stroke="url(#shield-grad-orb)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M21 30L27 36L40 22" stroke="#18D5FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="shield-grad-orb" x1="8" y1="5" x2="52" y2="55">
              <stop stopColor="#18D5FF" />
              <stop offset="1" stopColor="#2563FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
}

// ── Fortschritts-Indikatoren ────────────────────────────────────────────────
function LayerIndicators({ progress }: { progress: ReturnType<typeof useSpring> }) {
  return (
    <div className="flex gap-2 items-center">
      {LAYERS.map((layer, i) => {
        const enter = i / LAYERS.length;
        const exit  = enter + 0.33;
        const isActive = useTransform(progress, [enter, enter + 0.08, exit - 0.05, exit], [0.3, 1, 1, 0.3]);
        return (
          <motion.div key={layer.id} style={{ opacity: isActive }} className="flex items-center gap-2">
            <div
              className="h-0.5 rounded-full transition-all duration-300"
              style={{ width: i === 1 ? "28px" : "16px", background: layer.color }}
            />
            <span className="text-[0.625rem] font-bold tracking-[0.1em] uppercase" style={{ color: layer.color }}>
              {layer.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Haupt-Export ─────────────────────────────────────────────────────────────
export default function SecurityScrollytelling() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const inView     = useInView(headerRef, { once: true, amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    restDelta: 0.001,
  });

  // Gesamt-Fortschrittsbalken
  const progressBar = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    // Scroll-Container: sehr hoher Content gibt dem sticky Panel Zeit
    <div id="security-checker" ref={sectionRef} style={{ height: "350vh" }} className="relative">
      {/* ── Sticky Viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-bg-0">

        {/* Hintergrund-Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,255,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
          }}
        />

        {/* ── Abschnitts-Header (oben) ── */}
        <div className="absolute top-0 left-0 right-0 pt-10 pb-8 px-8 lg:px-16 text-center z-20" ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label justify-center mb-4">M365 Security Posture Check</div>
            <h2 className="display-md text-white mb-3">
              Drei Layer.<br />
              <span className="text-gradient">Eine sichere Umgebung.</span>
            </h2>
            <p className="text-[0.9375rem] text-text-2 max-w-[500px] mx-auto leading-relaxed">
              Entra ID, Intune und Defender for M365 wirken als integrierter Schutzschild — Gordon365 konfiguriert und härtet alle drei Ebenen nach Best Practices.
            </p>
          </motion.div>

          {/* Fortschritts-Indikatoren */}
          <div className="flex justify-center mt-5">
            <LayerIndicators progress={smoothProgress} />
          </div>
        </div>

        {/* ── Zentraler Orb ── */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <CenterOrb progress={smoothProgress} />
        </div>

        {/* ── Layer-Panels fliegen zusammen ── */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {LAYERS.map((layer, i) => (
            <LayerPanel
              key={layer.id}
              layer={layer}
              progress={smoothProgress}
              index={i}
            />
          ))}
        </div>

        {/* ── Unterer Fortschrittsbalken ── */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border z-30">
          <motion.div
            style={{ width: progressBar }}
            className="h-full"
            style={{
              background: "linear-gradient(90deg, #2563FF, #18D5FF)",
              boxShadow: "0 0 8px rgba(24,213,255,0.5)",
            }}
          />
        </div>

        {/* ── Scroll-Hint ── */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-text-3 flex items-center gap-2"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          Weiter scrollen
        </motion.div>
      </div>
    </div>
  );
}
