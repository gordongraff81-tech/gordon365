// ── Zentral-Orb (bleibt sticky sichtbar) ────────────────────────────────────
function CenterOrb({ progress }: { progress: ReturnType<typeof useSpring> }) {
  const scale = useTransform(progress, [0, 0.5, 1], [0.7, 1, 1.1]);
  const glowOpacity = useTransform(progress, [0, 0.5, 1], [0.3, 1, 0.8]);

  return (
    <motion.div
      style={{ scale }}
      className="w-[220px] h-[220px] relative flex items-center justify-center"
    >
      {/* Glow — KORREKTUR: Nur EIN style-Objekt, das alle Eigenschaften bündelt */}
      <motion.div
        className="absolute inset-[-30px] rounded-full"
        style={{
          opacity: glowOpacity,
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