'use server';

import { serviceSchema } from '@/validation/validateService';
import { createService } from '@/app/lib/dbService';

interface ServiceResponse {
  success?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export async function createServicesAction(
  formData: FormData
): Promise<ServiceResponse> {
  try {
    // Extract and transform data to match CreateServiceForm interface
    const serviceData = {
      branchID: formData.get('branch') as string,
      category: formData.get('category') as string,
      price: formData.get('price') as string,
      duration: formData.get('duration') as string,
      availability:
        formData.get('availability') === 'on' ? 'active' : 'inactive',
      imageUrls: JSON.parse((formData.get('imageUrl') as string) || '[]'),
      translations: JSON.parse(
        (formData.get('translations') as string) || '[]'
      ),
    };

    // Validate the data
    const validationResult = serviceSchema.safeParse(serviceData);

    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors,
        error: 'Please check the form for errors',
      };
    }

    // Create service with validated and transformed data
    try {
      await createService({
        branchID: serviceData.branchID,
        category: serviceData.category,
        price: serviceData.price,
        duration: serviceData.duration,
        imageUrls: serviceData.imageUrls,
        availability: serviceData.availability,
        translations: serviceData.translations,
      });

      return { success: 'Service created successfully!' };
    } catch (error) {
      console.error('Database error:', error);
      return { error: 'Failed to create service in database' };
    }
  } catch (error) {
    console.error('Service creation error:', error);
    return { error: 'Failed to process service data' };
  }
}
