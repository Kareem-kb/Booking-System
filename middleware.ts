// import createMiddleware from 'next-intl/middleware';

// export default createMiddleware({
//   locales: ['en', 'ar'],
//   defaultLocale: 'en',
// });

// // only applies this middleware to files in the app directory
// export const config = {
//   matcher: ['/', '/(en|ar)/:path*'],
// };

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
});

const publicPaths = ['/', '/register', '/login', '/verification'];

const rolePaths = {
  client: ['/aboutUs', '/cakesection', '/Process', '/report'],
  partner: ['/dashboard', '/sales'],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Step 1: Extract locale and normalize the path
  const localeMatch = pathname.match(/^\/(en|ar)/);
  const locale = localeMatch ? localeMatch[1] : 'en';
  const normalizedPath = pathname.replace(/^\/(en|ar)/, '');

  // Step 2: Allow access to public paths
  if (publicPaths.some((path) => normalizedPath === path)) {
    console.log('This is a public path');
    return intlMiddleware(req);
  }

  // Step 3: Fetch the token for authentication
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    cookieName: 'next-auth.session-token',
  });
  // Step 4: Redirect to signin if no token is found
  if (!token) {
    console.log('There is no token');
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }
  console.log('Middleware called. Request URL:', req.url);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
  console.log('Token:', token);
  // Step 5: Role-based access control
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

  // Step 6: Redirect to not-found for unauthorized access
  return NextResponse.redirect(new URL(`/${locale}/not-found`, req.url));
}

export const config = {
  matcher: [
    '/(en|ar)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|_next).*)',
  ],
};
