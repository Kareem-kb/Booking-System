// app/actions/userActions.ts
'use server';

import { AppDataSource } from '@/auth';
import { UserEntity } from '@/app/lib/entities';
import { signIn } from '@/auth';
interface createUserForm {
  role: string;
  name: string;
  email: string;
}
export async function createUser(formData: createUserForm) {
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json(); // Parse the response data

    // Handle specific backend responses
    if (response.status === 409) {
      // console.log('User already exists');
      return 'User already exists';
    }

    if (response.ok) {
      // console.log('User created successfully');
      return 'User created successfully';
    }

    // For other unexpected response statuses
    return data.message || 'An unexpected error occurred.';
  } catch (error) {
    console.error('User creation error:', error);
    return 'Something went wrong. Please try again.';
  }
}


export async function logInUser({
  email,
}: {
  email: string;
}): Promise<string> {
  try {
    const result = await signIn('resend', { email, redirect: false });
    if (result?.ok) {
      return 'Sign-in successful. Check your email for the sign-in link.';
    } else {
      return 'Sign-in failed. Please try again.';
    }
  } catch (error) {
    console.error('Sign-in error:', error);
    return 'Unexpected error. Please try again later.';
  }
}
