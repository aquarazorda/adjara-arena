import { z } from 'zod';

export const emailOrPhoneNumberSchema = z
  .string()
  .refine((value) => emailSchema.safeParse(value).success || phoneNumberSchema.safeParse(value).success, {
    message: 'invalid_email_or_phone_number',
  });

export const emailSchema = z.string().email('email_validation_error');

export const verificationMethodSchema = z.string().and(z.literal('phoneNumber')).or(z.literal('email'));

export const phoneNumberSchema = z.coerce
  .number()
  .gte(100000000, { message: 'phone_number_validation_error' })
  .lte(999999999, { message: 'phone_number_validation_error' });
