/**
 * gordon365 Logo Component
 *
 * Variants:
 *   "horizontal" – full logo (icon + wordmark), used in Navbar, Footer
 *   "icon"       – cubic-G icon only, used in Mobile Menu, Favicon context, Loading screens
 *
 * Size presets (maps to CSS classes):
 *   "sm"  – Compact contexts (footer, sub-nav)
 *   "md"  – Default navbar size
 *   "lg"  – Hero / splash screens
 *
 * Priority: pass priority={true} for above-the-fold instances (LCP optimization).
 */

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx"; // if not installed: npm i clsx

type LogoVariant = "horizontal" | "icon";
type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  linkWrapper?: boolean;
  priority?: boolean;
}

/**
 * Dimensions for each size + variant combination.
 * Height is the constraint; width is derived from the actual aspect ratio.
 * Horizontal: 1512 x 432  → ratio 3.5:1
 * Icon:        472 x 432  → ratio 1.09:1 (near-square)
 */
const DIMENSIONS: Record<LogoSize, Record<LogoVariant, { w: number; h: number }>> = {
  sm: {
    horizontal: { w: 140, h: 40 },
    icon: { w: 36, h: 33 },
  },
  md: {
    horizontal: { w: 175, h: 50 },
    icon: { w: 44, h: 40 },
  },
  lg: {
    horizontal: { w: 280, h: 80 },
    icon: { w: 72, h: 66 },
  },
};

const SRC: Record<LogoVariant, string> = {
  horizontal: "/logo.png",
  icon: "/logo-icon.png",
};

const ALT: Record<LogoVariant, string> = {
  horizontal: "gordon365 – Microsoft 365 & Cloud Consulting",
  icon: "gordon365 Logo",
};

export function Logo({
  variant = "horizontal",
  size = "md",
  className,
  linkWrapper = true,
  priority = false,
}: LogoProps) {
  const { w, h } = DIMENSIONS[size][variant];

  const img = (
    <Image
      src={SRC[variant]}
      alt={ALT[variant]}
      width={w}
      height={h}
      priority={priority}
      quality={95}
      className={clsx(
        "logo",
        `logo--${variant}`,
        `logo--${size}`,
        "object-contain select-none",
        className
      )}
      style={{
        width: "auto",
        height: `${h}px`,
        maxWidth: "100%",
      }}
    />
  );

  if (!linkWrapper) return img;

  return (
    <Link
      href="/"
      aria-label="gordon365 – Zurück zur Startseite"
      className="logo-link inline-flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
    >
      {img}
    </Link>
  );
}

export default Logo;
