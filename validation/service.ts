import { string, z } from 'zod';

// Frontend Schema (Form Validation)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const serviceFormSchema = z.object({
  branch: z.string()
    .nonempty('Please select a branch'),

  price: z.string()
    .nonempty('Price is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Please enter a valid price (e.g., 99.99)'),

  duration: z.string()
    .nonempty('Duration is required')
    .refine(val => ['1', '2', '3'].includes(val), 'Please select a valid duration'),

  title_en: z.string()
    .min(3, 'English title must be at least 3 characters')
    .max(100, 'English title cannot exceed 100 characters'),

  description_en: z.string()
    .min(10, 'English description must be at least 10 characters')
    .max(1000, 'English description cannot exceed 1000 characters'),

  title_ar: z.string()
    .min(3, 'Arabic title must be at least 3 characters')
    .max(100, 'Arabic title cannot exceed 100 characters'),

  description_ar: z.string()
    .min(10, 'Arabic description must be at least 10 characters')
    .max(1000, 'Arabic description cannot exceed 1000 characters'),

  category: z.string()
    .min(2, 'Category must be at least 2 characters')
    .max(50, 'Category cannot exceed 50 characters'),

  availability: z.enum(['on', 'off']),

  image: z.array(z.instanceof(File))
    .min(1, 'Please upload at least one image')
    .max(3, 'Maximum 3 images allowed')
    .refine(
      files => files.every(file => file.size <= MAX_FILE_SIZE),
      'Each image must be less than 5MB'
    )
});


// Backend Schema (API Validation)
export const serviceSchema = z.object({
  category: z.string().nonempty('Category is required'),
  price: z.string().nonempty('Price is required'),
  duration: z.string().nonempty('Duration is required'),
  translations: z
    .array(
      z.object({
        language: z.enum(['en', 'ar']),
        title: z.string().nonempty('Title is required'),
        description: z.string().nonempty('Description is required'),
      })
    )
    .length(2, 'Both English and Arabic translations are required'),
  imageUrls: z
    .array(z.string().url())
    .min(1, 'At least one image is required')
    .max(3, 'Maximum 3 images allowed'),
  availability: z.string().optional(),
  branchID: z.string().nonempty('Branch is required'),
});

export type ServiceForm = z.infer<typeof serviceFormSchema>;
export type Service = z.infer<typeof serviceSchema>;
