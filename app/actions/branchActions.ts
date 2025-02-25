'use server';

import { createBranch } from '@/app/lib/createBranch';
import {
  branchDbSchema,
  operatingHoursSchema,
  specialClosuresSchema,
} from '@/validation/branch';
import { Prisma } from '@prisma/client';

interface BranchResponse {
  success?: string;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
}

function formatBasicInfo(data: any) {
  return {
    translations: [
      {
        language: 'en',
        name: data.basicInfo.nameEn,
        address: data.basicInfo.addressEn,
      },
      {
        language: 'ar',
        name: data.basicInfo.nameAr,
        address: data.basicInfo.addressAr,
      },
    ],
    contactEmail: data.basicInfo.contactEmail || null,
    phoneNumber: data.basicInfo.phoneNumber,
    website: data.basicInfo.website || null,
  };
}

export async function createBranchAction(
  allData: any
): Promise<BranchResponse> {
  try {
    // Format and validate basic info
    const formattedBasicInfo = formatBasicInfo(allData);
    const basicInfoResult = branchDbSchema.safeParse(formattedBasicInfo);

    if (!basicInfoResult.success) {
      return {
        error: {
          message: 'Invalid basic information',
          details: basicInfoResult.error.flatten().fieldErrors,
        },
      };
    }

    // Validate operating hours
    const operatingHoursResult = operatingHoursSchema.safeParse(
      allData.operatingHours
    );
    if (!operatingHoursResult.success) {
      return {
        error: {
          message: 'Invalid operating hours',
          details: Object.fromEntries(
            Object.entries(
              operatingHoursResult.error.flatten().fieldErrors
            ).map(([key, value]) => [key, value ?? []])
          ),
        },
      };
    }

    // Validate special closures
    const specialClosuresResult = specialClosuresSchema.safeParse(
      allData.specialClosures
    );
    if (!specialClosuresResult.success) {
      return {
        error: {
          message: 'Invalid special closures',
          details: Object.fromEntries(
            Object.entries(
              specialClosuresResult.error.flatten().fieldErrors
            ).map(([key, value]) => [key, value ?? []])
          ),
        },
      };
    }

    console.log('All data in the Action:', allData);
    // Create branch with validated data
    try {
      await createBranch(
        basicInfoResult.data,
        operatingHoursResult.data,
        specialClosuresResult.data
      );
      return { success: 'Branch created successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return {
            error: {
              message: 'A branch with these details already exists',
            },
          };
        }
      }
      throw error;
    }
  } catch (error) {
    return {
      error: {
        message: 'An unexpected error occurred',
      },
    };
  }
}
