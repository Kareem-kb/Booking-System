import Image from 'next/image';
import Logo from '@/public/images/Facebook icon.svg';
import RegisterForm from '@/app/components/forms/register';
import GoogleButton from '@/app/components/buttons/GoogleButton';
import { auth } from '@/auth';

export default async function Register() {
  let user = null;
  try {
    const session = await auth();
    user = session?.user || null;
    console.log(user);
  } catch (err) {
    console.error('Failed to fetch session:', err);
  }

  return (
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
          <RegisterForm />
          <div>
            <GoogleButton />
          </div>
        </div>
      </div>
    </div>
  );
}
