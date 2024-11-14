import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'en',
});

// only applies this middleware to files in the app directory
export const config = {
  matcher: ['/', '/(ar|en)/:path*'],
};
