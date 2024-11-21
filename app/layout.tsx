import './globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
// Need to get back for the metadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full bg-gray-50">
      <Head>
        <title>Your Website Title</title>
        <meta name="description" content="Your website description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`flex h-full flex-col ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
