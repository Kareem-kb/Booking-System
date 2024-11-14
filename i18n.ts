import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export const locales = ['ar', 'en'];

export default getRequestConfig(async () => {
  const localeHeader = (await headers()).get('X-NEXT-INTL-LOCALE');
  const locale = localeHeader || 'defaultLocale';

  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`/messages/${locale}.json`)).default,
  };
});
