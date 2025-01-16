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
