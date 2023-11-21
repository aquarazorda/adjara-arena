import { sql } from 'drizzle-orm';
import { PgEnum, date, pgEnum, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { DrizzlePgEnum } from '../types';
import { user } from './user';

export const verificationType = pgEnum('verification_type', ['email', 'phoneNumber']);

export type VerificationType = DrizzlePgEnum<typeof verificationType>;

export const verification = pgTable('verification', {
  id: serial('id').primaryKey(),
  code: varchar('code', {
    length: 6,
  }).notNull(),
  type: verificationType('verification_type').notNull(),
  validTill: timestamp('validTill').default(sql`now() + interval '1 minute'`),
  associatedUserId: varchar('id', {
    length: 15,
  }).references(() => user.id),
});

