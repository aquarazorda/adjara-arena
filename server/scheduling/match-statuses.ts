import { db } from 'server/db';
import { Schedule } from './schedule';
import { and, between, eq, gt, isNotNull, lt, or } from 'drizzle-orm';
import moment from 'moment-timezone';
import { setantaEvent } from 'server/db/schema/setanta_event';
import axios from 'axios';
import { serverEnv } from 'server/env';

export type SetantaEvent = typeof setantaEvent.$inferSelect;

export default class sendReminder extends Schedule {
    public readonly name: string = 'Send reminder';

    // Every five minute
    public readonly pattern: string = '*/5 * * * *';

    now(): moment.Moment {
        return moment().tz('Asia/Tbilisi').add(4, 'hour');
    }

    async handler (): Promise<void> {
        const matches = await db.query.setantaEvent.findMany({
            where: and(
                or(
                    between(setantaEvent.startAt, this.now().subtract(1, 'hour'), this.now().add(2, 'hour')),
                    eq(setantaEvent.status, 'live')
                ),
                isNotNull(setantaEvent.matchId)
            ),
        })

        matches.forEach(async (match: SetantaEvent) => {
            if (match.matchId) {
                const status = await this.getMatchStatus(match.matchId)

                await db.update(setantaEvent)
                    .set({ status: status || 'not_found' })
                    .where(eq(setantaEvent.matchId, String(match.matchId)));   
            }
        })
    }

    async getMatchStatus(id: string) {
        const url = `${serverEnv.SPORTBOOK_API}/sportsbook/rest/v2/matches/${id}`;
    
        try {
            const response = await axios.get(url);
    
            return response.data.providerStatus;
        } catch (Err) {
            console.log('ERR');
        }
    }    
}
