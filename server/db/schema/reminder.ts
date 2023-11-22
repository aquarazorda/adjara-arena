import { varchar, serial, pgTable, timestamp, text, integer } from 'drizzle-orm/pg-core';
import { user } from './user';
import { setantaEvent } from './setanta_event';

export const reminder = pgTable('reminders', {
  id: serial('id'),
  userId: varchar('userId', { length: 15 }).references(() => user.id).notNull(),
  eventId: integer('eventId').references(() => setantaEvent.id).notNull(),
  phone: text('message'),
  message: text('message'),
  sendAt: timestamp('sendAt', { precision: 2 }),
  createdAt: timestamp('createdAt', { precision: 2 }).defaultNow(),
});
