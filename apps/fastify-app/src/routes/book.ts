import type { RouteOptions } from "fastify";
import { IBookRepository } from "../repositories/book.repository";
import { createBook, deleteBook, getBooks, updateBook } from "../controllers/book.controller";

export const bookRoutes = (bookRepository: IBookRepository): RouteOptions[] => ([
  { 
    method: "GET",
    url: "/list",
    handler: getBooks(bookRepository)
  },
  {
    method: "DELETE",
    url: "/",
    handler: deleteBook(bookRepository)
  },
  {
    method: "PUT",
    url: "/",
    handler: updateBook(bookRepository)
  },
  {
    method: "POST",
    url: "/create",
    handler: createBook(bookRepository)
  }
])
