'use server';

import { createBranch } from '@/app/lib/createBranch';
import { Erica_One } from 'next/font/google';

export async function createBranchAction(formData: FormData) {
  try {
    const basicInfo = {
      name: (formData.get('basicInfo[name]') as string) || '',
      address: (formData.get('basicInfo[address]') as string) || '',
      phoneNumber: (formData.get('basicInfo[phoneNumber]') as string) || '',
      contactEmail: (formData.get('basicInfo[contactEmail]') as string) || '',
      website: (formData.get('basicInfo[website]') as string) || '',
    };

    // Extract operatingHours
    const operatingHours = [];
    for (let i = 0; formData.get(`operatingHours[${i}][name]`); i++) {
      operatingHours.push({
        name: formData.get(`operatingHours[${i}][name]`) as string,
        dayOfWeek: parseInt(
          formData.get(`operatingHours[${i}][dayOfWeek]`) as string,
          10
        ),
        openTime:
          (formData.get(`operatingHours[${i}][openTime]`) as string) || '',
        closeTime:
          (formData.get(`operatingHours[${i}][closeTime]`) as string) || '',
        isClosed: formData.get(`operatingHours[${i}][isClosed]`) === 'true',
      });
    }

    // Extract specialClosures
    const specialClosures = [];
    for (let i = 0; formData.get(`specialClosures[${i}][date]`); i++) {
      specialClosures.push({
        date:
          new Date(formData.get(`specialClosures[${i}][date]`) as string) ||
          null,
        closeReason:
          (formData.get(`specialClosures[${i}][closeReason]`) as string) || '',
      });
    }

    await createBranch(basicInfo, operatingHours, specialClosures);
    return {
      success: true,
      message: 'Branch created successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: { error },
    };
  }
}
