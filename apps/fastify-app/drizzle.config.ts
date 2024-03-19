import type { Config } from "drizzle-kit";

export default {
	driver: "pg",
	schema: "src/db/schema.ts",
	out: "./drizzle",
	dbCredentials: {
		connectionString: process.env.DATABASE_URL as string,
	},
} satisfies Config;
