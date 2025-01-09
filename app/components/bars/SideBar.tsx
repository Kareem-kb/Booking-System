'use client';

import { useState } from 'react';
import LanguageChanger from '@/app/components/inputs/LanguageChanger';
import { Link, usePathname } from '@/navigation';
import { useTranslations } from 'next-intl';
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: 'dashbord', icon: HomeIcon, current: true },
  { name: 'Services', href: '/add-service', icon: FolderIcon, current: false },
  {
    name: 'Business ',
    href: 'businesssettings',
    icon: CalendarIcon,
    current: false,
  },
  {
    name: 'Account ',
    href: 'accountsettings',
    icon: UserIcon,
    current: false,
  },
  {
    name: 'Sales',
    href: 'sales',
    icon: DocumentDuplicateIcon,
    current: false,
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function sideBar() {
  const t = useTranslations('NavBar');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu when clicking on the overlay:
  const handleOverlayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Ensure the click is on the overlay, not on the menu itself
    if (e.target && (e.target as HTMLElement).id === 'overlay') {
      setMobileMenuOpen(false);
    }
  };
  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-full">
        <aside className="flex grow flex-col gap-y-5 overflow-y-auto px-6 md:h-screen">
          <div className="flex h-16 shrink-0 items-center">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-500 text-white'
                        : 'text-gray-700 hover:bg-gray-500 hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={classNames(
                        item.current
                          ? 'text-white'
                          : 'text-black group-hover:text-white',
                        'size-6 shrink-0'
                      )}
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
      {/* here mobile  */}
      <div className="fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-7xl justify-between px-4 py-1 md:hidden">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img
            alt=""
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="h-8 w-auto"
          />
        </a>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <button
        id="overlay"
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={handleOverlayClick}
      />

      {/* Mobile Menu (Side Panel) */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? 'translate-x-0 ease-out' : 'translate-x-full ease-in'
        } sm:ring-1 sm:ring-gray-900/10`}
      >
        {/* Header row inside panel */}
        <div className="flex flex-row-reverse items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Nav Links in the mobile panel */}
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="py-6">
              <div>
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
