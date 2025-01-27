'use server';
import prisma from '@/prisma';

interface CreateServiceForm {
  branchID: string;
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
          connect: { id: formData.branchID }, // Assuming branchId is available in formData
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

export const getServicesByBranchID = async (
  locale: string,
  branchID: string
) => {
  try {
    const services = await prisma.service.findMany({
      where: { branchId: branchID },
      include: {
        translations: true, // Include translations for each service
      },
    });

    // Map services to include only the relevant translation based on the locale
    const servicesWithLocale = services.map((service) => {
      const translation =
        service.translations.find(
          (translation) => translation.language === locale
        ) ||
        service.translations.find(
          (translation) => translation.language === 'en'
        );
      return {
        id: service.id,
        title: translation ? translation.title : 'No translation available',
        description: translation
          ? translation.description
          : 'No translation available',
        price: service.price,
        duration: service.duration,
        availability: service.availability,
        images: service.images,
      };
    });

    return servicesWithLocale;
  } catch (error) {
    console.error('Error fetching services:', error); // Log any errors
    throw new Error('Failed to fetch services.');
  }
};
