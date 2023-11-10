// import { auth } from 'server/auth/lucia';
import { z } from "zod";
import { parseCookies } from '~/lib/cookies';
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/routes/api/trpc";

export const authSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const userRouter = createTRPCRouter({
  get: privateProcedure.query(async ({ ctx }) => {
    const cookies = parseCookies(ctx.req.headers.get("Cookie"));
    
    return cookies.auth === "1";
  }),
  authenticate: publicProcedure
    .input(authSchema)
    .mutation(async ({ input }) => {
      // const key = await auth.useKey("username", input.username, input.password);
      // const session = await auth.createSession({
      //   userId: key.userId,
      //   attributes: {}
      // });
      // const sessionCookie = auth.createSessionCookie(session);

      return new Response();
    })
});
