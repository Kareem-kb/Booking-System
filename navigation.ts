// @/navigation
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'ar'];

const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

export function useLocale() {
  const pathname = usePathname();
  // e.g. '/', '/en', '/register', '/en/register'
  const segments = pathname.split('/');
  // e.g. [''], ['','en'], ['','register'], ['','en','register']

  // If second segment is a recognized locale, return it
  if (segments.length > 1 && locales.includes(segments[1])) {
    return segments[1] as 'en' | 'ar';
  }

  // Otherwise, default to 'en'
  return 'en';
}
