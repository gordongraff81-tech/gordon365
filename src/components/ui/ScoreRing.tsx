"use client";

import { useEffect, useRef } from "react";
import { formatScore, calcCircumference, calcStrokeDashoffset } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  animate?: boolean;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export default function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  animate = true,
  showLabel = true,
  label = "Score",
  className,
}: ScoreRingProps) {
  const r = (size - strokeWidth * 2) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = calcCircumference(r);
  const targetOffset = calcStrokeDashoffset(score, circumference);
  const { color } = formatScore(score);
  const fillRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!animate || !fillRef.current) return;
    // Start from empty, animate to target
    fillRef.current.style.strokeDashoffset = String(circumference);
    const timer = setTimeout(() => {
      if (fillRef.current) {
        fillRef.current.style.strokeDashoffset = String(targetOffset);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [score, animate, circumference, targetOffset]);

  const fontSize = size * 0.25;
  const labelSize = size * 0.1;

  return (
    <div className={`relative inline-flex items-center justify-center ${className ?? ""}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Fill */}
        <circle
          ref={fillRef}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animate ? circumference : targetOffset}
          style={{
            transition: animate ? "stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)" : undefined,
          }}
        />
      </svg>

      {/* Center content */}
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-display font-extrabold leading-none"
            style={{ fontSize, color }}
          >
            {score}
          </span>
          <span
            className="font-body font-semibold uppercase tracking-[0.08em] text-text-3 mt-0.5"
            style={{ fontSize: labelSize }}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
