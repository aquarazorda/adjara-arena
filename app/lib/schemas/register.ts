import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, { message: 'password_validation_min_length' })
  .max(30, { message: 'password_validation_max_length' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'password_validation_capital_letter',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'password_validation_lower_case_letter',
  })
  .refine((password) => /\d/.test(password), {
    message: 'password_validation_digit',
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'password_validation_symbol',
  });

export const registrationSchema = z
  .object({
    fullName: z
      .string()
      .refine((fullName) => /\s/.test(fullName.trim()), { message: 'full_name_validation_error' }),
    userName: z.string().min(3).max(20),
    birthday: z.string(),
    password: passwordSchema,
    email: z.string().email().optional(),
    phoneNumber: z.number().min(9).max(9).optional(),
    confirmPassword: z.string(),
    verificationCode: z.string().min(4),
    verificationMethod: z
      .string()
      .refine((verificationMethod) => verificationMethod === 'email' || verificationMethod === 'phoneNumber', {
        message: 'verification_method_validation_error',
      }),
    termsAndConditions: z.boolean().refine((termsAndConditions) => termsAndConditions, {
      message: 'terms_and_conditions_validation_error',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'password_validation_mismatch',
  })
