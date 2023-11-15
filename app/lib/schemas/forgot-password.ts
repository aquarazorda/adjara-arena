import { verificationInputSchema } from './verification';

export const forgotPasswordFirstStepSchema = verificationInputSchema.refine((data) => data.email || data.phoneNumber, {
  message: 'email_or_phone_number_required',
  path: ['email', 'phoneNumber'],
});
