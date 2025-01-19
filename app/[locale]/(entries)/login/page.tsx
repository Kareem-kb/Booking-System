import Image from 'next/image';
import Logo from '@/public/images/Facebook icon.svg';
import { logInUser } from '@/app/actions/userActions';
import LogInForm from '@/app/components/forms/entry/loginForm';

export default function logInPage() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <svg
          aria-hidden="true"
          className="absolute inset-0 -z-10 hidden size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] sm:block"
        >
          <defs>
            <pattern
              x="0"
              y={-1}
              id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" stroke="gray" />
            </pattern>
          </defs>
          <rect
            fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            alt="Your Company"
            src={Logo}
            className="mx-auto h-10 w-auto"
            width={35}
            height={35}
            priority
          />
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="relative bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <LogInForm />
          </div>
        </div>
      </div>
    </>
  );
}
