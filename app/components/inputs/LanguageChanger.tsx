'use client';

import { useRouter, usePathname } from '@/navigation';
import { usePathname as realpath } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function LanguageChanger() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('LanguageChanger');
  const localnow = realpath().split('/')[1];

  const [showList, setShowList] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  // console.log('here it is in langchanger ', nowlocale);

  const handleChange = (newLocale: string) => {
    setIsChanged(!isChanged);
    router.push(pathname, { locale: newLocale });
  };
  const viewList = () => {
    setShowList((prev) => !prev);
  };

  return (
    <>
      <div className="overflow-hidden">
        <button
          onClick={viewList}
          className=" inline-flex w-full  text-base font-semibold"
        >
          {t('language')}
        </button>
        <div
          className={`absolute z-10 w-24 text-base font-semibold leading-7 text-black transition-all duration-500 ease-in-out overflow-hidden ${
            showList ? 'max-h-24 opacity-90' : 'max-h-0 opacity-55'
          }`}
        >
          <div>
            <button
              onClick={() => handleChange('en')}
              className="block w-full py-2 text-left text-black text-base font-semibold disabled:text-gray-400"
              disabled={localnow === 'en'}
            >
              English
            </button>
            <button
              onClick={() => handleChange('ar')}
              className="block w-full py-1 text-left text-base font-semibold text-black disabled:text-gray-400 "
              disabled={localnow === 'ar'}
            >
              عربي
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
