import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'ar'];
export const localePrefix = 'as-needed';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });

// Ensure the locale is correctly derived from the URL
export function useLocale() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  return locales.includes(locale) ? locale : 'en';
}
