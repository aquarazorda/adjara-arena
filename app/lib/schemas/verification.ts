import { z } from 'zod';
import { emailSchema, phoneNumberSchema } from './shared-user.schema';

export const verificationCodeFormInputSchema = z.coerce
  .number()
  .min(6, {
    message: 'verification_code_value_error',
  })
  .max(6, {
    message: 'verification_code_value_error',
  });

export const verificationCodeSchema = z.object({
  id: z.coerce.number(),
  verificationCode: verificationCodeFormInputSchema,
});

export const verificationInputSchema = z
  .object({
    phoneNumber: phoneNumberSchema.optional(),
    email: emailSchema.optional(),
    verificationMethod: z.enum(['email', 'phoneNumber']),
    verificationCode: verificationCodeFormInputSchema,
    verificationId: z.coerce.number(),
  });
