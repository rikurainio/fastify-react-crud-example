import type { RouteOptions } from "fastify";
import {
	createBook,
	deleteBook,
	getBooks,
	updateBook,
} from "../controllers/book.controller";
import type { IBookRepository } from "../repositories/book.repository";

export const bookRoutes = (bookRepository: IBookRepository): RouteOptions[] => [
	{
		method: "GET",
		url: "/",
		handler: getBooks(bookRepository),
	},
	{
		method: "DELETE",
		url: "/",
		handler: deleteBook(bookRepository),
	},
	{
		method: "PUT",
		url: "/",
		handler: updateBook(bookRepository),
	},
	{
		method: "POST",
		url: "/",
		handler: createBook(bookRepository),
	},
];
