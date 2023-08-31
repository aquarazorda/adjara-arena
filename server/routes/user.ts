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
  get: privateProcedure.query(async () => {
    // db.query.users.findMany();
    return "I'mma user!";
  }),
  authenticate: publicProcedure
    .input(authSchema)
    .mutation(async ({ input }) => {
      console.log(input);
      return true;
    })
});
