import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

module.exports = withNextIntl({
  // Your other Next.js config
});
