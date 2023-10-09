import { int, datetime, mediumtext, mysqlTable, text, boolean } from 'drizzle-orm/mysql-core';

export const posts = mysqlTable("posts", {
  id: int("id").primaryKey().autoincrement().notNull(),
  title: mediumtext("title"),
  shortstory: text("shortstory"),
  publishDate: datetime("publish_date"),
  isPrivate: boolean("is_private").notNull().default(false),
  createdAt: datetime("created_at"),
  isDraft: boolean("is_draft").notNull().default(false),
  image: mediumtext("image"),
});