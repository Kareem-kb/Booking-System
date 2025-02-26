// lib/createUser.ts
import prisma from '@/prisma';
import { Role } from '@prisma/client';

interface CreateUserResult {
  success?: boolean;
  email?: string;
  error?: {
    code: string;
    message: string;
  };
}

export async function createUser(
  name: string,
  email: string,
  role: Role
): Promise<CreateUserResult> {
  try {
    console.log('before prisma', name, email, role);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        name: name.trim(),
        role,
      },
      select: {
        email: true,
      },
    });

    return {
      success: true,
      email: user.email,
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return {
          success: false,
          error: {
            code: 'DUPLICATE_EMAIL',
            message: 'Email already exists',
          },
        };
      }
      return {
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'Failed to create user',
        },
      };
    }
    return {
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred',
      },
    };
  }
}
