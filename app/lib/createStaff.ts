import prisma from '@/prisma';
import { Role, Prisma } from '@prisma/client';

interface CreateStaffForm {
  role: string;
  email: string;
  branchId: string;
  image: string | null;
  servicesId: string[];
  translations: {
    language: string;
    name: string;
    aboutMe: string;
  }[];
}

interface StaffResponse {
  success?: string;
  error?: string;
}

export async function createStaff(
  formData: CreateStaffForm
): Promise<StaffResponse> {
  try {
    await prisma.$transaction(async (prisma) => {
      const staffUser = await prisma.user.create({
        data: {
          email: formData.email,
          name: formData.translations[0].name,
          role: formData.role as Role,
          staff: {
            create: {
              branchId: formData.branchId,
              profileImage: formData.image,
              role: formData.role as Role,
              translations: {
                createMany: {
                  data: formData.translations.map((translation) => ({
                    language: translation.language,
                    name: translation.name,
                    aboutMe: translation.aboutMe,
                  })),
                },
              },
              staffServices: {
                createMany: {
                  data: formData.servicesId.map((serviceId) => ({
                    serviceId,
                  })),
                },
              },
            },
          },
        },
        include: {
          staff: true,
        },
      });

      return staffUser;
    });

    return {
      success: 'Staff created successfully',
    };
  } catch (error) {
    console.error('Error creating staff:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          error: 'A staff member with this email already exists.',
        };
      }
    }
    return {
      error: 'Failed to create staff. Please try again.',
    };
  }
}
