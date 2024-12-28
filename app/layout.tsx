import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kareem-KB PWA',
  description: 'Your app description',
  manifest: '/manifest.json',
  // themeColor: '#35155D',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Kareem-KB PWA',
  },
};
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'your-light-color' },
    { media: '(prefers-color-scheme: dark)', color: 'your-dark-color' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sajil" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head> */}
      <body className={`flex h-full flex-col ${inter.className}`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
