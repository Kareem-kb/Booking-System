import createNextIntlPlugin from 'next-intl/plugin';
import { NextConfig } from 'next'; // Import NextConfig type

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const config: NextConfig = {
  productionBrowserSourceMaps: true,
  env: {
    NEXT_PUBLIC_BASE_URL:
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https', // Explicitly typed as "https"
        hostname: 'higssmppvjoqahjxesne.supabase.co',
        port: '', // Optional, can be omitted if not needed
      },
    ],
  },
};

export default withNextIntl(config);
