import { VerificationType } from 'server/db/schema/verification';
import { serverEnv } from 'server/env';
import { P, match } from 'ts-pattern';
import { Err, Ok } from 'ts-results';

const sendPhoneMessage = async (phone: number, message: string) => {
  const formData = new FormData();
  formData.append('phone', phone.toString());
  formData.append('message', message);
  
  const res = await fetch(serverEnv.SMS_SERVICE_PATH + '/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${serverEnv.SMS_SERVICE_TOKEN}`,
    },
    body: formData,
  })
    .then(async (res) => {
      const json = await res.json();

      if (json?.status === 'success') {
        return Ok({});
      }
      
      return Err('error_sending_verification_code');
    })
    .catch((e) => {
      console.log(e);
      return Err('SMS service error')
    });

  return res;
};

type SendVerificationCodeInput =
  | {
      type: 'email';
      email: string;
      code: string;
    }
  | {
      type: 'phoneNumber';
      phone: number;
      code: string;
    };

export const sendVerificationCode = (input: SendVerificationCodeInput) =>
  match(input)
    .with({ type: 'phoneNumber', phone: P.number, code: P.string }, async ({ phone, code }) => {
      return await sendPhoneMessage(phone, `Your verification code is ${code}`); // TODO Swap this message
    })
    .with({ type: 'email', email: P.string, code: P.string }, async ({ email, code }) => {
      return Err('Email verification is not implemented yet');
    })
    .otherwise(async () => Err('Invalid input type'));
