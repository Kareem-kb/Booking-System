'use server';

import { userExists } from '@/app/components/functions/checkingUsers';
import { StaffSchema } from '@/validation/staff';
import { createStaff } from '@/app/lib/createStaff';
import { Role } from '@prisma/client';

interface StaffResponse {
  success?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export async function createStaffAction(
  formData: FormData
): Promise<StaffResponse> {
  try {
    const staffData = {
      role: formData.get('role') as Role,
      email: formData.get('email') as string,
      branchId: formData.get('branchId') as string,
      servicesId: formData.getAll('serviceId') as string[],
      image: formData.get('imageUrl') as string | null,
      translations: JSON.parse(
        (formData.get('translations') as string) || '[]'
      ) as Array<{
        language: string;
        name: string;
        aboutMe: string;
      }>,
    };

    // Check for existing email
    const existingEmail = await userExists(staffData.email);
    if (existingEmail) {
      return {
        error: 'This email is already in the database.',
      };
    }

    // Validate form data
    const validationResult = await StaffSchema.safeParseAsync(staffData);
    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // Create staff record
    const result = await createStaff(staffData);
    if (result.success) {
      return { success: result.success };
    }

    return {
      error: result.error || 'Failed to create staff. Please try again.',
    };
  } catch (error) {
    console.error('Unexpected error in createStaffAction:', error);
    return {
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
