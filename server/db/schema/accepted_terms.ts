import { varchar, serial, date, pgTable, text, boolean } from 'drizzle-orm/pg-core';
import { user } from './user';

export const acceptedTerms = pgTable('accepted_terms', {
  id: serial('id'),
  event_type: varchar('event_type', { length: 100 }),
  value: boolean('value').default(false),
  user_id: varchar('user_id', { length: 15 }).references(() => user.id),
  user_agent: text('user_agent'),
  ip: varchar('ip', { length: 20 }),
  register_data: date('register_data'),
  created_at: date('created_at').defaultNow(),
});
