import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { createId } from '@paralleldrive/cuid2';

export const ideas = sqliteTable('ideas', {
    id: text('id').primaryKey().notNull().$defaultFn(() => createId()),
    username: text('username').notNull(),
    description: text('description').notNull(),
    votes: integer('votes').notNull().$default(() => 0),
    createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
    updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString())
});
