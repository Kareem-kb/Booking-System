'use client';

import { useState } from 'react';
import LanguageChanger from '@/app/components/inputs/LanguageChanger';
import { Link, usePathname } from '@/navigation';
import { useTranslations } from 'next-intl';
import {
  Bars3Icon,
  XMarkIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  const pathname = usePathname();
  // skipcq: JS-C1002
  const t = useTranslations('PartnerBar');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('content1'), href: '/dashboard', icon: HomeIcon },
    { name: t('content2'), href: '/add-branch', icon: CalendarIcon },
    { name: t('content3'), href: '/add-service', icon: FolderIcon },
    { name: t('content4'), href: '/add-staff', icon: UserGroupIcon },
    { name: t('content5'), href: '/sales', icon: DocumentDuplicateIcon },
  ];

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setMobileMenuOpen(false);
    }
  };

  const NavLinks = ({ mobile = false }) => (
    <ul role="list" className={mobile ? 'space-y-2' : '-mx-1'}>
      {navigation.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            onClick={() => mobile && setMobileMenuOpen(false)}
            className={classNames(
              pathname === item.href
                ? 'bg-primary-light text-primary-dark'
                : 'font-normal text-gray-700 hover:bg-primary hover:text-black',
              'group flex gap-x-2 rounded-md p-2 text-sm/6 font-semibold transition-all duration-200 ease-in-out',
              mobile ? 'py-3 text-base' : ''
            )}
          >
            <item.icon
              aria-hidden="true"
              className={classNames(
                pathname === item.href
                  ? 'stroke-2 text-primary-dark'
                  : 'text-black hover:text-black',
                'size-6 shrink-0 transition-colors duration-300'
              )}
            />
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-full">
        <aside className="flex grow flex-col gap-y-4 overflow-y-auto px-6 md:h-screen">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="mt-8 text-3xl font-bold text-primary">LOGO</h1>
          </div>
          <div className="flex flex-1 flex-col">
            <NavLinks />
            <div className="mt-14 border-t border-solid border-gray-300 pl-2">
              <LanguageChanger />
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Header */}
      <div className="fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-7xl justify-between bg-white px-4 py-4 md:hidden">
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-bold text-primary">LOGO</h1>
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
        >
          <span className="sr-only">Open menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 transition-opacity md:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={classNames(
          'fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 transition-transform duration-300 md:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">LOGO</h1>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 flex flex-1 flex-col">
          <NavLinks mobile />
          <div className="mt-auto border-t border-gray-200 pt-4">
            <LanguageChanger />
          </div>
        </div>
      </div>
    </>
  );
}
