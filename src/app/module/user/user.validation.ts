import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().max(20),
    phone: z.string(),
    address: z.string(),
    role: z.enum(['admin', 'user']),
  }),
});

export const UserValidationSchema = {
  userValidationSchema,
};
