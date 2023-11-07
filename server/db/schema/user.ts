import { bigint, date, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("auth_user", {
  id: varchar("id", {
    length: 15,
  }).primaryKey(),
  username: varchar("username", {
    length: 50,
  }),
  full_name: varchar("full_name", {
    length: 100,
  }),
  date_of_birth: date("date_of_birth"),
  phone_number: varchar("phone_number", {
    length: 15,
  }),
  email: varchar("email", {
    length: 100,
  }),
  address: text("address"),
  personal_id: bigint("personal_id", { mode: "number" }),
});

export const session = pgTable("user_session", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});

export const key = pgTable("user_key", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
});
