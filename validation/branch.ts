import { z } from 'zod';

// Helper function for time validation
const isValidTime = (time: string) =>
  /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);

// Base branch schema
export const branchSchema = z.object({
  name: z
    .string()
    .min(1, 'Branch name is required')
    .max(100, 'Branch name is too long'),
  contactEmail: z
    .string()
    .email('Invalid email address')
    .optional()
    .or(z.literal('')),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  address: z
    .string()
    .min(1, 'Branch address is required')
    .max(200, 'Address is too long'),
});

// Operating hours schema
const daySchema = z.object({
  name: z.string(),
  dayOfWeek: z.number().min(0).max(6),
  openTime: z.string().refine(isValidTime, 'Invalid opening time format'),
  closeTime: z.string().refine(isValidTime, 'Invalid closing time format'),
  isClosed: z.boolean(),
});
export const operatingHoursSchema = z.array(daySchema);

// Special closure schema
export const specialClosureSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  closeReason: z.string().optional(),
});
export const specialClosuresSchema = z.array(specialClosureSchema);
