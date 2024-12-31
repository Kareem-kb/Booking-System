import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/[locale]/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      transitionDuration: {
        '2000': '2000ms',
        '2500': '2500ms',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          light: '#2563EB',
          DEFAULT: '#1E3A8A',
          dark: '#1E3A8A',
        },
        secondary: {
          light: '#14B8A6',
          DEFAULT: '#0F766E',
          dark: '#115E59',
        },
        accent: {
          light: '#FCD34D',
          DEFAULT: '#CA8A04',
          dark: '#A16207',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        success: {
          light: '#34D399',
          DEFAULT: '#059669',
          dark: '#065F46',
        },
        error: {
          light: '#EF4444',
          DEFAULT: '#DC2626',
          dark: '#B91C1C',
        },
        warning: {
          light: '#FBBF24',
          DEFAULT: '#D97706',
          dark: '#B45309',
        },
        info: {
          light: '#38BDF8',
          DEFAULT: '#0284C7',
          dark: '#075985',
        },
      },
    },
  },
  plugins: [],
};

export default config;
