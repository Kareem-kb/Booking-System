'use client';

import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LanguageChanger from '@/app/components/inputs/LanguageChanger';
import { Link, useRouter, usePathname } from '@/navigation';
import { useTranslations } from 'next-intl';

const navigation = [
  { id: 1, name: 'Product', href: '#' },
  { id: 2, name: 'Features', href: '#' },
  { id: 3, name: 'Marketplace', href: '#' },
  { id: 4, name: 'Company', href: '#' },
];

export default function NavBar() {
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
      {/* Top Navbar */}
      <nav
        aria-label="Global"
        className="mx-auto fixed top-0 left-0 right-0 z-50 flex items-center justify-between  p-6 lg:px-8 lg:backdrop-blur-lg max-w-7xl"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
        </div>
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        {/* Desktop Login Link */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-7">
          <div className="flex gap-x-2">
            <LanguageChanger />|
          </div>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>

      {/* Overlay */}

      <button
        id="overlay"
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={handleOverlayClick}
      />

      {/* Mobile Menu (Side Panel) */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 transition-transform duration-300
          ${
            mobileMenuOpen
              ? 'translate-x-0 ease-out'
              : 'translate-x-full ease-in'
          }
          sm:ring-1 sm:ring-gray-900/10
        `}
      >
        {/* Header row inside panel */}
        <div className="flex items-center justify-between">
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
                {' '}
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
                <LanguageChanger />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
