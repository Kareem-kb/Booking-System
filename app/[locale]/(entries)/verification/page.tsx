'use client';
import { useTranslations } from 'next-intl';
import { signOut, useSession } from 'next-auth/react';

export default function verificationPage() {
  const { data: session } = useSession();
  const t = useTranslations('AboutUs');
  console.log('sesstion is', session);
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Email
      </label>
      <div className="mt-2">
        <button onClick={() => signOut()}>click here</button>
      </div>
    </div>
  );
}
