import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScore(score: number): { color: string; label: "strong" | "attention" | "critical" } {
  if (score >= 75) return { color: "#10D97C", label: "strong" };
  if (score >= 50) return { color: "#F59E0B", label: "attention" };
  return { color: "#FF4D6A", label: "critical" };
}

export function calcCircumference(r: number) {
  return 2 * Math.PI * r;
}

export function calcStrokeDashoffset(score: number, circumference: number) {
  return circumference - (score / 100) * circumference;
}
