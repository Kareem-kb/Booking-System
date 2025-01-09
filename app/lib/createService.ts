'use server';
import prisma from '@/prisma';

interface CreateServiceForm {
  title_en: string;
  title_ar: string;
  category: string;
  description_en: string;
  description_ar: string;
  price: string;
  duration: string;
  image: string[]; // Base64 strings
  availability: string;
}

export async function createService(formData: CreateServiceForm) {
  try {
    console.log('Creating service with data:', formData);

    // Validate image count
    if (formData.image.length > 3) {
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
        translations: {
          create: [
            {
              language: 'en',
              title: formData.title_en,
              description: formData.description_en,
            },
            {
              language: 'ar',
              title: formData.title_ar,
              description: formData.description_ar,
            },
          ],
        },
        images: {
          create: formData.image.map((base64) => ({
            image: base64, // Store base64 string directly
          })),
        },
      },
    });

    console.log('Service created successfully:', service);
    return { service };
  } catch (error) {
    console.error('Error creating service:', error);
    throw error; // Rethrow the error for the caller to handle
  }
}
