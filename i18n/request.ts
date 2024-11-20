import createMiddleware from 'next-intl/middleware';
import path from 'path';

export const locales = ['en', 'ar'];
export const defaultLocale = 'en';

const middleware = createMiddleware({
  locales,
  defaultLocale,
});

export default middleware;

export async function getMessages(locale: string) {
  const filePath = `/messages/${locale}.json`;
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const messages = await response.json();
    return messages;
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    return null;
  }
}
