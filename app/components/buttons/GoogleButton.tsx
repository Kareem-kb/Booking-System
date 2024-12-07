'use client';

import { signIn, signOut } from 'next-auth/react';

interface GoogleButtonProps {
  user: any;
}

export default function GoogleButton({ user }: GoogleButtonProps) {
  const handleClick = () => {
    user ? signOut() : signIn('google');
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 text-white bg-red-500 rounded-md"
    >
      {user ? 'Sign Out' : 'Google'}
    </button>
  );
}
