import type {
	Book,
	DeleteBookParams,
	NewBookParams,
	UpdateBookParams,
} from "@buutti/shared";

export const getBooks = async (): Promise<Book[]> => {
	const response = await fetch("http://localhost:3000/v1/books");
	return await response.json();
};

export const updateBook = async (b: UpdateBookParams): Promise<number> => {
	const response = await fetch("http://localhost:3000/v1/books", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(b),
	});
	return await response.json();
};

export const deleteBook = async (b: DeleteBookParams): Promise<void> => {
	await fetch("http://localhost:3000/v1/books", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(b),
	});
	return
};

export const createBook = async (b: NewBookParams): Promise<number> => {
	const response = await fetch("http://localhost:3000/v1/books", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(b),
	});
	return await response.json();
};
