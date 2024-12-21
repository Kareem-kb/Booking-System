'use client';

import { useRouter, usePathname } from '@/navigation';
import { useState } from 'react';
import Image from 'next/image';

interface LanguageChangerProps {
  locale: string;
}

export default function LanguageChanger({ locale }: LanguageChangerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showList, setShowList] = useState(false);

  const handleChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  const viewList = () => {
    setShowList((prev) => !prev);
  };

  return (
    <>
      <div>
        <button
          onClick={viewList}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <Image
            src="/images/Arrow-Down-Icon.svg"
            alt="Window icon"
            width={10}
            height={10}
            style={{ width: 'auto', height: 'auto' }}
          />
          <Image
            src="/images/Language-icon.svg"
            alt="Window icon"
            width={10}
            height={10}
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
        </button>
        {showList && (
          <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
            <button
              onClick={() => handleChange('en')}
              disabled={locale === 'en'}
            >
              English
            </button>
            <button
              onClick={() => handleChange('ar')}
              disabled={locale === 'ar'}
            >
              Arabic
            </button>
          </div>
        )}
      </div>
    </>
  );
}
