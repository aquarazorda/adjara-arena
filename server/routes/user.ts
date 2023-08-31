import { parseCookies } from 'server/utils/request';
import { z } from "zod";
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
      return true;
    })
});
