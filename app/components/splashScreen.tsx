'use client';

import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onLoadingComplete: () => void;
}

const SplashScreen = ({ onLoadingComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setIsZooming(true);
          setTimeout(() => {
            onLoadingComplete();
          }, 600); // Matches the animation duration
          return 100;
        }
        return prevProgress + 1;
      });
    }, 25);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-neutral-100 backdrop-blur-sm ${isZooming ? 'zoom-container' : ''}`}
    >
      <div
        className={`w-64 overflow-hidden rounded-full bg-neutral-200 ${isZooming ? 'zoom-bar' : ''}`}
      >
        <div
          className="h-2 rounded-full bg-primary-dark transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span className="sr-only">{progress}% loaded</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
