import { z } from 'zod';
import { emailOrPhoneNumberSchema, passwordSchema } from './shared-user.schema';

export const authSchema = z.object({
  emailOrUsername: emailOrPhoneNumberSchema,
  password: passwordSchema,
});