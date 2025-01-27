import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const StaffFormSchema = z
  .object({
    role: z.string().default('staff'),
    email: z.string().email('Please enter a valid email address'),
    branchId: z.string().min(1, 'Please select a branch'),
    servicesId: z.array(z.string()),
    image: z
      .instanceof(File)
      .refine(
        (file: File) => file.size <= MAX_FILE_SIZE,
        'Image size should be less than 5MB'
      )
      .optional()
      .nullable(),
    Name_en: z.string().min(1, 'English name is required'),
    Name_ar: z.string().min(1, 'Arabic name is required'),
    aboutMe_en: z.string().min(1, 'English description is required'),
    aboutMe_ar: z.string().min(1, 'Arabic description is required'),
  })
  .transform((data) => ({
    ...data,
    translations: [
      { language: 'en', name: data.Name_en, aboutMe: data.aboutMe_en },
      { language: 'ar', name: data.Name_ar, aboutMe: data.aboutMe_ar },
    ],
  }));

export const StaffSchema = z.object({
  role: z.string().nonempty('role is required'), // Role must be at least 1 character
  email: z.string().email('Invalid email address'), // Validate email
  branchId: z.string().min(1, 'Branch ID is required'), // Validate branch ID
  servicesId: z.string().array(), // Validate service IDs
  image: z.string().url('Invalid image URL'), // Validate image URL

  translations: z.array(
    z.object({
      language: z.enum(['en', 'ar']), // Only 'en' and 'ar' are allowed
      name: z.string().min(1, 'Name is required'), // Name must be at least 1 character
      aboutMe: z.string().min(1, 'About Me is required'), // About Me must be at least 1 character
    })
  ), // Validate translations array
});
