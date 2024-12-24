import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';
import verificationPage from './app/[locale]/(entries)/verification/page';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
});

const publicPaths = [
  '/',
  '/register',
  '/login',
  '/verification',
  '/not-found',
  '/en',
  '/ar',
];

const rolePaths = {
  client: ['/aboutUs', '/cakesection', '/Process', '/report'],
  partner: ['/dashboard', '/sales'],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const localeMatch = pathname.match(/^\/(en|ar)/);
  const locale = localeMatch ? localeMatch[1] : 'en';
  const normalizedPath = pathname.replace(/^\/(en|ar)/, '') || '/';

  // Public paths: skip auth
  if (publicPaths.some((path) => normalizedPath === path)) {
    console.log('This is a public path');
    return intlMiddleware(req);
  }

  // Try decoding JWT
  const token = await getToken({
    req,
    // Must match the same secret from your NextAuth config
    secret: process.env.AUTH_SECRET,
    // Omit cookieName to let getToken auto-detect (recommended)
    // cookieName: 'next-auth.session-token',
  });

  // If no token, redirect to login
  if (!token) {
    console.log('There is no token');
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  // Role-based routing
  if (
    token.role === 'client' &&
    rolePaths.client.some((path) => normalizedPath.startsWith(path))
  ) {
    console.log('This is a client role');
    return intlMiddleware(req);
  } else if (
    token.role === 'partner' &&
    rolePaths.partner.some((path) => normalizedPath.startsWith(path))
  ) {
    console.log('This is a partner role');
    return intlMiddleware(req);
  }

  // If none of the above, redirect to not-found
  return NextResponse.redirect(new URL(`/${locale}/not-found`, req.url));
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*|favicon.ico).*)',
    '/(en|ar)/:path*',
  ],
};
