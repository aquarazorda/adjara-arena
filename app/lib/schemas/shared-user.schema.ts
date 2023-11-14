import { z } from 'zod';

export const emailOrPhoneNumberSchema = z
  .string()
  .refine((value) => emailSchema.safeParse(value).success || phoneNumberSchema.safeParse(value).success, {
    message: 'invalid_email_or_phone_number',
  });

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
export const verificationCodeSchema = z.string().min(4, { message: 'verification_code_value_error' });

export const verificationMethodSchema = z.string().and(z.literal('phoneNumber')).or(z.literal('email'));

export const phoneNumberSchema = z
  .string()
  .min(9, { message: 'phone_number_validation_error' })
  .max(9, { message: 'phone_number_validation_error' });
