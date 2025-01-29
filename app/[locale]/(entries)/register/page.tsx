// app/[locale]/register/page.tsx
import RegisterForm from '@/app/components/forms/entry/registerForm';
import GoogleButton from '@/app/components/buttons/GoogleButton';

export default function Register() {
  return (
    <>
      <RegisterForm />
      <div className="mt-4">
        <GoogleButton />
      </div>
    </>
  );
}
