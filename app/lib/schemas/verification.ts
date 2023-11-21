import { z } from 'zod';
import { emailSchema, looseOptional, phoneNumberSchema } from './shared-user.schema';
import { match } from 'ts-pattern';

export const verificationCodeFormInputSchema = z.coerce
  .string()
  .length(6, {
    message: 'verification_code_value_error',
  });

export const verificationCodeSchema = z.object({
  id: z.coerce.number(),
  verificationCode: verificationCodeFormInputSchema,
  value: z.coerce.string(),
});

export const verificationSendSchema = z.object({
  phoneNumber: looseOptional(phoneNumberSchema),
  email: looseOptional(emailSchema),
  verificationMethod: z.enum(['email', 'phoneNumber']),
})

export const verificationInputSchema = z
  .object({
    verificationCode: verificationCodeFormInputSchema,
    verificationId: z.coerce.number(),
  })
  .merge(verificationSendSchema);
