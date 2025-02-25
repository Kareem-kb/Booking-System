'use server';
import { startOfDay, endOfDay } from 'date-fns';
import { Prisma } from '@prisma/client';
import prisma from '@/prisma';

// Improve error handling with custom error types
interface BranchResponse {
  success?: string;
  error?: {
    message: string;
    code?: string;
    details?: Record<string, string[]>;
  };
}

// Keep interfaces matching DB schema
interface CreateBranchForm {
  contactEmail?: string | null;
  phoneNumber?: string | null;
  website?: string | null;
  translations: {
    language: string;
    name: string;
    address: string;
  }[];
}

interface OperatingHour {
  name: string;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

interface SpecialClosure {
  date: Date | null;
  closeReason: string | null;
}

export async function createBranch(
  formData: CreateBranchForm,
  operatingHours: OperatingHour[],
  specialClosures: SpecialClosure[]
): Promise<BranchResponse> {
  try {
    await prisma.$transaction(async (tx) => {
      // Create branch
      const branchBase = await tx.branch.create({
        data: {
          contactEmail: formData.contactEmail,
          phoneNumber: formData.phoneNumber,
          website: formData.website,
          // Create translations table
          translations: {
            create: [
              {
                language: 'en',
                name: formData.translations[0].name,
                address: formData.translations[0].address,
              },
              {
                language: 'ar',
                name: formData.translations[1].name,
                address: formData.translations[1].address,
              },
            ],
          },

          // Create operating hours
          operatingHours: {
            createMany: {
              data: operatingHours.map((day) => ({
                name: day.name,
                dayOfWeek: day.dayOfWeek,
                openTime: day.openTime,
                closeTime: day.closeTime,
                isClosed: day.isClosed,
              })),
            },
          },
          // Create special closures
          calendarEvents: {
            createMany: {
              data: specialClosures
                .filter((closure) => closure.date !== null)
                .map((closure) => ({
                  startDate: startOfDay(closure.date as Date),
                  endDate: endOfDay(closure.date as Date),
                  closureReason: closure.closeReason,
                  eventType: 'CLOSURE',
                })),
            },
          },
        },
      });

      return branchBase;
    });

    return {
      success: 'Branch created successfully',
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          error: {
            message: 'A branch with these details already exists',
            code: error.code,
          },
        };
      }
    }

    return {
      error: {
        message: 'Failed to create branch',
        details: {
          technical: ['An unexpected error occurred while creating the branch'],
        },
      },
    };
  }
}

export const getAllBranches = async () => {
  try {
    const branches = await prisma.branch.findMany({
      select: {
        id: true,
      },
    });
    return branches;
  } catch (error) {
    throw new Error('Failed to fetch branches.');
  }
};
