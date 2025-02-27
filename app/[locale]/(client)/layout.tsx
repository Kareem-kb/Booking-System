'use client';

import { usePathname } from '@/navigation';
import NavBar from '@/app/components/bars/NavBar';
import Footer from '@/app/components/bars/Footer';
import SplashScreen from '@/helperFns/splash-Screen';
import { useState, useCallback } from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [showSplash, setShowSplash] = useState(isHome);

  const handleLoadingComplete = useCallback(() => {
    // Use setTimeout to avoid the setState during render error
    setTimeout(() => {
      setShowSplash(false);
    }, 0);
  }, [isHome]);

  return (
    <>
      {showSplash && <SplashScreen onLoadingComplete={handleLoadingComplete} />}
      <div className={showSplash ? 'hidden' : ''}>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
