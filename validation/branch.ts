import { z } from 'zod';

// Constants for validation
const CONSTANTS = {
  MAX_NAME_LENGTH: 100,
  MAX_ADDRESS_LENGTH: 200,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
  TIME_REGEX: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
  MIN_OPERATING_HOURS: 7,
  DAYS_OF_WEEK: [0, 1, 2, 3, 4, 5, 6] as const,
} as const;

// Base branch schema for form validation
export const branchFormSchema = z.object({
  nameEn: z
    .string()
    .min(1, 'English name is required')
    .max(CONSTANTS.MAX_NAME_LENGTH)
    .trim(),
  nameAr: z
    .string()
    .min(1, 'Arabic name is required')
    .max(CONSTANTS.MAX_NAME_LENGTH)
    .trim(),
  addressEn: z
    .string()
    .min(1, 'English address is required')
    .max(CONSTANTS.MAX_ADDRESS_LENGTH)
    .trim(),
  addressAr: z
    .string()
    .min(1, 'Arabic address is required')
    .max(CONSTANTS.MAX_ADDRESS_LENGTH)
    .trim(),
  contactEmail: z.string().email('Invalid email').or(z.literal('')).optional(),
  phoneNumber: z
    .string()
    .regex(CONSTANTS.PHONE_REGEX, 'Invalid phone number')
    .trim(),
  website: z
    .string()
    .url('Invalid URL')
    .or(z.literal(''))
    .optional()
    .transform((url) => (url ? url.toLowerCase() : url)),
});

// Schema for database validation
export const branchDbSchema = z.object({
  translations: z
    .array(
      z.object({
        language: z.enum(['en', 'ar']),
        name: z.string().min(1).max(CONSTANTS.MAX_NAME_LENGTH),
        address: z.string().min(1).max(CONSTANTS.MAX_ADDRESS_LENGTH),
      })
    )
    .length(2),
  contactEmail: z.string().email().nullable().optional(),
  phoneNumber: z.string().regex(CONSTANTS.PHONE_REGEX),
  website: z.string().url().nullable().optional(),
});

// Operating hours schema
export const daySchema = z
  .object({
    name: z
      .string()
      .min(1, 'Day name is required')
      .max(20, 'Day name is too long'),
    dayOfWeek: z
      .number()
      .int('Day of week must be an integer')
      .min(0, 'Day of week must be between 0 and 6')
      .max(6, 'Day of week must be between 0 and 6')
      .describe('0 for Sunday, 1 for Monday, etc.'),
    openTime: z
      .string()
      .regex(
        CONSTANTS.TIME_REGEX,
        'Please enter time in 24-hour format (e.g., 09:00)'
      ),

    closeTime: z
      .string()
      .regex(
        CONSTANTS.TIME_REGEX,
        'Please enter time in 24-hour format (e.g., 17:00)'
      ),

    isClosed: z
      .boolean()
      .default(false)
      .describe('Whether the branch is closed on this day'),
  })
  .refine(
    (data) => {
      if (data.isClosed) return true;
      return data.closeTime > data.openTime;
    },
    {
      message: 'Closing time must be after opening time',
      path: ['closeTime'],
    }
  );

export const operatingHoursSchema = z
  .array(daySchema)
  .length(
    CONSTANTS.MIN_OPERATING_HOURS,
    'Must provide operating hours for all days of the week'
  )
  .refine(
    (days) => {
      const uniqueDays = new Set(days.map((d) => d.dayOfWeek));
      return uniqueDays.size === days.length;
    },
    {
      message: 'Each day of the week must be unique',
    }
  );

export const specialClosureSchema = z
  .object({
    date: z
      .union([z.string(), z.date()])
      .refine((date) => {
        if (!date) return true;
        const parsed = new Date(date);
        return !isNaN(parsed.getTime()) && parsed >= new Date();
      }, 'Please select a future date')
      .transform((date) => (date ? new Date(date) : null))
      .nullable(),
    closeReason: z
      .string()
      .min(1, 'Reason is required')
      .max(200, 'Reason cannot exceed 200 characters')
      .nullable(),
  })
  .refine(
    (data) => {
      if (data.date && !data.closeReason) return false;
      if (data.closeReason && !data.date) return false;
      return true;
    },
    {
      message: 'Both date and reason must be provided together',
      path: ['closeReason'],
    }
  )
  .refine(
    (data) => {
      if (!data.date) return true;
      return data.date >= new Date();
    },
    {
      message: 'Date must be in the future',
      path: ['date'],
    }
  );

export const specialClosuresSchema = z
  .array(specialClosureSchema)
  .min(0)
  .max(20, 'Too many special closures')
  .default([]);

// Types
export type BranchFormSchema = z.infer<typeof branchFormSchema>;
export type BranchDbSchema = z.infer<typeof branchDbSchema>;
export type OperatingHours = z.infer<typeof operatingHoursSchema>;
export type SpecialClosure = z.infer<typeof specialClosureSchema>;
