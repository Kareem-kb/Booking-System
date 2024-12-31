import './globals.css';
import type { Metadata, Viewport } from 'next';

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
  return children;
}
