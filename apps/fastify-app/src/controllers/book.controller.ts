import { FastifyReply, FastifyRequest } from "fastify";
import { IBookRepository } from "../repositories/book.repository";
import { DeleteBookParams, NewBookParams, UpdateBookParams } from "../schemas/book.schema";

export const createBook = (bookRepository: IBookRepository) =>
  async function (request: FastifyRequest, reply: FastifyReply) {
    await bookRepository.createBook(request.body as NewBookParams)
      .then(bookId => { reply.status(200).send({ bookId })})
      .catch(error => { reply.status(400).send(error)})
  }

export const deleteBook = (bookRepository: IBookRepository) =>
  async function (request: FastifyRequest, reply: FastifyReply) {
    await bookRepository.deleteBook(request.body as DeleteBookParams)
      .then(() => { reply.status(200)})
      .catch(error => { reply.status(400).send(error)})
  }

export const getBooks = (bookRepository: IBookRepository) =>
  async function (request: FastifyRequest, reply: FastifyReply) {
    await bookRepository.getBooks()
      .then(books => { reply.status(200)
      .send(books)}).catch(error => { reply.status(400).send(error)})
  }

export const updateBook = (BookRepository: IBookRepository) =>
  async function (request: FastifyRequest, reply: FastifyReply) {
    await BookRepository.updateBook(request.body as UpdateBookParams)
      .then(bookId => { reply.status(200).send({ bookId })})
      .catch(error => { reply.status(400).send(error)})
  }