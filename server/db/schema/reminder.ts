import { varchar, serial, pgTable, timestamp, text, integer, pgEnum } from 'drizzle-orm/pg-core';
import { user } from './user';
import { setantaEvent } from './setanta_event';
import { relations } from 'drizzle-orm';
import { DrizzlePgEnum } from '../types';

export const channelType = pgEnum('channel', ['sms', 'email']);

export type ChannelType = DrizzlePgEnum<typeof channelType>;

export const reminder = pgTable('reminders', {
  id: serial('id').primaryKey(),
  userId: varchar('userId', { length: 15 }).references(() => user.id).notNull(),
  eventId: integer('eventId').references(() => setantaEvent.id).notNull(),
  phone: text('message'),
  message: text('message'),
  channel: channelType('channel'),
  sendAt: timestamp('sendAt', { precision: 2 }),
  createdAt: timestamp('createdAt', { precision: 2 }).defaultNow(),
});

export const reminderRelations = relations(reminder, ({ one }) => ({
	user: one(user, {
		fields: [reminder.userId],
		references: [user.id],
	}),
  event: one(setantaEvent, {
    fields: [reminder.eventId],
		references: [setantaEvent.id],
  })
}));
