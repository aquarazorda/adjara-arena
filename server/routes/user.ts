import { createTRPCRouter, privateProcedure } from '~/routes/api/trpc';

export const userRouter = createTRPCRouter({
  get: privateProcedure.query(async () => {
    // db.query.users.findMany();
    return "I'mma user!";
  })
});