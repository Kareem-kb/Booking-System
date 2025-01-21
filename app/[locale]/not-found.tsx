// app/[locale]/not-found.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

export default function LocalizedNotFound() {
  const t = useTranslations('Not-Found');

  return (
    <div className="relative isolate min-h-full">
      <div className="absolute inset-0 -z-10">
        <svg
          aria-hidden="true"
          className="size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        >
          <defs>
            <pattern
              id="not-found-pattern"
              width={200}
              height={200}
              x="0"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" stroke="gray" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#not-found-pattern)"
          />
        </svg>
      </div>
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-600">{t('header')}</p>
          <h1 className="mt-4 text-3xl font-semibold text-primary sm:text-5xl md:text-7xl">
            {t('title')}
          </h1>
          <p className="mt-6 text-base text-gray-600/70 sm:text-lg md:text-xl">
            {t('description')}
          </p>
          <Link
            href="/"
            className="mt-8 inline-block font-semibold text-black/60 transition-all duration-300 hover:scale-105 hover:text-primary"
          >
            ← {t('button')}
          </Link>
        </div>
      </div>
    </div>
  );
}
