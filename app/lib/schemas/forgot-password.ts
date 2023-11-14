import { z } from 'zod';
import {
  emailSchema,
  phoneNumberSchema,
  verificationCodeSchema,
  verificationMethodSchema,
} from './shared-user.schema';

export const forgotPasswordFirstStepSchema = z
  .object({
    email: emailSchema.optional(),
    phoneNumber: phoneNumberSchema.optional(),
    verificationMethod: verificationMethodSchema,
    verificationCode: verificationCodeSchema,
  })
  .refine((data) => data.email || data.phoneNumber, {
    message: 'email_or_phone_number_required',
    path: ['email', 'phoneNumber'],
  });
