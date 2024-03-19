import { z } from "zod";

const newBookParams = z.object({
	title: z.string().max(100),
	author: z.string().max(50),
	description: z.string().max(350),
});

const updateBookParams = z.object({
	id: z.number(),
	title: z.string().max(100),
	author: z.string().max(50),
	description: z.string().max(350),
});

const deleteBookParams = z.object({
	id: z.number(),
});

export type NewBookParams = z.infer<typeof newBookParams>;
export type UpdateBookParams = z.infer<typeof updateBookParams>;
export type DeleteBookParams = z.infer<typeof deleteBookParams>;

export interface Book {
	title: string;
	author: string;
	description: string;
	id: number;
}
