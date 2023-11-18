import { json, pgEnum, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { user } from './user';

export const activityTypePgEnum = pgEnum('activityType', ['auth_success', 'forgot_password_success']);

export const activityLogs = pgTable('activity_log', {
  id: serial('id').primaryKey(),
  user_id: varchar('user_id', { length: 15 }).notNull().references(() => user.id),
  activity_type: activityTypePgEnum('activityType').notNull(),
  description: json('description'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
