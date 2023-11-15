import { z } from 'zod';

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
