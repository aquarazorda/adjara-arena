import { eq, or } from 'drizzle-orm';
import { db } from 'server/db';
import { setantaEvent, setantaEventStatus } from 'server/db/schema/setanta_event';
import { DrizzlePgEnum } from 'server/db/types';
import { createTRPCRouter, publicProcedure } from '~/routes/api.trpc.$/trpc';

type Status = Exclude<DrizzlePgEnum<typeof setantaEventStatus>, 'not_found'>;

const setantaRouter = createTRPCRouter({
  getMatches: publicProcedure.query(async () => {
    const res = await db.query.setantaEvent.findMany({
      where: or(
        eq(setantaEvent.status, 'live'),
        eq(setantaEvent.status, 'not_started'),
        eq(setantaEvent.status, 'ended')
      ),
    });

    const aggregated = res.reduce(
      (acc, event) => {
        acc[event.status as Status].push(event);
        return acc;
      },
      {
        live: [],
        not_started: [],
        ended: [],
      } as { [key in Status]: typeof res }
    );

    return aggregated;
  }),
});

export default setantaRouter;
