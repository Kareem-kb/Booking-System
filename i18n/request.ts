import createMiddleware from 'next-intl/middleware';

export const locales = ['en', 'ar'];
export const defaultLocale = 'en';

const middleware = createMiddleware({
  locales,
  defaultLocale,
});

export default middleware;

export async function getMessages(locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/messages?locale=${locale}`);
  if (!response.ok) {
    console.error(`Error loading messages for locale ${locale}: ${response.statusText}`);
    return null;
  }
  const messages = await response.json();
  return messages;
}
