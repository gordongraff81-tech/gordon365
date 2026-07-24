/**
 * CSRF Protection Implementation
 * 
 * Uses double-submit cookie pattern with HTTP-only cookies
 * 
 * For API routes called from the frontend:
 * 1. Client reads CSRF token from cookie
 * 2. Client includes token in request header (X-CSRF-Token)
 * 3. Server validates token matches cookie
 * 
 * This protects against CSRF while allowing fetch() calls from same origin
 */

import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';

const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'X-CSRF-Token';
const TOKEN_LENGTH = 32;

// ── Token Generation ─────────────────────────────────────────────────────────────

/**
 * Generate a random CSRF token
 */
function generateToken(): string {
  return randomBytes(TOKEN_LENGTH).toString('hex');
}

/**
 * Get or create CSRF token from cookie
 */
export async function getCsrfToken(): Promise<string> {
  const cookieStore = await cookies();
  const existingToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;
  
  if (existingToken) {
    return existingToken;
  }
  
  // Generate new token
  const newToken = generateToken();
  cookieStore.set({
    name: CSRF_COOKIE_NAME,
    value: newToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });
  
  return newToken;
}

// ── Token Validation ───────────────────────────────────────────────────────────

/**
 * Validate CSRF token from request headers
 * 
 * @param request - NextRequest to validate
 * @param require - If true, token must be present and valid. If false, only validate if provided.
 * @returns true if token is valid (or not required and not provided), false otherwise
 */
export async function validateCsrfToken(request: Request, require: boolean = false): Promise<boolean> {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get(CSRF_HEADER_NAME);
  
  // If not required and no header provided, skip validation
  if (!require && !headerToken) {
    return true;
  }
  
  // Both tokens must be present and match
  if (!cookieToken || !headerToken) {
    return false;
  }
  
  return cookieToken === headerToken;
}

/**
 * Validate CSRF token with custom error response
 * 
 * @param request - NextRequest to validate
 * @returns NextResponse with error if invalid, null if valid
 */
export async function requireCsrfToken(request: Request): Promise<Response | null> {
  const isValid = await validateCsrfToken(request);
  
  if (!isValid) {
    return new Response(
      JSON.stringify({ error: 'Invalid CSRF token' }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  
  return null;
}

// ── Client-Side Helpers ───────────────────────────────────────────────────────

/**
 * Get CSRF token for client-side use
 * This should be called from a Server Action or API route that returns the token to the client
 */
export async function getClientCsrfToken(): Promise<{ token: string; headerName: string }> {
  const token = await getCsrfToken();
  return {
    token,
    headerName: CSRF_HEADER_NAME,
  };
}

/**
 * Add CSRF token to fetch headers
 * 
 * @param headers - Existing headers object
 * @param token - CSRF token
 * @returns Headers with CSRF token added
 */
export function addCsrfToHeaders(headers: HeadersInit, token: string): HeadersInit {
  if (typeof headers === 'object' && !Array.isArray(headers)) {
    return {
      ...headers,
      [CSRF_HEADER_NAME]: token,
    };
  }
  
  // Handle Headers object or array
  const newHeaders = new Headers(headers);
  newHeaders.set(CSRF_HEADER_NAME, token);
  return newHeaders;
}
