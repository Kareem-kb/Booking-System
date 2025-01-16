'use server';
import { userExists } from '@/app/components/functions/checkingUsers';
import { createUser } from '@/app/lib/createUser';
import { clientSchema } from '@/validation/client';
import { signIn } from '@/auth';
import { Role } from '@prisma/client';
import { create } from 'domain';
interface createUserForm {
  role: Role;
  name: string;
  email: string;
}
interface createUserStates {
  success?: string;
  errors?: {
    name?: string[];
    email?: string[];
    role?: string[];
  };
}

export async function createUserAction(
  prevState: createUserStates | null,
  formData: FormData
): Promise<createUserStates> {
  try {
    // Extract form data
    const role = formData.get('role') as Role;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    // Validate form data using Zod
    const result = await clientSchema.safeParseAsync({ role, name, email });
    if (!result.success) {
      const flattenedErrors = result.error.flatten();
      return { errors: flattenedErrors.fieldErrors };
    }

    // Check if user already exists
    const userExist = await userExists(email);
    if (userExist) {
      return { errors: { email: ['User already exists'] } };
    }

    // Create the user
    await createUser(name, email, role);
    return { success: 'User created successfully' };
  } catch (error) {
    return { errors: { email: ['Something went wrong. Please try again.'] } };
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
