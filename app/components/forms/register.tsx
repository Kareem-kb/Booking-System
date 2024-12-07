'use client';
import { FormikProvider, useFormik } from 'formik';
import clientSchema from '@/app/validation/client';
import { Link, useRouter, usePathname } from '@/navigation';
import { useTranslations } from 'next-intl';
import LanguageChanger from '@/app/components/inputs/LanguageChanger';

export default function RegisterForm() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('Register');
  const router = useRouter();

  interface FormValues {
    role: string;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      role: 'client',
      first_name: '',
      last_name: '',
      email: '',
      password_hash: '',
    },

    validationSchema: clientSchema,

    onSubmit: async (values) => {
      try {
        const res = await fetch('/api/users/', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            role: values.role,
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password_hash: values.password_hash,
          }),
        });
        if (res.ok) {
          router.push('/signin');
        }
      } catch (error) {
        console.log('user was not created', error);
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
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                {t('firstName')}
              </label>
              <div className="mt-2">
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.first_name}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                  <p className="ml-2 text-xs text-red-500">
                    {formik.errors.first_name}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                {t('lastName')}
              </label>
              <div className="mt-2">
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.last_name}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                  <p className="ml-2 text-xs text-red-500">
                    {formik.errors.last_name}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
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
          <div>
            {' '}
            <label
              htmlFor="password_hash"
              className="block text-sm/6 font-medium text-gray-900"
            >
              {t('password')}
            </label>
            <div className="mt-2">
              <input
                id="password_hash"
                name="password_hash"
                type="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password_hash}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm/6">
              <Link
                href="/signin"
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
        <div className="relative mt-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center"
          >
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm/6 font-medium">
            <span className="bg-white px-6 text-gray-900">{t('content4')}</span>
          </div>
        </div>
      </FormikProvider>
    </>
  );
}
