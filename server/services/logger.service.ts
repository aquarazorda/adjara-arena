import { db } from 'server/db';
import { activityLogs } from 'server/db/schema/activity_logs';

type SaveLogInput = Omit<typeof activityLogs.$inferInsert, 'id' | 'created_at' | 'updated_at'>;

export const saveLog = async (log: SaveLogInput) => {
  const res = await db.insert(activityLogs).values(log);
  return res;
};
