import type { Book, NewBookParams } from "@buutti/shared";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getBooks } from "../services/book";
import BookCard from "./bookCard";
import BookForm from "./bookForm";

const Books = () => {
	const [editingBook, setEditingBook] = React.useState<number | undefined>(
		undefined,
	);
	const [formData, setFormData] = React.useState<NewBookParams>({
		title: "",
		author: "",
		description: "",
	});

	const { data: books } = useQuery({
		queryKey: ["books"],
		queryFn: getBooks,
	});

	return (
		<div className="lg:flex w-full gap-3">
			<BookForm
				formData={formData}
				setFormData={setFormData}
				editingBook={editingBook}
				setEditingBook={setEditingBook}
			/>

			{/** Map books */}
			<div
        data-testid="container-books"
        className="w-full h-full overflow-y-auto flex flex-col gap-2 border border-border rounded p-2 mt-[4.25rem] min-h-36 max-h-[35vh] lg:max-h-[80vh]"
      >
				{books?.sort((a,b) => b.id - a.id).map((book: Book) => (
					<BookCard
						key={book.id}
						book={book}
						onClick={() => {
							setEditingBook(book.id as number);
							setFormData(book as NewBookParams);
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default Books;
