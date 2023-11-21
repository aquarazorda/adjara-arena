import { z } from 'zod';

export const emailOrPhoneNumberSchema = z
  .string()
  .refine((value) => emailSchema.safeParse(value).success || phoneNumberSchema.safeParse(value).success, {
    message: 'invalid_email_or_phone_number',
  });

export const looseOptional = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    (value: unknown) =>
      !value || value === 'undefined'
        ? undefined
        : value,
    schema.optional()
  );

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

export const emailSchema = z.string().email();

export const verificationMethodSchema = z.string().and(z.literal('phoneNumber')).or(z.literal('email'));

export const phoneNumberSchema = z.coerce
  .number()
  .gte(500000000, { message: 'phone_number_validation_error' })
  .lte(599999999, { message: 'phone_number_validation_error' });
