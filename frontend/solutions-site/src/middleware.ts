import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { method, nextUrl } = req;
  const { pathname } = nextUrl;

  // Block non-GET/HEAD methods on page routes (not API routes, not _next, not static files)
  // This prevents Next.js from crashing when bots POST to page routes
  if (
    method !== 'GET' &&
    method !== 'HEAD' &&
    !pathname.startsWith('/api/') &&
    !pathname.startsWith('/_next/') &&
    !pathname.match(/\.[a-z0-9]+$/i) // static file extensions
  ) {
    return new NextResponse(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
