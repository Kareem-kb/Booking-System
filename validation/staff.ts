import { z } from 'zod';

export const StaffFormSchema = z.object({
  role: z.string().nonempty('role is required'), // Role must be at least 1 character
  email: z.string().email('Invalid email address'), // Validate email
  branchId: z.string().min(1, 'Branch ID is required'), // Validate branch ID
  servicesId: z.string().array().min(1, 'At least one service ID is required'), // Validate service IDs
  image: z.string().url('Invalid image URL'), // Validate image URL
  translations: z.array(
    z.object({
      language: z.enum(['en', 'ar']), // Only 'en' and 'ar' are allowed
      name: z.string().min(1, 'Name is required'), // Name must be at least 1 character
      aboutMe: z.string().min(1, 'About Me is required'), // About Me must be at least 1 character
    })
  ), // Validate translations array
});
