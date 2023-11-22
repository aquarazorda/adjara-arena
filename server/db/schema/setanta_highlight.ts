import { varchar, serial, pgTable, timestamp, integer } from 'drizzle-orm/pg-core';
import { setantaEvent } from './setanta_event';

export const setantaHighlight = pgTable('setanta_highlights', {
  id: serial('id'),
  eventId: integer('eventId').references(() => setantaEvent.id).notNull(),
  title: varchar('title', { length: 200 }),
  link: varchar('link', { length: 200 }),
  duration: varchar('duration', { length: 20 }),
  createdAt: timestamp('createdAt', { precision: 2 }).defaultNow(),
});
