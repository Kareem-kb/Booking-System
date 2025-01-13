'use client';

import { useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { logInUser } from '@/app/actions/userActions';
import SubmitButton from '@/app/components/buttons/SubmitButton';

export default function LogInForm() {
  const t = useTranslations('Register');
  const [isSubmitting, setIsSubmitting] = useState<
    'notSubmitted' | 'pending' | 'done' | 'register'
  >('notSubmitted');

  interface FormValues {
    email: string;
  }
  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),

    onSubmit: async (formData, { setErrors }) => {
      setIsSubmitting('pending');
      try {
        const result = await logInUser(formData);
        if (result.success) {
          setIsSubmitting('done');
          // Show success message
        } else if (result.message === 'User not found in the database.') {
          setIsSubmitting('register');
          setErrors({ email: result.message });
        } else {
          setIsSubmitting('notSubmitted');
          setErrors({ email: result.message });
        }
      } catch (error) {
        console.error('Login error:', error);
        setIsSubmitting('notSubmitted');
        setErrors({ email: 'An unexpected error occurred. Please try again.' });
      }
    },
  });

  return (
    <>
      <div className="absolute right-5 top-5"></div>
      <h2 className="col-span-11 mb-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        {t('title')}
      </h2>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="ml-2 text-xs text-red-500">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm/6">
              <Link
                href="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {t('content2')}
              </Link>
            </div>
          </div>
          <SubmitButton
            classname=""
            type="submit"
            isSubmitting={isSubmitting}
            text1="Login"
            text2="Check  your mailbox"
            text3="Register"
            linkTo="/register"
          />
        </form>
      </FormikProvider>
    </>
  );
}
