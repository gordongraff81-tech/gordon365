import { NextResponse } from 'next/server';
import { getClientCsrfToken } from '@/lib/csrf';

/**
 * API route to provide CSRF token to client-side code
 * 
 * This allows client-side forms to fetch the CSRF token
 * and include it in request headers for state-changing operations.
 */
export async function GET() {
  try {
    const { token, headerName } = await getClientCsrfToken();
    return NextResponse.json({ token, headerName });
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}
