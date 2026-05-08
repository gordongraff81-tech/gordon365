"use client";

export default function AmbientBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Primary blue orb - top right */}
      <div
        className="absolute rounded-full opacity-30"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, #2563FF, transparent 70%)",
          top: "-200px",
          right: "-100px",
          filter: "blur(80px)",
          animation: "orbFloat 20s ease-in-out infinite alternate",
        }}
      />
      {/* Teal orb - bottom left */}
      <div
        className="absolute rounded-full opacity-20"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, #18D5FF, transparent 70%)",
          bottom: "-100px",
          left: "-50px",
          filter: "blur(100px)",
          animation: "orbFloat 20s ease-in-out infinite alternate-reverse",
          animationDelay: "-10s",
        }}
      />
      {/* Gold accent orb - center */}
      <div
        className="absolute rounded-full opacity-10"
        style={{
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, #C8A96B, transparent 70%)",
          top: "50%",
          left: "40%",
          filter: "blur(120px)",
          animation: "orbFloat 25s ease-in-out infinite alternate",
          animationDelay: "-5s",
        }}
      />

      <style jsx>{`
        @keyframes orbFloat {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(30px, -40px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
