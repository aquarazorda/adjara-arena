import { and, eq, lt } from 'drizzle-orm';
import { db } from 'server/db';
import { verification } from 'server/db/schema/verification';
import { Err, Ok } from 'ts-results';
import { z } from 'zod';
import { verificationCodeSchema } from '~/lib/schemas/verification';
import { sendVerificationCode } from './sms.service';

export const generateVerificationCode = async () => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const res = await db.insert(verification).values({ code: code }).returning({ id: verification.id });

    if (res.length === 0) {
      return Err('Failed to generate verification code');
    }

    return Ok({
      id: res[0].id,
      code: code,
    });
  } catch (e) {
    return Err('Failed to generate verification code');
  }
};

export const generateVerificationAndSendSms = async (phone: number) => {
  const generateRes = await generateVerificationCode();

  if (generateRes.err) {
    return generateRes;
  }

  const res = await sendVerificationCode({
    type: 'phone',
    code: generateRes.val.code,
    phone,
  });

  return res;
};

export const validateVerificationCode = async (input: z.infer<typeof verificationCodeSchema>) => {
  const res = await db.query.verification.findFirst({
    where: and(
      eq(verification.id, input.id),
      eq(verification.code, String(input.verificationCode)),
      lt(verification.validTill, new Date())
    ),
  });

  if (!res) {
    return Err('Invalid verification code');
  }

  return Ok({});
};
