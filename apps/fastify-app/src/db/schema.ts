import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const books = pgTable("users", {
	id: serial("id"),
	title: text("title").notNull(),
	author: text("author").notNull(),
	description: text("description").notNull(),
});
