import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

const locales = ['en', 'ar'];

export default getRequestConfig(async ({ requestLocale }) => {
  const headersList = await headers();
  const localeHeader = headersList.get('X-NEXT-INTL-LOCALE') || requestLocale;

  if (!locales.includes(localeHeader as string)) {
    notFound();
  }
  return {
    messages: (await import(`./messages/${localeHeader}.json`)).default,
  };
});

export async function getMessages(locale: string) {
  try {
    const messages = (await import(`./messages/${locale}.json`)).default;
    return messages;
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    return null;
  }
}
