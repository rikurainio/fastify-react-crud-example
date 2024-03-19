import fastify from "fastify";
import { initializeDatabase } from "./db";
import { BookRepository } from "./repositories/book.repository";
import { bookRoutes } from "./routes";
import { env, logger } from "./utils";

const API_VERSION = "v1";

export const main = async () => {
	const server = fastify({
		bodyLimit: 1_000_000,
		trustProxy: true,
	});

	await initializeDatabase();
	const bookRepository = new BookRepository();

	server.register(import("@fastify/cors"), {
		maxAge: 600,
		origin: true,
		credentials: true,
	});

	// Routes
	for (const route of bookRoutes(bookRepository)) {
		server.register(
			(fastify, options, next) => {
				fastify.route(route);
				next();
			},
			{ prefix: `${API_VERSION}/books` },
		);
	}

	server.listen({ port: env.PORT }, (error, address) => {
		if (error) {
			logger.error("INIT", error.message);
			throw new Error(error.message);
		}

		logger.info("INIT", `Server listening at ${address}`);
	});

	return server;
};

main();
