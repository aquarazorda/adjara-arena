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

export const emailSchema = z.string().email('email_validation_error');
export const phoneNumberSchema = z
  .string()
  .min(9, { message: 'phone_number_validation_error' })
  .max(9, { message: 'phone_number_validation_error' });

export const registrationSchema = z
  .object({
    fullName: z.string().refine((fullName) => /\s/.test(fullName.trim()), { message: 'full_name_validation_error' }),
    userName: z.string().min(3).max(20),
    birthday: z.string(),
    password: passwordSchema,
    email: emailSchema.optional(),
    phoneNumber: phoneNumberSchema.optional(),
    confirmPassword: z.string(),
    verificationCode: z.string().min(4),
    verificationMethod: z
      .string()
      .refine((verificationMethod) => verificationMethod === 'email' || verificationMethod === 'phoneNumber', {
        message: 'verification_method_validation_error',
      }),
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
