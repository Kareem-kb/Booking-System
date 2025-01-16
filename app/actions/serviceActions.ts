'use server';
import { serviceSchema } from '@/validation/service';
import { createService } from '@/app/lib/createService';

export async function createServicesAction(formData: FormData) {
  try {
    // Extract form data
    const branchId = formData.get('branch') as string;
    const category = formData.get('category') as string;
    const price = formData.get('price') as string;
    const duration = formData.get('duration') as string;
    const availability = formData.get('availability') as string;

    // Extract uploaded image URLs
    const imageField = formData.get('imageUrl') as string | null;
    const imageUrls = imageField ? (JSON.parse(imageField) as string[]) : [];

    // Extract translations
    const translationsField = formData.get('translations') as string | null;
    const translations = translationsField
      ? (JSON.parse(translationsField) as Array<{
          language: string;
          title: string;
          description: string;
        }>)
      : [];

    // Validate form data
    const result = await serviceSchema.safeParseAsync({
      category,
      price,
      duration,
      imageUrls,
      availability,
      translations,
    });

    if (!result.success) {
      console.log(result.error?.flatten().fieldErrors);
      return { errors: result.error.flatten().fieldErrors };
    }

    // Create service
    const createServiceForm = {
      branchId,
      category,
      price,
      duration,
      imageUrls,
      availability,
      translations,
    };

    await createService(createServiceForm);

    return { success: 'Service created successfully!' };
  } catch (error) {
    return { error: 'Failed to create service. Please try again.' };
  }
}
