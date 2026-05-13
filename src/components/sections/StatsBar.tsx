"use client";

import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.round(current));
      if (current >= target) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const t = useTranslations("hero.metrics");

  const stats = [
    { value: 150, suffix: "+", label: t("environments") },
    { prefix: "€", value: 2.1, suffix: "M+", label: t("savings"), isFloat: true },
    { value: 98, suffix: "%", label: t("retention") },
    { value: 10, suffix: "+", label: t("years") },
  ];

  return (
    <div className="relative z-10 bg-bg-1 border-y border-border py-6 px-6">
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-display text-[1.875rem] font-extrabold tracking-[-0.03em] text-text-1 leading-none">
              {stat.prefix && <span className="text-accent-2">{stat.prefix}</span>}
              {stat.isFloat ? (
                <span>{stat.value}{stat.suffix}</span>
              ) : (
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              )}
            </div>
            <div className="text-[0.8125rem] text-text-2 mt-1.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
