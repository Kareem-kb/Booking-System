'use server';
import prisma from '@/prisma';

interface CreateServiceForm {
  branchId: string;
  category: string;
  price: string;
  duration: string;
  imageUrls: string[];
  availability: string;
  translations: {
    language: string;
    title: string;
    description: string;
  }[];
}

export async function createService(formData: CreateServiceForm) {
  try {
    console.log('Creating service with data:', formData);

    // Validate image count
    if (formData.imageUrls.length > 3) {
      throw new Error('Maximum of 3 images allowed.');
    }

    // Parse price and duration
    const price = parseFloat(formData.price);
    if (isNaN(price)) {
      throw new Error('Invalid price value.');
    }

    const duration = parseInt(formData.duration, 10);
    if (isNaN(duration)) {
      throw new Error('Invalid duration value.');
    }

    // Convert availability to boolean
    const availability = formData.availability === 'on';

    // Create service and associated images
    const service = await prisma.service.create({
      data: {
        price,
        duration,
        availability,
        images: formData.imageUrls,
        branch: {
          connect: { id: formData.branchId }, // Assuming branchId is available in formData
        },
        translations: {
          create: [
            {
              language: 'en',
              title: formData.translations[0].title,
              description: formData.translations[0].description,
            },
            {
              language: 'ar',
              title: formData.translations[1].title,
              description: formData.translations[1].description,
            },
          ],
        },
      },
    });

    // console.log('Service created successfully:', service);
    return { service };
  } catch (error) {
    console.error('Error creating service:', error);
    throw error; // Rethrow the error for the caller to handle
  }
}
