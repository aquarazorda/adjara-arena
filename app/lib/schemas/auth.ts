import { z } from 'zod';
import { emailSchema, passwordSchema, phoneNumberSchema } from './register';

export const authSchema = z.object({
  emailOrUsername: z
    .string()
    .refine((value) => emailSchema.safeParse(value).success || phoneNumberSchema.safeParse(value).success, {
      message: 'invalid_email_or_phone_number',
    }),
  password: passwordSchema,
});
