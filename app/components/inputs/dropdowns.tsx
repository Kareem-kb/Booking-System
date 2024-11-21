'use client';

import { useRouter, usePathname } from '@/navigation';

interface LanguageChangerProps {
  locale: string;
}

export default function LanguageChanger({ locale }: LanguageChangerProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = e.target.value;
    const segments = pathname.split('/').filter(Boolean); // Remove empty segments

    if (segments[0] === locale) {
      segments[0] = selectedLocale; // Update the locale segment
    } else {
      segments.unshift(selectedLocale); // Add the locale segment if not present
    }

    const newPathname = '/' + segments.join('/');
    router.push(newPathname);
  };

  return (
    <select value={locale} onChange={handleChange}>
      <option value="en">English</option>
      <option value="ar">Arabic</option>
    </select>
  );
}
