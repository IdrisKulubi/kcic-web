import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for api routes and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/icons') ||
    pathname.includes('.')
  ) {
    return;
  }

  // Handle staff routes authentication
  if (pathname.startsWith('/staff')) {
    if (pathname === '/staff/login') {
      return NextResponse.next();
    }

    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      if (!session) {
        const url = request.nextUrl.clone();
        url.pathname = '/staff/login';
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      const url = request.nextUrl.clone();
      url.pathname = '/staff/login';
      return NextResponse.redirect(url);
    }
  }

  // Handle French locale routes - redirect /fr and /fr/* to home for now
  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    // For now, redirect French users to the home page with a locale parameter
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('locale', 'fr');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/staff", "/staff/:path*", "/fr", "/fr/:path*"],
};
