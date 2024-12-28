import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '../../i18n';
import { locales } from '@/navigation';
import NavBar from '../components/bars/NavBar';
import Footer from '../components/bars/Footer';

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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <main>{children}</main>
    </NextIntlClientProvider>
  );
}
