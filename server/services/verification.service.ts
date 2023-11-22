import { and, eq, gt, lt } from 'drizzle-orm';
import { db } from 'server/db';
import { VerificationType, verification } from 'server/db/schema/verification';
import { Err, Ok } from 'ts-results';
import type { z } from 'zod';
import type { verificationCodeSchema } from '~/lib/schemas/verification';
import { sendVerificationCode } from './sms.service';
import { user } from 'server/db/schema/user';

const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export const storeVerificationCode = async (code: string, type: VerificationType, value: string, associatedUserId?: string | null) => {
  try {
    const res = await db
      .insert(verification)
      .values({ code: code, type, associatedUserId: associatedUserId ?? null, value })
      .returning({ id: verification.id });

    if (res.length === 0) {
      return Err('Failed to generate verification code');
    }

    return Ok({
      id: res[0].id,
    });
  } catch (e) {
    return Err('Failed to generate verification code');
  }
};

export const generateVerificationAndSendSms = async (phone: number) => {
  const code = generateVerificationCode();

  const res = await sendVerificationCode({
    type: 'phoneNumber',
    code,
    phone,
  });

  if (res.err) {
    return res;
  }

  try {
    const res = await db.query.user.findFirst({
      where: eq(user.phone_number, String(phone)),
    });

    return await storeVerificationCode(code, 'phoneNumber', String(phone), res?.id);
  } catch (e) {
    return await storeVerificationCode(code, 'phoneNumber', String(phone));
  }
};

export const generateVerificationAndSendEmail = async (email: string) => {
  const code = generateVerificationCode();
  
  const res = await sendVerificationCode({
    type: 'email',
    code,
    email,
  });

  if (res?.err) {
    return res;
  }
 
  try {
    const res = await db.query.user.findFirst({
      where: eq(user.email, String(email)),
    });

    return await storeVerificationCode(code, 'email', String(email), res?.id);
  } catch (e) {
    return await storeVerificationCode(code, 'email', String(email));
  }
};

export const validateVerificationCode = async (input: z.infer<typeof verificationCodeSchema>) => {
  const res = await db.query.verification.findFirst({
    where: and(
      eq(verification.id, input.id),
      eq(verification.code, String(input.verificationCode)),
      eq(verification.value, String(input.value)),
      // lt(verification.validTill, new Date()) server time is back 4 hour, we need momentjs
    ),
  });

  if (!res) {
    return Err('Invalid verification code');
  }

  return Ok({
    id: res.id,
    associatedUserId: res.associatedUserId,
  });
};
