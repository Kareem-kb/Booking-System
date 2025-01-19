'use server';
import { StaffFormSchema } from '@/validation/staff';
import { createStaff } from '@/app/lib/createStaff';

export async function createStaffAction(formData: FormData) {
  try {
    // Extract form data
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const branchId = formData.get('branchId') as string;
    const servicesId = formData.getAll('serviceId') as string[];
    const image = formData.get('imageUrl') as string;

    // Extract translations
    const translationsField = formData.get('translations') as string | null;
    const translations = translationsField
      ? (JSON.parse(translationsField) as Array<{
          language: string;
          name: string;
          aboutMe: string;
        }>)
      : [];

    const result = await StaffFormSchema.safeParseAsync({
      role,
      email,
      branchId,
      servicesId,
      image,
      translations,
    });

    if (!result.success) {
      console.log(result.error?.flatten().fieldErrors);
      return { errors: result.error.flatten().fieldErrors };
    }

    const staffData = {
      role,
      email,
      branchId,
      servicesId,
      image,
      translations,
    };

    await createStaff(staffData);
    return { success: 'Staff created successfully!' };
  } catch (Error) {}
  console.log('these is an error :', Error);
}

// next to is the validation schema for the staff form and passing the dataform correctly
