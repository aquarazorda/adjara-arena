import { varchar, serial, pgTable, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const category = pgTable('categories', {
  id: serial('id').primaryKey(),
  parentId: integer('parentId'),
  sort: integer('sort').notNull(),
  name: varchar('name').notNull(),
  slug: varchar('slug'),
  icon: varchar('icon'),
  createdAt: timestamp('createdAt', { precision: 2 }).defaultNow(),
});

export const categoryRelation = relations(category, ({ one, many }) => ({
	parent: one(category, {
		fields: [category.parentId],
		references: [category.id],
        relationName: 'recursiveCategories', 
	}),
    children: many(category, {
        relationName: 'recursiveCategories',
    })
}));
