import { sql } from 'drizzle-orm';
import { date, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const verification = pgTable("verification", {
  id: serial("id").primaryKey(),
  code: varchar("code", {
    length: 6,
  }).notNull(),
  validTill: timestamp('validTill').default(sql`now() + interval '1 minute'`),
})