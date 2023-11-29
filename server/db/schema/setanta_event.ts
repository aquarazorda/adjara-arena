import { relations } from 'drizzle-orm';
import { varchar, serial, pgTable, boolean, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { reminder } from './reminder';

export const setantaEventStatus = pgEnum('status', ['not_started', 'live', 'ended', 'not_found']);

export const setantaEvent = pgTable('setanta_events', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 100 }),
  tournament: varchar('tournament', { length: 100 }),
  status: setantaEventStatus('status').notNull(),
  matchId: varchar('matchId', { length: 100 }),
  poster: varchar('poster', { length: 200 }),
  cover: varchar('cover', { length: 200 }),
  link: varchar('link', { length: 200 }),
  withoutAuth: boolean('withoutAuth').default(false),
  pinToSlide: boolean('pinToSlide').default(false),
  startAt: timestamp('startAt', { precision: 2 }).notNull(),
  createdAt: timestamp('createdAt', { precision: 2 }).defaultNow(),
});

export const setantaEventRelation = relations(setantaEvent, ({ many }) => ({
  reminders: many(reminder)
}))
