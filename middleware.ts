import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
});

// only applies this middleware to files in the app directory
export const config = {
  matcher: ['/', '/(en|ar)/:path*'],
};
