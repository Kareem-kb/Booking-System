import Image from 'next/image';
import Logo from '@/public/images/Facebook icon.svg';
import { logInUser } from '@/app/actions/userActions';
import LogInForm from '@/app/components/forms/login';

export default function logInPage() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
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
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12 relative">
            <LogInForm />
          </div>
        </div>
      </div>
    </>
  );
}
