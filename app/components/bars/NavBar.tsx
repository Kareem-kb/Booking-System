'use client';

import { useState, useCallback } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LanguageChanger from '@/app/components/inputs/LanguageChanger';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const navigation = [
  { id: 1, name: 'book an appointment', href: 'services-list' },
  { id: 2, name: 'Features', href: '#' },
];

export default function NavBar() {
  // skipcq: JS-C1002, JS-0356
  const t = useTranslations('NavBar');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuOpen = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const handleMenuClose = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Close menu when clicking on the overlay:
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // Ensure the click is on the overlay, not on the menu itself
      if (e.target && (e.target as HTMLElement).id === 'overlay') {
        setMobileMenuOpen(false);
      }
    },
    []
  );

  return (
    // skipcq: JS-0415
    <>
      {/* Top Navbar */}
      <nav
        aria-label="Global"
        className="mx-auto flex w-full max-w-7xl items-center justify-between bg-gray-700 p-6 lg:px-8 lg:backdrop-blur-lg"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
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
            onClick={handleMenuOpen}
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
        <div className="hidden gap-x-7 lg:flex lg:flex-1 lg:justify-end">
          <div className="flex gap-x-2">
            <LanguageChanger />|
          </div>
          <Link
            href="/login"
            className="text-sm font-semibold leading-6 text-gray-900 transition-all duration-300 hover:scale-125"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
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
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? 'translate-x-0 ease-out' : 'translate-x-full ease-in'
        } sm:ring-1 sm:ring-gray-900/10`}
      >
        {/* Header row inside panel */}
        <div className="flex items-center justify-between">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
          <button
            type="button"
            onClick={handleMenuClose}
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
                <LanguageChanger />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
