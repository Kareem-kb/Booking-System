'use client';
import { useActionState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { redirect, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import SubmitButton from '@/app/components/buttons/SubmitButton';
import { verifyCodeAction } from '@/app/actions/userActions';

export default function VerifyForm() {
  const [state, formAction, isPending] = useActionState(verifyCodeAction, null);

  //   skipcq: JS-C1002
  const t = useTranslations('Verify');
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  useEffect(() => {
    if (!email) {
      redirect('/not-found');
    }
    if (state?.success) {
      toast.success('Verification successful');
      redirect('/');
    }
    if (state?.generalError) {
      toast.error(state.generalError);
    }
  }, [email, state?.success, state?.generalError]);

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        {t('title')}
      </h1>
      {email && <p className="text-center text-sm text-gray-500">{email}</p>}
      <form action={formAction} className="space-y-6">
        <div>
          <input type="hidden" name="email" value={email ?? ''} />
          <label
            htmlFor="code"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            {t('codeLabel')}
          </label>
          <input
            name="code"
            type="text"
            maxLength={6}
            inputMode="numeric"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-center text-lg tracking-widest shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="000000"
          />
          {state?.errors && (
            <div>
              <p className="error-message">{state.errors?.code}</p>
              <p className="error-message">{state.errors?.email}</p>
            </div>
          )}
        </div>
        <SubmitButton text={t('verifyButton')} isPending={isPending} />
      </form>
    </>
  );
}
