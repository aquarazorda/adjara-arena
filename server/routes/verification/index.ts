import {
  generateVerificationAndSendSms,
  generateVerificationCode,
  validateVerificationCode,
} from 'server/services/verification.service';
import { createFormErrorReturn } from 'server/utils/request';
import { Err, Ok } from 'ts-results';
import { phoneNumberSchema } from '~/lib/schemas/shared-user.schema';
import { verificationCodeSchema } from '~/lib/schemas/verification';
import { createTRPCRouter, publicProcedure } from '~/routes/api.trpc.$/trpc';

const verificationRouter = createTRPCRouter({
  generateCodeAndSendSms: publicProcedure.input(phoneNumberSchema).query(async ({ input }) => {
    const errorResponse = createFormErrorReturn({phoneNumber: input});
    const res = await generateVerificationAndSendSms(input);

    if (res.err) {
      return errorResponse({
        phoneNumber: res.val,
      });
    }

    return res;
  }),
  checkCode: publicProcedure.input(verificationCodeSchema).query(async ({ input }) => {
    const errorReponse = createFormErrorReturn(input);

    try {
      const res = await validateVerificationCode(input);

      if (res.err) {
        return errorReponse({
          verificationCode: 'verification_code_invalid',
        });
      }

      return Ok({});
    } catch (e) {
      return errorReponse({
        verificationCode: 'verification_code_send_error'
      })
    }
  }),
});

export default verificationRouter;
