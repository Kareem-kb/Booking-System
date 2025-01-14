'use server';
import prisma from '@/prisma';

interface CreateBranchForm {
  name: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  website: string;
}

interface operatingHours {
  name: string;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

interface specialClosures {
  date: Date;
  closeReason: string;
}

export async function createBranch(
  formData: CreateBranchForm,
  operatingHours: operatingHours[],
  specialClosures: specialClosures[]
) {
  try {
    console.log('Creating business with data:', formData);
    console.log('Operating hours:', operatingHours);
    console.log('Special closures:', specialClosures);

    const branchBase = await prisma.branch.create({
      data: {
        name: formData.name,
        contactEmail: formData.contactEmail,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        website: formData.website,
      },
    });
    const branchID = branchBase.id;

    // Create branch operating hours
    for (const hour of operatingHours) {
      await prisma.branchOperatingHours.create({
        data: {
          name: hour.name,
          dayOfWeek: hour.dayOfWeek,
          openTime: hour.openTime,
          closeTime: hour.closeTime,
          isClosed: hour.isClosed,
          branchId: branchID,
        },
      });
    }

    // Create branch special closures
    for (const closure of specialClosures) {
      await prisma.branchSpecialClosure.create({
        data: {
          date: closure.date,
          closeReason: closure.closeReason,
          branchId: branchID,
        },
      });
    }

    return { success: 'Branch created successfully' };
  } catch (error) {
    console.error('Failed to create business:', error);
    throw new Error('Failed to create business.');
  }
}
