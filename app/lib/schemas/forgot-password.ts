import { z } from 'zod';
import { verificationInputSchema } from './verification';
import { passwordSchema } from './password.schema';

export const forgotPasswordSecondStepSchema = verificationInputSchema
  .extend({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'password_validation_mismatch',
  });

export const forgotPasswordFirstStepSchema = verificationInputSchema.refine((data) => data.email || data.phoneNumber, {
  message: 'email_or_phone_number_required',
  path: ['email', 'phoneNumber'],
});
