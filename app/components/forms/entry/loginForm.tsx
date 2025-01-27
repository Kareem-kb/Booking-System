'use client';

import { useActionState, useEffect } from 'react';
import { Link } from '@/navigation';
import { logInUserAction } from '@/app/actions/userActions';
import { useTranslations } from 'next-intl';
import SubmitButton from '../../buttons/SubmitButton';
import { toast } from 'sonner';

export default function LogInForm() {
  const t = useTranslations('Signin');
  const [state, formAction, isPending] = useActionState(logInUserAction, null);

  useEffect(() => {
    if (state?.generalError) {
      toast.error(state.generalError);
      return;
    }
  }, [state?.generalError]);

  return (
    <>
      <div className="absolute right-5 top-5" />
      <h2 className="col-span-11 mb-4 text-center text-2xl/9 font-bold text-gray-900">
        {t('title')}
      </h2>
      <form action={formAction} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-900"
          >
            {t('email')}
          </label>
          <input name="email" type="text" className="" />
          <div className="h-5">
            {state?.errors?.email && (
              <p className="error-message">{state.errors.email}</p>
            )}
          </div>
        </div>
        <div className="text-sm">
          <Link
            href="/register"
            className="font-semibold text-black/60 hover:text-primary"
          >
            {t('link')}
          </Link>
        </div>
        <SubmitButton text={t('button')} isPending={isPending} />
      </form>
    </>
  );
}
