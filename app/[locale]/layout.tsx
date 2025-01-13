import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '../../i18n';
import { locales } from '@/navigation';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Validate the locale
  if (!locales.includes(locale)) {
    notFound(); // Automatically throws a 404
  }

  // Fetch translations
  const messages = await getMessages(locale).catch((error) => {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound();
  });

  // If messages are missing
  if (!messages) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`bg-gray-200 ${inter.className}`}>
        <SessionProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
