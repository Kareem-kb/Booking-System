// middleware.ts
import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales } from '@/navigation';
import { getToken } from 'next-auth/jwt';

// Define routes configuration
const routesConfig = {
  public: ['/', '/register', '/login', '/verification', '/not-found', '/logout'],
  client: ['/aboutUs', '/services-list', '/Process', '/report'],
  partner: [
    '/dashboard',
    '/sales',
    '/add-service',
    '/add-branch',
    '/add-staff',
  ],
} as const;

// Create internationalization middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Handle paths without locale prefix
  if (!pathnameHasLocale) {
    return intlMiddleware(request);
  }

  // Extract locale and normalized path
  const locale = pathname.split('/')[1];
  const normalizedPath = pathname.replace(/^\/(en|ar)/, '') || '/';

  // Check if path is public
  if (
    routesConfig.public.includes(
      normalizedPath as (typeof routesConfig.public)[number]
    )
  ) {
    return intlMiddleware(request);
  }

  // Verify authentication
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return Response.redirect(loginUrl);
  }

  // Role-based access control
  const userRole = token.role as keyof typeof routesConfig;
  const isAuthorized = routesConfig[userRole]?.some((path) =>
    normalizedPath.startsWith(path)
  );

  if (!isAuthorized) {
    return Response.redirect(new URL(`/${locale}/not-found`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*|favicon.ico).*)',
    '/(en|ar)/:path*',
  ],
};
