/**
 * Provider-agnostic rate limiting implementation
 * 
 * Supports multiple providers:
 * - Upstash Redis (recommended for production)
 * - In-memory fallback (for development)
 * 
 * Usage:
 * import { rateLimit } from '@/lib/rateLimit';
 * 
 * const { success, limit, remaining, reset } = await rateLimit({
 *   identifier: userId || ip,
 *   limit: 10,
 *   window: 60, // seconds
 * });
 */

import { NextResponse } from 'next/server';
import { getEnv, isFeatureEnabled } from './env';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface RateLimitOptions {
  identifier: string;
  limit: number;
  window: number; // seconds
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp
}

interface RateLimitProvider {
  check(options: RateLimitOptions): Promise<RateLimitResult>;
}

// ── In-Memory Provider (Fallback) ─────────────────────────────────────────────

class InMemoryRateLimit implements RateLimitProvider {
  private store = new Map<string, { count: number; reset: number }>();

  async check(options: RateLimitOptions): Promise<RateLimitResult> {
    const { identifier, limit, window } = options;
    const now = Math.floor(Date.now() / 1000);
    const reset = now + window;
    const key = identifier;

    const existing = this.store.get(key);

    if (existing && existing.reset > now) {
      // Window still active, increment count
      existing.count++;
      const remaining = Math.max(0, limit - existing.count);
      return {
        success: existing.count <= limit,
        limit,
        remaining,
        reset: existing.reset,
      };
    } else {
      // New window or expired
      this.store.set(key, { count: 1, reset });
      return {
        success: true,
        limit,
        remaining: limit - 1,
        reset,
      };
    }
  }
}

// ── Upstash Redis Provider ───────────────────────────────────────────────────

class UpstashRateLimit implements RateLimitProvider {
  private url: string;
  private token: string;

  constructor(url: string, token: string) {
    this.url = url;
    this.token = token;
  }

  async check(options: RateLimitOptions): Promise<RateLimitResult> {
    const { identifier, limit, window } = options;
    const now = Math.floor(Date.now() / 1000);
    const reset = now + window;
    const key = `ratelimit:${identifier}`;

    try {
      const response = await fetch(`${this.url}/incr/${key}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({ ex: window }),
      });

      if (!response.ok) {
        throw new Error(`Upstash request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const count = data.result;

      // Set expiration if this is the first request
      if (count === 1) {
        await fetch(`${this.url}/expire/${key}/${window}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
      }

      const remaining = Math.max(0, limit - count);
      return {
        success: count <= limit,
        limit,
        remaining,
        reset,
      };
    } catch (error) {
      console.error('Upstash rate limit error, falling back to in-memory:', error);
      // Fallback to in-memory on error
      return inMemoryProvider.check(options);
    }
  }
}

// ── Provider Selection ───────────────────────────────────────────────────────

const inMemoryProvider = new InMemoryRateLimit();
let upstashProvider: UpstashRateLimit | null = null;

function getProvider(): RateLimitProvider {
  if (isFeatureEnabled('rateLimiting')) {
    if (!upstashProvider) {
      const env = getEnv();
      if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
        upstashProvider = new UpstashRateLimit(
          env.UPSTASH_REDIS_REST_URL,
          env.UPSTASH_REDIS_REST_TOKEN
        );
      }
    }
    return upstashProvider || inMemoryProvider;
  }
  return inMemoryProvider;
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Check if a request should be rate limited
 * 
 * @param options - Rate limit configuration
 * @returns Rate limit result with success status and metadata
 */
export async function rateLimit(options: RateLimitOptions): Promise<RateLimitResult> {
  const provider = getProvider();
  return provider.check(options);
}

/**
 * Get rate limit headers for HTTP responses
 * 
 * @param result - Rate limit result from rateLimit()
 * @returns Headers object with rate limit information
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.reset.toString(),
  };
}

/**
 * Create a NextResponse with rate limit headers
 * 
 * @param result - Rate limit result from rateLimit()
 * @param response - NextResponse to add headers to
 * @returns NextResponse with rate limit headers
 */
export function withRateLimitHeaders(
  result: RateLimitResult,
  response: NextResponse
): NextResponse {
  const headers = getRateLimitHeaders(result);
  
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}
