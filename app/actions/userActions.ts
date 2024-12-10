// app/actions/userActions.ts
'use server';

import { signIn } from '@/auth';

interface createUserForm {
  role: string;
  name: string;
  email: string;
}
export default async function createUser(formData: createUserForm) {
  const result = await signIn('resend', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      role: formData.role,
    }),
  });
  if (result !== undefined) {
    console.log('user created', result);
    return `/verification/`;
  } else {
    console.log('you in the server but there is an error ', Error);
  }
}
