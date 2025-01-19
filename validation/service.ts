import { z } from 'zod';

export const serviceSchema = z.object({
  category: z.string().nonempty('category is required'),
  price: z.string().nonempty('price is required'),
  duration: z.string().nonempty('diration is required'),
  translations: z
    .array(
      z.object({
        language: z.string().nonempty('Language is required'),
        title: z.string().nonempty('Title is required'),
        description: z.string().nonempty('Description is required'),
      })
    )
    .min(1, 'At least one translation is required'),
  imageUrls: z
    .string()
    .array()
    .min(1, 'At least one image is required')
    .max(3, 'Maximum 3 images allowed'),
  availability: z.string(),
});
