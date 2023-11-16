import { z } from 'zod';

export const emailOrPhoneNumberSchema = z
  .string()
  .refine((value) => emailSchema.safeParse(value).success || phoneNumberSchema.safeParse(value).success, {
    message: 'invalid_email_or_phone_number',
  });

export const passwordSchema = z
  .string()
  .min(8, { message: 'password_validation_length_min' })
  .max(30, { message: 'password_validation_length_max' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'password_validation_capital_letter',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'password_validation_lower_case_letter',
  })
  .refine((password) => /\d/.test(password), {
    message: 'password_validation_one_digit',
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'password_validation_one_symbol',
  });

export const emailSchema = z.string().email('email_validation_error');

export const verificationMethodSchema = z.string().and(z.literal('phoneNumber')).or(z.literal('email'));

export const phoneNumberSchema = z.coerce
  .number()
  .gte(100000000, { message: 'phone_number_validation_error' })
  .lte(999999999, { message: 'phone_number_validation_error' });
