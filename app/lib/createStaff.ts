import prisma from '@/prisma';
import { Role } from '@prisma/client';

interface CreateStaffForm {
  role: string;
  email: string;
  branchId: string;
  image: string;
  servicesId: string[]; // fix in the back sevices need to be an array
  translations: {
    language: string;
    name: string;
    aboutMe: string;
  }[];
}
export async function createStaff(formData: CreateStaffForm) {
  try {
    await prisma.$transaction(async (prisma) => {
      // Create User
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
  } catch (error) {}
  console.log('Creating staff with data:', formData);
}
