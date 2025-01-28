'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import SubmitButton from '@/app/components/buttons/SubmitButton';

export default function VerifyPage() {
  //   skipcq: JS-C1002
  const t = useTranslations('Verify');
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [code, setCode] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      if (!email) {
        throw new Error('Email is required');
      }

      const result = await signIn('credentials', {
        email,
        code,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(t('success'));
        router.push('/');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
    } finally {
      setIsPending(false);
    }
  };

  // Handle input change - only allow numbers and max 6 digits
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          {t('title')}
        </h1>
        {email && <p className="text-center text-sm text-gray-500">{email}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="code"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              {t('codeLabel')}
            </label>
            <input
              id="code"
              type="text"
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              value={code}
              onChange={handleCodeChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-center text-lg tracking-widest shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="000000"
              required
            />
            <p className="mt-2 text-sm text-gray-500">{t('codeSent')}</p>
          </div>

          <SubmitButton text={t('verifyButton')} isPending={isPending} />
        </form>
      </div>
    </div>
  );
}
