import { z } from 'zod';
import { emailSchema, looseOptional, phoneNumberSchema } from './shared-user.schema';
import { verificationInputSchema } from './verification';
import { passwordSchema } from './password.schema';

export const registrationSchema = z
  .object({
    fullName: z.string().refine((fullName) => /\s/.test(fullName.trim()), { message: 'full_name_validation_error' }),
    userName: z.string().min(3).max(20),
    birthday: z.coerce.date(),
    password: passwordSchema,
    email: looseOptional(emailSchema),
    phoneNumber: looseOptional(phoneNumberSchema),
    confirmPassword: z.string(),
    termsAndConditions: z
      .boolean()
      .default(false)
      .refine((termsAndConditions) => termsAndConditions, {
        message: 'terms_and_conditions_validation_error',
      }),
  })
  .merge(verificationInputSchema)
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'password_validation_mismatch',
  });
