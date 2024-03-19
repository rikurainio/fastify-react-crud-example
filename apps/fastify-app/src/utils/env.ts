import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z
		.string()
		.default("postgres://postgres:postgres@127.0.0.1:5432/db"),
	PORT: z.coerce.number().default(3000),
	HOST: z.string().default("127.0.0.1"),
});

export const env = envSchema.parse(process.env);
