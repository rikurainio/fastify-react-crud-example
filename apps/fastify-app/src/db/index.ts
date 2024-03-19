import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { env, logger } from "../utils";
import * as schema from "./schema";

export let db: ReturnType<typeof drizzle<typeof schema>>;

export const initializeDatabase = async () => {
	const pool = await new Pool({
		connectionString: env.DATABASE_URL,
	})
		.connect()
		.then((client) => {
			logger.info("INIT", "Connected to database");

			return client;
		})
		.catch((error) => {
			logger.error("INIT", `Failed to connect to database ${String(error)}}`);
			throw new Error(`Failed to connect to database ${String(error)}`);
		});

	db = drizzle(pool, {
		schema,
	});

	await migrate(db, {
		migrationsFolder: "drizzle",
	})
		.then(() => {
			logger.info("INIT", "Migrated database");
		})
		.catch((error) => {
			logger.error("INIT", `Failed to migrate database ${String(error)}`);
			throw new Error(`Failed to migrate database ${String(error)}`);
		});
};
