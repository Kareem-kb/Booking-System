'use server';
import { serviceSchema } from '@/app/validation/service';
import { createService } from '@/app/lib/createService';

export async function createServicesAction(prevState: any, formData: FormData) {
  try {
    // Extract form data
    const title_en = formData.get('title_en') as string;
    const title_ar = formData.get('title_ar') as string;
    const category = formData.get('category') as string;
    const description_en = formData.get('description_en') as string;
    const description_ar = formData.get('description_ar') as string;
    const price = formData.get('price') as string;
    const duration = formData.get('duration') as string;
    const image = formData.getAll('image') as File[];
    const availability = formData.get('availability') as string;

    // Validate form data
    const result = await serviceSchema.safeParseAsync({
      title_en,
      title_ar,
      category,
      description_en,
      description_ar,
      price,
      duration,
      image,
      availability,
    });

    if (!result.success) {
      return { errors: result.error.flatten().fieldErrors };
    }

    // Convert images to base64
    const imageBuffers = await Promise.all(
      image.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        return Buffer.from(arrayBuffer).toString('base64'); // Convert to base64
      })
    );

    // Create service
    await createService({
      title_en,
      title_ar,
      category,
      description_en,
      description_ar,
      price,
      duration,
      image: imageBuffers, // Pass base64 strings instead of File[]
      availability,
    });
    console.log('Service created successfully!', {
      title_en,
      title_ar,
      category,
      description_en,
      description_ar,
      price,
      duration,
      image,
      availability,
    });
    return { success: 'Service created successfully!' };
  } catch (error) {
    return { error: 'Failed to create service. Please try again.' };
  }
}
