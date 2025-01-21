// validation/client.ts
import { z } from 'zod';

export const clientSchema = z.object({
  role: z.enum(['client'], {
    required_error: 'Role is required',
    invalid_type_error: 'Invalid role type',
  }),
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .trim()
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Invalid email format',
    })
    .email('Please enter a valid email address')
    .min(5, {
      message: 'Email is too short',
    })
    .max(255, 'Email cannot exceed 255 characters')
    .trim()
    .toLowerCase(),
});

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Invalid email format',
    })
    .email('Please enter a valid email address')
    .min(5, {
      message: 'Email is too short',
    })
    .max(255, 'Email cannot exceed 255 characters')
    .trim()
    .toLowerCase(),
});

export type ClientSchema = z.infer<typeof clientSchema>;
