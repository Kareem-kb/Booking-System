import { z } from 'zod';

export const bookingSchema = z
  .object({
    name: z.string().nonempty({ message: 'Name is required.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    phone: z.string().nonempty({ message: 'Phone number is required.' }),
    age: z.preprocess(
      (val) => (typeof val === 'string' ? parseInt(val, 10) : val),
      z
        .number({ required_error: 'Age is required.' })
        .min(1, { message: 'Age must be a positive number.' })
    ),
    gender: z.enum(['MALE', 'FEMAle', 'OTHER'], {
      errorMap: () => ({ message: 'Please select a gender.' }),
    }),
    reason: z.string().optional(),
    branchId: z.string().nonempty({ message: 'Please select a branch.' }),
    serviceId: z
      .string()
      .nonempty({ message: 'Please select at least one service.' }),
    staffId: z.string().nonempty({ message: 'Please select a staff member.' }),
    date: z.preprocess(
      (val) =>
        typeof val === 'string' && val.trim() !== ''
          ? new Date(val)
          : undefined,
      z.date({
        required_error: 'Appointment date is required.',
        invalid_type_error: 'Invalid date format.',
      })
    ),
    time: z.string().nonempty({ message: 'Appointment time is required.' }),
  })
  .refine(
    (data) => {
      // Combine date and time into one Date
      if (!data.date) return false; // should be caught above
      const [hours, minutes] = data.time.split(':').map(Number);
      const appointmentDateTime = new Date(data.date);
      appointmentDateTime.setHours(hours, minutes, 0, 0);
      return appointmentDateTime > new Date(); // must be in the future
    },
    {
      message: 'Appointment must be scheduled in the future.',
      path: ['date'], // associates error with the date field
    }
  );
