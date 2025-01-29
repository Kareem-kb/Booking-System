'use client';

import { useEffect, useState } from 'react';
import { usePathname } from '@/navigation';
import NavBar from '@/app/components/bars/NavBar';
import Footer from '@/app/components/bars/Footer';
import SplashScreen from '@/app/components/splashScreen';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [showSplash, setShowSplash] = useState(isHome);

  useEffect(() => {
    if (!isHome) {
      setShowSplash(false);
    }
  }, [isHome]);

  const handleLoadingComplete = () => {
    // Use setTimeout to avoid the setState during render error
    setTimeout(() => {
      setShowSplash(false);
    }, 0);
  };

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
