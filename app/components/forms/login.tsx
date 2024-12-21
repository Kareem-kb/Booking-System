'use client';

import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useRouter, usePathname } from '@/navigation';
import { useTranslations } from 'next-intl';
import LanguageChanger from '@/app/components/inputs/LanguageChanger';
import { logInUser } from '@/app/actions/userActions';

export default function LogInForm() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('Register');
  const router = useRouter();

  interface FormValues {
    email: string;
  }
  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string(),
    }),

    onSubmit: async (formData, { setErrors }) => {
      const result = await logInUser(formData);

      if (!result) {
        setErrors({ email: 'Error during user authentication' });
      }
    },
  });

  return (
    <>
      <div className="absolute right-5 top-5">
        <LanguageChanger locale={locale} />
      </div>
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
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-primary-dark px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t('content3')}
          </button>
        </form>
      </FormikProvider>
    </>
  );
}
