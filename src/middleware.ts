import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './helpers/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth for public routes
  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    return NextResponse.next();
  }

  // Verify token
  const token = request.cookies.get('token')?.value;
  let verifiedToken;

  try {
    verifiedToken = token && verifyToken(token);
  } catch (err) {
    request.cookies.delete('token');
  }

  // Redirect to login if no valid token
  if (!verifiedToken && !pathname.startsWith('/auth')) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based redirection
  if (verifiedToken) {
    if (pathname.startsWith('/admin') && verifiedToken.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    if (pathname.startsWith('/dashboard') && verifiedToken.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};