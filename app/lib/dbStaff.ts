'use server';
import prisma from '@/prisma';
import { Role, Prisma } from '@prisma/client';

interface CreateStaffForm {
  role: Role; // Use the Role enum instead of string
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
  if (formData.translations.length === 0) {
    return {
      error: 'At least one translation is required.',
    };
  }

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

export const getStaffByServiceID = async (
  locale: string,
  serviceID: string
) => {
  try {
    const staff = await prisma.staff.findMany({
      where: {
        staffServices: {
          some: { serviceId: serviceID },
        },
      },
      include: {
        translations: true,
        staffServices: true,
      },
    });

    const staffWithLocale = staff.map((s) => {
      const translation =
        s.translations.find((t) => t.language === locale) ||
        s.translations.find((t) => t.language === 'en');

      return {
        id: s.id,
        name: translation ? translation.name : 'No translation available',
        aboutMe: translation ? translation.aboutMe : 'No translation available',
        profileImage: s.profileImage,
        services: s.staffServices.map((ss) => ss.serviceId),
      };
    });

    return staffWithLocale;
  } catch (error) {
    console.error('Error fetching staff by service ID:', error);
    throw new Error('Failed to fetch staff. Please try again later.');
  }
};
