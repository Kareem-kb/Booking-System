import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

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
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      transitionDuration: {
        '2000': '2000ms',
        '2500': '2500ms',
      },
      colors: {
        primary: {
          light: '#D1D0D0',
          DEFAULT: '#988686',
          dark: '#5C4E4E',
        },
        secondary: {
          light: '#D1D0D0',
          DEFAULT: '#988686',
          dark: '#000000',
        },
        accent: {
          light: '#D1D0D0',
          DEFAULT: '#988686',
          dark: '#5C4E4E',
        },
        neutral: {
          100: '#FFFFFF',
          200: '#D1D0D0',
          300: '#988686',
          400: '#5C4E4E',
          500: '#000000',
        },
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#D1D0D0',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.h1': {
          fontSize: '1.875rem',
          fontWeight: '700',
          lineHeight: '2.25rem',
          color: '#000000',
          '@screen sm': {
            fontSize: '1.8rem',
            lineHeight: '2.5rem',
          },
        },
        '.h2': {
          fontSize: '1.5rem',
          fontWeight: '700',
          lineHeight: '2rem',
          color: '#D1D0D0',
          '@screen sm': {
            fontSize: '1.875rem',
            lineHeight: '2.25rem',
          },
        },
        '.h3': {
          fontSize: '1.15rem',
          fontWeight: '600',
          lineHeight: '1.75rem',
          color: '#988686',
          '@screen sm': {
            fontSize: '1.5rem',
            lineHeight: '2rem',
          },
        },
        '.body': {
          fontSize: '1rem',
          lineHeight: '1.5rem',
          color: '#988686',
          '@screen sm': {
            fontSize: '1.125rem',
            lineHeight: '1.75rem',
          },
        },
        p: {
          fontSize: '1rem',
          lineHeight: '1.5rem',
          color: '#00000',
          margin: '0.5rem 0',
          '@screen sm': {
            fontSize: '1.125rem',
            lineHeight: '1.75rem',
          },
        },
        input: {
          width: '100%',
          backgroundColor: '#D1D0D0',
          borderColor: '#988686',
          borderRadius: '0.375rem',
          padding: '0.2rem',
          borderWidth: '1px',
          fontSize: '0.875rem',
          color: '#000000',
          transition: 'all 0.2s ease-in-out',
          '@screen sm': {
            fontSize: '1rem',
            padding: '0.40rem',
          },
          '&:hover, &:focus': {
            outline: 'none',
            borderWidth: '1px',
            borderColor: '#5C4E4E',
            boxShadow: '0 0 0 2px rgba(92, 78, 78, 0.2)',
          },
        },
        '.error-message': {
          fontSize: '0.745rem',
          lineHeight: '0.7rem',
          color: '#ef4444',
          padding: '0rem 0.5rem',
          marginTop: '0.225rem',
        },
        '.btn-primary': {
          width: '100%',
          backgroundColor: '#5C4E4E',
          color: '#ffffff',
          padding: '0.75rem 1rem',
          borderRadius: '0.375rem',
          fontWeight: '500',
          transition: 'all 0.2s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          '@screen sm': {
            width: 'auto',
            padding: '0.5rem 1.5rem',
          },
          '&:hover': {
            backgroundColor: '#967C7C',
            color: '#000000',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        '.btn-secondary': {
          width: '100%',
          backgroundColor: '#D1D0D0',
          color: '#5C4E4E',
          padding: '0.75rem 1rem',
          borderRadius: '0.375rem',
          fontWeight: '500',
          transition: 'all 0.2s ease-in-out',
          '@screen sm': {
            width: 'auto',
            padding: '0.5rem 1.5rem',
          },
          '&:hover': {
            backgroundColor: '#988686',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        '.alert-error': {
          width: '100%',
          backgroundColor: '#fee2e2',
          borderColor: '#ef4444',
          borderWidth: '1px',
          color: '#991b1b',
          padding: '0.75rem',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          '@screen sm': {
            fontSize: '1rem',
            padding: '1rem',
          },
        },
        '.alert-success': {
          width: '100%',
          backgroundColor: '#d1fae5',
          borderColor: '#10b981',
          borderWidth: '1px',
          color: '#065f46',
          padding: '0.75rem',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          '@screen sm': {
            fontSize: '1rem',
            padding: '1rem',
          },
        },
      });
    }),
  ],
};

export default config;
