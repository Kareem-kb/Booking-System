'use client';
import { FormikProvider, useFormik } from 'formik';
import clientSchema from '@/app/validation/client';
import { Link, useRouter, usePathname } from '@/navigation';
import { useTranslations } from 'next-intl';
import LanguageChanger from '@/app/components/inputs/LanguageChanger';
// import createUser from '@/app/actions/userActions';
import { signIn } from 'next-auth/react';
import createUser from '@/app/actions/userActions';
import { redirect } from 'next/dist/server/api-utils';

export default function RegisterForm() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('Register');
  const router = useRouter();

  interface FormValues {
    role: string;
    name: string;
    email: string;
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      role: 'client',
      name: '',
      email: '',
    },

    validationSchema: clientSchema,

    onSubmit: async (formData) => {
      // console.log(formData);
      // const redirectURL = await createUser(formData);
      // router.push(redirectURL as string);

      //confirm email and message field are not empty
      if (!formData.email) {
        console.log('need to ne filled');
        return;
      }

      try {
        const response = await fetch('/api/verification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            role: formData.role,
            name: formData.name,
            email: formData.email,
          }),
        });

        // handle success
        if (response.ok) {
          console.log('Email Sent Successfully!');
        } else {
          console.log('There was a problem sending email. Pls try again!');
        }
      } catch (error) {
        console.log('Error sending email:', error);
      } finally {
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
              htmlFor="first_name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              {t('firstName')}
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="ml-2 text-xs text-red-500">
                  {formik.errors.name}
                </p>
              ) : null}
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
