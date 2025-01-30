// actions/userActions.ts
'use server';

import { userExists } from '@/app/components/functions/checkingUsers';
import { createUser } from '@/app/lib/createUser';
import {
  clientSchema,
  loginFormSchema,
  verificationSchema,
} from '@/validation/client';
import { Role } from '@prisma/client';
import { signIn } from '@/auth';
import { generate6DigitCode, sendEmail } from '@/utils/authHelpers';
import prisma from '@/prisma';

interface CreateUserStates {
  success?: string;
  generalError?: string;
  errors?: {
    name?: string;
    email?: string;
  };
}

export interface LoginUserStates {
  success?: boolean;
  message?: string;
  generalError?: string;
  errors?: {
    email?: string;
    code?: string;
  };
}

export async function createUserAction(
  prevState: CreateUserStates | null,
  formData: FormData
): Promise<CreateUserStates> {
  try {
    const data = {
      role: formData.get('role') as Role,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    };
    const validationResult = await clientSchema.safeParseAsync(data);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return {
        errors: {
          name: fieldErrors.name?.[0],
          email: fieldErrors.email?.[0],
        },
      };
    }
    const existingUser = await userExists(data.email);
    if (existingUser) {
      return {
        generalError: 'This email is already registered',
      };
    }

    const createUserResult = await createUser(data.name, data.email, data.role);

    if (createUserResult.error) {
      return {
        generalError: createUserResult.error.message,
      };
    }

    if (createUserResult.success && createUserResult.email) {
      // Send login email
      const formData = new FormData();
      formData.append('email', createUserResult.email);
      const loginResult = await logInUserAction(null, formData);

      if (loginResult.success) {
        return {
          success:
            'Account created successfully. Please check your email for login instructions.',
        };
      } else {
        return {
          generalError:
            'Account created but failed to send login email. Please try logging in.',
        };
      }
    }

    return {
      generalError: 'Failed to create account. Please try again.',
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      generalError: 'Unable to create account. Please try again later.',
    };
  }
}

export async function logInUserAction(
  prevState: LoginUserStates | null,
  formData: FormData
): Promise<LoginUserStates> {
  try {
    const email = formData.get('email') as string;
    const validationResult = await loginFormSchema.safeParseAsync({ email });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return {
        errors: {
          email: fieldErrors.email?.[0],
        },
      };
    }

    // Check if user exists
    const exists = await userExists(email);
    if (!exists) {
      return {
        success: false,
        generalError: 'No account found with this email',
      };
    }

    // Generate verification code and save to database
    const code = generate6DigitCode();
    await prisma.verificationCode.create({
      data: {
        userId: exists.id,
        code,
        expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      },
    });

    const codemail = await sendEmail(email, code);
    // // Handle specific sign-in errors
    if (codemail.error) {
      return {
        success: false,
        generalError: 'Failed to send login code. Please try again.',
      };
    }
    return { success: true, message: 'Check your email for the login code.' };
  } catch (error) {
    // Log the error for debugging
    console.error('Login error:', error);

    // Return user-friendly error message
    if (error instanceof Error) {
      return {
        success: false,
        generalError: 'Authentication failed. Please try again.',
      };
    }

    return {
      success: false,
      generalError: 'An unexpected error occurred. Please try again later.',
    };
  }
}

export async function verifyCodeAction(
  prevState: LoginUserStates | null,
  formData: FormData
): Promise<LoginUserStates> {
  try {
    const email = formData.get('email') as string | null;
    const code = formData.get('code') as string | null; // Change to string

    console.log(email, code);
    // Validation
    const validationResult = await verificationSchema.safeParseAsync({
      email,
      code,
    });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return {
        errors: {
          code: fieldErrors.code?.[0], // Change to string
          email: fieldErrors.email?.[0], // Add email error
        },
      };
    }
    console.log(email, code);
    // Verify the code
    const result = await signIn('credentials', {
      email,
      code,
      redirect: false,
    });

    // Handle sign-in result
    if (result?.error) {
      console.error('Verification error:', result.error);
      return {
        errors: {
          code: 'Invalid code', // Specific error for code
        },
        generalError: 'Verification failed. Please try again.',
      };
    }

    // Success
    return {
      success: true,
      message: 'Code verified. Logging in...',
    };
  } catch (error) {
    console.error('Verification error:', error);

    // Return user-friendly error message
    return {
      errors: {
        code: 'An unexpected error occurred',
      },
      generalError: 'Verification failed. Please try again.',
    };
  }
}
