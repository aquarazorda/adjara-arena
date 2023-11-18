import { generateVerificationAndSendSms, validateVerificationCode } from 'server/services/verification.service';
import { createFormErrorReturn } from 'server/utils/form';
import { P, match } from 'ts-pattern';
import { Ok } from 'ts-results';
import { verificationCodeSchema, verificationSendSchema } from '~/lib/schemas/verification';
import { createTRPCRouter, publicProcedure } from '~/routes/api.trpc.$/trpc';

const verificationRouter = createTRPCRouter({
  generateCodeAndSend: publicProcedure.input(verificationSendSchema).mutation(async ({ input }) => {
    const errorResponse = createFormErrorReturn(input);
    const res = await match(input)
      .with({ verificationMethod: 'phoneNumber', phoneNumber: P.number.select() }, async (number) => {
        const res = await generateVerificationAndSendSms(number);

        if (res.err) {
          return errorResponse({
            phoneNumber: res.val,
          });
        }

        return res;
      })
      // .with({verificationMethod: 'email', email: P.string.select()}, async ())
      .otherwise(async () => {
        return errorResponse({
          verificationMethod: 'verification_method_invalid',
        });
      });

    return res;
  }),
  verifyCode: publicProcedure.input(verificationCodeSchema).mutation(async ({ input }) => {
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
        verificationCode: 'verification_code_send_error',
      });
    }
  }),
});

export default verificationRouter;
