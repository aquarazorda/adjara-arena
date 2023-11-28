import { db } from 'server/db';
import { Schedule } from './schedule';
import { and, between, eq, isNotNull, or } from 'drizzle-orm';
import { setantaEvent } from 'server/db/schema/setanta_event';
import { serverEnv } from 'server/env';
import { utcToZonedTime } from 'date-fns-tz';
import { addHours, subHours } from 'date-fns';

export type SetantaEvent = typeof setantaEvent.$inferSelect;

export default class sendReminder extends Schedule {
  public readonly name: string = 'Send reminder';

  // Every five minute
  public readonly pattern: string = '*/5 * * * *';

  now() {
    const timeZone = 'Asia/Tbilisi';
    const date = new Date();
    const zonedDate = utcToZonedTime(date, timeZone);
    return addHours(zonedDate, 4);
  }

  async handler(): Promise<void> {
    const matches = await db.query.setantaEvent.findMany({
      where: and(
        or(
          between(setantaEvent.startAt, subHours(this.now(), 1), addHours(this.now(), 2)),
          eq(setantaEvent.status, 'live')
        ),
        isNotNull(setantaEvent.matchId)
      ),
    });

    matches.forEach(async (match: SetantaEvent) => {
      if (match.matchId) {
        const status = await this.getMatchStatus(match.matchId);

        await db
          .update(setantaEvent)
          .set({ status: status || 'not_found' })
          .where(eq(setantaEvent.matchId, String(match.matchId)));
      }
    });
  }

  async getMatchStatus(id: string) {
    const url = `${serverEnv.SPORTBOOK_API}/sportsbook/rest/v2/matches/${id}`;

    try {
      const response = await fetch(url).then((res) => res.json());

      return response.providerStatus;
    } catch (Err) {
      console.log('ERR');
    }
  }
}
