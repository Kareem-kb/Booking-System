import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'BookEase ',
  description: 'Your description from above',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    url: 'https://yourdomain.com',
    title: 'BookEase',
    description: 'Your description',
    images: [{ url: '/og-image.png' }], // Add social sharing image
  },
};

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#988686' }],
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
