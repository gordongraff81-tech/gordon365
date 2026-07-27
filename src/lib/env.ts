import { z } from "zod";

/**
 * Environment variable validation schema
 * 
 * This schema validates all required and optional environment variables
 * at startup time, providing clear error messages for missing or invalid values.
 * 
 * Required variables will cause the application to fail fast if missing.
 * Optional variables have default values or are nullable.
 */

const envSchema = z.object({
  // ── Application ──
  NEXT_PUBLIC_BASE_URL: z.string().url().default("https://gordon365.com"),
  NEXT_PUBLIC_URL: z.string().url().default("https://gordon365.com"),
  
  // ── Stripe ──
  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_STRIPE_PRICE_ID_HARDENING: z.string().min(1).optional(),
  NEXT_PUBLIC_STRIPE_PRICE_ID_MFA: z.string().min(1).optional(),
  NEXT_PUBLIC_STRIPE_PRICE_ID_INTUNE: z.string().min(1).optional(),
  
  // ── Zoho Mail ──
  ZOHO_TOKEN: z.string().min(1).optional(),
  ZOHO_ACCOUNT_ID: z.string().min(1).optional(),
  SMTP_USER: z.string().email().default("info@gordon365.com"),
  NOTIFY_EMAIL: z.string().email().default("gordon@gordon365.com"),
  
  // ── Upstash Redis (Rate Limiting) ──
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
  
  // ── Analytics (Optional) ──
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  
  // ── CRM/Calendly (Optional) ──
  NEXT_PUBLIC_CALENDLY_URL: z.string().url().optional(),
});

/**
 * Type-safe environment variables
 * Use this instead of process.env directly
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Validated environment variables
 * Call validateEnv() at application startup to ensure all required
 * environment variables are present and valid.
 */
let _env: Env | null = null;

function buildValidationError(errors: string[]): Error {
  const message = [
    "Environment validation failed.",
    "Please check your .env.local file (local) or Vercel Project Settings (production).",
    "",
    ...errors,
  ].join("\n");

  return new Error(message);
}

export function validateEnv(): Env {
  if (_env) return _env;

  try {
    const parsed = envSchema.parse(process.env);
    const errors: string[] = [];
    const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";
    const enforceStrictServices = (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") && !isBuildPhase;

    if (enforceStrictServices && !parsed.STRIPE_SECRET_KEY) {
      errors.push("- STRIPE_SECRET_KEY: Stripe is required for checkout and webhook flows.");
    }

    if (enforceStrictServices && !parsed.ZOHO_TOKEN) {
      errors.push("- ZOHO_TOKEN: Zoho mail transport requires a token.");
    }

    if (enforceStrictServices && !parsed.NOTIFY_EMAIL) {
      errors.push("- NOTIFY_EMAIL: A notify email address is required for mail delivery.");
    }

    if (enforceStrictServices && ((parsed.UPSTASH_REDIS_REST_URL && !parsed.UPSTASH_REDIS_REST_TOKEN) || (!parsed.UPSTASH_REDIS_REST_URL && parsed.UPSTASH_REDIS_REST_TOKEN))) {
      errors.push("- UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN: both values are required together for rate limiting.");
    }

    if (errors.length > 0) {
      throw buildValidationError(errors);
    }

    _env = parsed;
    return _env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details = error.errors
        .map(e => `- ${e.path.join(".")}: ${e.message}`)
        .join("\n");

      throw buildValidationError([details]);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Environment validation failed.");
  }
}

/**
 * Get validated environment variables
 * This will throw if validateEnv() has not been called
 */
export function getEnv(): Env {
  if (!_env) {
    throw new Error(
      "Environment variables not validated. Call validateEnv() at application startup."
    );
  }
  return _env;
}

/**
 * Check if a specific optional feature is enabled
 */
export function isFeatureEnabled(feature: "plausible" | "ga" | "calendly" | "rateLimiting"): boolean {
  const env = getEnv();
  
  switch (feature) {
    case "plausible":
      return !!env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    case "ga":
      return !!env.NEXT_PUBLIC_GA_ID;
    case "calendly":
      return !!env.NEXT_PUBLIC_CALENDLY_URL;
    case "rateLimiting":
      return !!env.UPSTASH_REDIS_REST_URL && !!env.UPSTASH_REDIS_REST_TOKEN;
    default:
      return false;
  }
}
