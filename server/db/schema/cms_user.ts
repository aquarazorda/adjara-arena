import { varchar, serial, integer, date, pgTable } from 'drizzle-orm/pg-core';

export const cmsUser = pgTable('cms_users', {
  id: serial('id'),
  role_id: integer('role_id'),
  email: varchar('email', { length: 150 }).unique(),
  password: varchar('password', { length: 200 }),
  full_name: varchar('full_name', { length: 200 }),
  position: varchar('position', { length: 200 }),
  created_at: date('created_at').defaultNow(),
});
