'use client';

import { useActionState } from 'react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { createUserAction } from '@/app/actions/userActions';

export default function RegisterForm() {
  const [state, formAction, isPendding] = useActionState(
    createUserAction,
    null
  );
  const t = useTranslations('Register');

  return (
    <>
      <div className="absolute right-5 top-5"></div>
      <h2 className="col-span-11 mb-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        {t('title')}
      </h2>
      <form action={formAction} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm/6 font-medium text-gray-900"
          >
            {t('firstName')}
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        {/* Display name-related error */}
        {state?.errors?.name && (
          <p className="mt-2 text-sm text-red-600">{state.errors.name}</p>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            {t('email')}
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
          {/* Display email-related error */}
          {state?.errors?.email && (
            <p className="mt-2 text-sm text-red-600">{state.errors.email}</p>
          )}
        </div>
        <input type="hidden" name="role" value="client" />

        <div className="flex items-center justify-between">
          <div className="text-sm/6">
            <Link
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {t('content2')}
            </Link>
          </div>
        </div>

        <button type="submit">{isPendding ? 'Adding...' : 'Add Task'}</button>
        {/* Display general error or success message */}
      </form>
      <div className="relative mt-10">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm/6 font-medium">
          <span className="bg-white px-6 text-gray-900">{t('content4')}</span>
        </div>
      </div>
    </>
  );
}
