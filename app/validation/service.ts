import { z } from 'zod';

export const serviceSchema = z.object({
  title_en: z.string().nonempty('title is required'),
  title_ar: z.string().nonempty('title is required'),
  category: z.string().nonempty('category is required'),
  description_en: z.string().nonempty('description is required'),
  description_ar: z.string().nonempty('description is required'),
  price: z.string().nonempty('price is required'),
  duration: z.string().nonempty('diration is required'),
  image: z
    .instanceof(File)
    .array()
    .min(1, 'At least one image is required')
    .max(3, 'Maximum 3 images allowed')
    .refine((files) => {
      return files.every((file) =>
        ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(
          file.type
        )
      );
    }, 'Only .jpg, .png, .gif and .svg formats are supported')
    .refine((files) => {
      return files.every((file) => file.size <= 5 * 1024 * 1024);
    }, 'Each image must be less than 5MB'),
  availability: z.string(),
});
