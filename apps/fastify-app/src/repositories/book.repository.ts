import type {
	Book,
	DeleteBookParams,
	NewBookParams,
	UpdateBookParams,
} from "@buutti/shared";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { books } from "../db/schema";
import { logger } from "../utils";

export interface IBookRepository {
	createBook: (b: NewBookParams) => Promise<number>;
	getBooks: () => Promise<Book[]>;
	updateBook: (b: UpdateBookParams) => Promise<number>;
	deleteBook: (b: DeleteBookParams) => Promise<void>;
}

export class BookRepository implements IBookRepository {
	async createBook(b: NewBookParams): Promise<number> {
		logger.info("💾 DB", `[CREATEBOOK] ${b}`);
		return db
			.insert(books)
			.values({
				author: b.author,
				description: b.description,
				title: b.title,
			})
			.returning({ insertedId: books.id })
			.then((res) => {
				return res[0].insertedId;
			});
	}

	async getBooks(): Promise<Book[]> {
		logger.info("💾 DB", "[GETBOOKS]");
		return db
			.select()
			.from(books)
			.then((res) => {
				return res;
			});
	}

	async updateBook(b: UpdateBookParams): Promise<number> {
		logger.info("💾 DB", "[UPDATEBOOK]");
		return db
			.update(books)
			.set({ ...b })
			.where(eq(books.id, b.id))
			.returning({ updatedId: books.id })
			.then((res) => {
				return res[0].updatedId;
			});
	}

	async deleteBook(b: DeleteBookParams): Promise<void> {
		logger.info("💾 DB", `[DELETEBOOK] ${b}`);
		return db.delete(books).where(eq(books.id, b.id)).then();
	}
}
