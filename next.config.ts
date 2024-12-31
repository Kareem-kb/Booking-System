import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/**@type {import ('next').NextConfig} */
const NextConfig = {
  productionBrowserSourceMaps: true,
  env: {
    NEXT_PUBLIC_BASE_URL:
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
  // ...existing code...
};

export default withNextIntl(NextConfig);
