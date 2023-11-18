import { like, or } from 'drizzle-orm';
import { db } from 'server/db';
import { user } from 'server/db/schema/user';
import { z } from 'zod';
import { createTRPCRouter, privateProcedure } from '~/routes/api.trpc.$/trpc';

const adminRouter = createTRPCRouter({
  findUser: privateProcedure.input(z.string()).query(async ({ input }) => {
    const res = await db.query.user.findMany({
      where: or(
        like(user.username, input),
        like(user.full_name, input),
        like(user.phone_number, input),
        like(user.personal_id, input)
      )
    });

    return res;
  })
});

export default adminRouter;