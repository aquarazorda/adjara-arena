import { z } from 'zod';
import {
  emailSchema,
  phoneNumberSchema,
  verificationMethodSchema,
} from './shared-user.schema';
import { verificationCodeFormInputSchema } from './verification';

export const forgotPasswordFirstStepSchema = z
  .object({
    email: emailSchema.optional().or(z.literal('')),
    phoneNumber: phoneNumberSchema.optional().or(z.literal('')),
    verificationMethod: verificationMethodSchema,
    verificationCode: verificationCodeFormInputSchema,
  })
  .refine((data) => data.email || data.phoneNumber, {
    message: 'email_or_phone_number_required',
    path: ['email', 'phoneNumber'],
  });
