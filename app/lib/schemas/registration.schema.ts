import { z } from 'zod';
import { emailSchema, passwordSchema, phoneNumberSchema, verificationMethodSchema } from './shared-user.schema';
import { verificationCodeFormInputSchema } from './verification';

export const registrationSchema = z
  .object({
    fullName: z.string().refine((fullName) => /\s/.test(fullName.trim()), { message: 'full_name_validation_error' }),
    userName: z.string().min(3).max(20),
    birthday: z.string(),
    password: passwordSchema,
    email: emailSchema.optional(),
    phoneNumber: phoneNumberSchema.optional(),
    confirmPassword: z.string(),
    verificationCode: verificationCodeFormInputSchema,
    verificationMethod: verificationMethodSchema,
    termsAndConditions: z
      .boolean()
      .default(false)
      .refine((termsAndConditions) => termsAndConditions, {
        message: 'terms_and_conditions_validation_error',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'password_validation_mismatch',
  });
