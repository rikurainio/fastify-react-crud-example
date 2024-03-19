import fastify from "fastify";
import { Logger, env } from "./utils";
import { bookRoutes } from "./routes";
import { BookRepository } from "./repositories/book.repository";
import { initializeDatabase } from "./db";

const API_VERSION = "v1";

export const main = async () => {
  const server = fastify({
    bodyLimit: 1_000_000,
    trustProxy: true,
  });

  await initializeDatabase()
  const bookRepository = new BookRepository()

  server.register(import("@fastify/cors"), {
    maxAge: 600,
    origin: true,
    credentials: true,
  });

  // Routes
  bookRoutes(bookRepository).forEach(route => {
    server.register((fastify, options, next) => {
      fastify.route(route);
      next();
    }, { prefix: `${API_VERSION}/books` })
  })

  server.listen({ port: env.PORT }, (error, address) => {
    if (error) {
      Logger.error("INIT", error.message);
      throw new Error(error.message);
    }

    Logger.info("INIT", `Server listening at ${address}`);
  });

  return server;
};

main();