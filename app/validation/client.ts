import { z } from 'zod';

export const clientSchema = z.object({
  role: z.string().nonempty('Role is required'),
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Invalid email format').nonempty('Email is required'),
});
