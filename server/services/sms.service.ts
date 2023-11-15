import { serverEnv } from 'server/env';
import { P, match } from 'ts-pattern';
import { Err, Ok } from 'ts-results';

const sendPhoneMessage = async (phone: number, message: string) => {
  const formData = new FormData();
  formData.append('phone', phone.toString());
  formData.append('message', message);

  try {
    const res = await fetch(serverEnv.SMS_SERVICE_PATH + "/send", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${serverEnv.SMS_SERVICE_TOKEN}`
      },
      body: formData
    }).then(res => res.json());

    if (res?.status === 'success') {
      return Ok({});
    }

    return Err("Failed to send message");
  } catch (e) {
    return Err("SMS service error");
  }
};

type SendVerificationCodeInput = {
  type: 'email',
  email: string,
  code: string
} | {
  type: 'phone',
  phone: number,
  code: string
};

export const sendVerificationCode = (input: SendVerificationCodeInput) => match(input)
  .with({ type: 'phone', phone: P.number, code: P.string }, async ({ phone, code }) => {
    return await sendPhoneMessage(phone, `Your verification code is ${code}`);
  })
  .with({ type: 'email', email: P.string, code: P.string }, async ({ email, code }) => {
    return Err("Email verification is not implemented yet");
  })
  .otherwise(async () => Err("Invalid input type"));