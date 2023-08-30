import { createTRPCRouter, privateProcedure } from '~/routes/api/trpc';

export const userRouter = createTRPCRouter({
  get: privateProcedure.query(async () => {
    return "I'mma user!";
  })
});