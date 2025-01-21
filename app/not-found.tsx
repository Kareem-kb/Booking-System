// app/not-found.tsx
'use client';
import { redirect, useLocale } from '@/navigation';

export default function RootNotFound() {
  const locale = useLocale();
  redirect({ href: `/${locale}/not-found`, locale });
}
