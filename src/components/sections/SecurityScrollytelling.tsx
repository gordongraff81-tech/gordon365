"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  useInView,
} from "framer-motion";

type LayerType = {
  id: string;
  tag: string;
  label: string;
  subtitle: string;
  color: string;
  glow: string;
  icon: React.ReactNode;
  features: string[];
  status: string;
  statusColor: string;
  startX: number;
  startY: number;
  startRotate: number;
};

const LAYERS: LayerType[] = [
  {
    id: "entra",
    tag: "LAYER 01",
    label: "Entra ID",
    subtitle: "Identität & Zugriff",
    color: "#0071E3",
    glow: "rgba(0,113,227,0.2)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="32" height="32" aria-hidden="true">
        <circle cx="24" cy="18" r="9" stroke="#0071E3" strokeWidth="2.5" />
        <path d="M6 42C6 33.163 14.059 26 24 26s18 7.163 18 16" stroke="#0071E3" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    features: ["Conditional Access", "MFA Enforcement", "Identity Protection"],
    status: "Active",
    statusColor: "#34C759",
    startX: -100,
    startY: -60,
    startRotate: -12,
  },
  {
    id: "intune",
    tag: "LAYER 02",
    label: "Intune",
    subtitle: "Endpoint Security",
    color: "#5E5CE6",
    glow: "rgba(94,92,230,0.2)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="32" height="32" aria-hidden="true">
        <rect x="10" y="6" width="28" height="36" rx="4" stroke="#5E5CE6" strokeWidth="2.5" />
        <circle cx="24" cy="36" r="2" fill="#5E5CE6" />
      </svg>
    ),
    features: ["Compliance Policies", "App Management", "Device Hardening"],
    status: "Monitored",
    statusColor: "#34C759",
    startX: 110,
    startY: -40,
    startRotate: 8,
  },
  {
    id: "defender",
    tag: "LAYER 03",
    label: "Defender",
    subtitle: "Threat Protection",
    color: "#FF3B30",
    glow: "rgba(255,59,48,0.2)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="32" height="32" aria-hidden="true">
        <path d="M24 6L8 12V24C8 34 16 40 24 42C32 40 40 34 40 24V12L24 6Z" stroke="#FF3B30" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    ),
    features: ["XDR Capabilities", "EDR Response", "Vulnerability Tracking"],
    status: "Shielded",
    statusColor: "#34C759",
    startX: 0,
    startY: 120,
    startRotate: 5,
  }
];

function LayerPanel({ layer, progress, index }: { layer: LayerType; progress: MotionValue<number>; index: number }) {
  const enter = index / 3;
  const peak  = enter + 0.18;
  const exit  = enter + 0.33;

  const x = useTransform(progress, [enter, peak], [layer.startX, 0]);
  const y = useTransform(progress, [enter, peak], [layer.startY, 0]);
  const rotate = useTransform(progress, [enter, peak], [layer.startRotate, 0]);
  const opacity = useTransform(progress, [Math.max(0, enter - 0.05), enter + 0.08, exit - 0.05, exit], [0, 1, 1, 0]);
  const scale = useTransform(progress, [enter, peak], [0.88, 1]);

  return (
    <motion.div style={{ x, y, rotate, opacity, scale }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-full max-w-[480px] rounded-[2rem] border overflow-hidden bg-white shadow-xl p-8" style={{ borderColor: `${layer.color}28` }}>
         <div className="flex items-center justify-between mb-6">
            <span className="text-[0.625rem] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded" style={{ color: layer.color, background: `${layer.color}18` }}>{layer.tag}</span>
            <span className="flex items-center gap-1.5 text-[0.75rem] font-bold" style={{ color: layer.statusColor }}>{layer.status}</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${layer.color}18` }} aria-hidden="true">
              {layer.icon}
            </div>
            <div>
              <div className="font-extrabold text-[1.625rem] text-slate-900 tracking-[-0.04em]">{layer.label}</div>
              <div className="text-[0.875rem] text-slate-600">{layer.subtitle}</div>
            </div>
          </div>
          <ul className="space-y-2">
            {layer.features.map(f => (
              <li key={f} className="text-sm text-slate-600 flex items-center gap-2">
                <span style={{ color: layer.color }}>✓</span> {f}
              </li>
            ))}
          </ul>
      </div>
    </motion.div>
  );
}

export default function SecurityScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-10 left-0 right-0 text-center z-20 px-8" ref={headerRef}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">M365 Security Posture Check</div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-3">Drei Layer.<br /><span className="text-blue-600">Eine sichere Umgebung.</span></h2>
            <p className="text-slate-600 max-w-[500px] mx-auto text-sm">Entra ID, Intune und Defender wirken als integrierter Schutzschild.</p>
          </motion.div>
        </div>

        <div className="absolute inset-0 z-20 pointer-events-none">
          {LAYERS.map((layer, i) => (
            <LayerPanel key={layer.id} layer={layer} progress={smoothProgress} index={i} />
          ))}
        </div>

        {/* Fortschrittsbalken für Lighthouse SEO/Accessibility */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 z-30"
          role="progressbar"
          aria-label="Scrolling progress"
        >
          <motion.div 
            className="h-full bg-blue-600"
            style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
          />
        </div>
      </div>
    </section>
  );
}