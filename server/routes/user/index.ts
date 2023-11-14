// import { auth } from 'server/auth/lucia';
import { db } from 'server/db';
import { acceptedTerms } from 'server/db/schema/accepted_terms';
import { z } from 'zod';
import { parseCookies } from '~/lib/cookies';
import { createTRPCRouter, privateProcedure, publicProcedure } from '~/routes/api.trpc.$/trpc';
import { authenticate } from './authentication';

export const userRouter = createTRPCRouter({
  get: privateProcedure.query(async ({ ctx }) => {
    const cookies = parseCookies(ctx.req.headers.get('Cookie'));

    return cookies.auth === '1';
  }),
  storeAcceptTerms: publicProcedure
    .input(
      z.object({
        value: z.boolean(),
        user_agent: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const ip = ctx.req.headers.get('X-Client-IP') || '';

      return db.insert(acceptedTerms).values({
        ip,
        event_type: 'onChange',
        user_agent: input.user_agent,
        value: input.value,
      });
    }),
  authenticate
});
