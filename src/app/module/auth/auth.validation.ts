import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().max(20),
  }),
});

export const LoginValidationSchema = {
  loginValidationSchema,
};
