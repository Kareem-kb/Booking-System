'use server';
import { userExists } from '@/app/components/functions/checkingUsers';
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
}): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    const exists = await userExists(email);
    if (!exists) {
      return { success: false, message: 'User not found in the database.' };
    }

    const result = await signIn('resend', { email, redirect: false });
    if (result) {
      return {
        success: true,
        message: 'Sign-in link sent. Please check your email.',
      };
    } else {
      console.error('Resend error:', result?.error);
      return {
        success: false,
        message: 'Failed to send sign-in link. Please try again.',
        error: result?.error,
      };
    }
  } catch (error) {
    console.error('Sign-in error:', error);
    return {
      success: false,
      message: 'Unexpected error. Please try again later.',
    };
  }
}
