import { z } from 'zod';
import { emailOrPhoneNumberSchema } from './shared-user.schema';
import { passwordSchema } from './password.schema';

export const authSchema = z.object({
  emailOrUsername: emailOrPhoneNumberSchema,
  password: passwordSchema,
});

