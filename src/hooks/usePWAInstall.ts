import { useEffect, useState } from 'react';

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }

  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
    prompt(): Promise<void>;
  }
}

export default function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    (deferredPrompt as BeforeInstallPromptEvent).prompt();
    const { outcome } = await (deferredPrompt as BeforeInstallPromptEvent)
      .userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  return { install, canInstall: Boolean(deferredPrompt) };
}
