'use client';

import { useActionState, useEffect } from 'react';
import { Link, useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { createUserAction } from '@/app/actions/userActions';
import SubmitButton from '../../buttons/SubmitButton';
import { toast } from 'sonner';

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(createUserAction, null);
  const t = useTranslations('Register');
  const router = useRouter();

  useEffect(() => {
    const handleStateChange = async () => {
      if (state?.generalError) {
        toast.error(state.generalError);
        return;
      }
      if (state?.success) {
        toast.success(state.success);
        await new Promise((resolve) => setTimeout(resolve, 900));
        router.push('/verification');
      }
    };
    handleStateChange();
  }, [state?.generalError, state?.success, router]);

  return (
    <>
      <div className="absolute right-5 top-5" />
      <h2 className="col-span-11 mb-4 text-center text-2xl/9 font-bold text-gray-900">
        {t('title')}
      </h2>
      <form action={formAction} className="space-y-5">
        <input type="hidden" name="role" value="client" />
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-900"
          >
            {t('name')}
          </label>
          <input name="name" type="text" className="input" />
          <div className="h-5">
            {state?.errors?.name && (
              <p className="error-message">{state.errors.name}</p>
            )}
          </div>
        </div>

        {/* Email Field */}
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

        {/* Login Link */}
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              href="/login"
              className="font-semibold text-black/60 hover:text-primary"
            >
              {t('link')}
            </Link>
          </div>
        </div>
        {/* Submit Button */}
        <SubmitButton text={t('button')} isPending={isPending} />
      </form>
      {/* Divider */}
      <div className="relative mt-10">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm font-semibold text-black/70">
          <span className="backdrop-blur-lg">{t('content1')} </span>
        </div>
      </div>
    </>
  );
}
