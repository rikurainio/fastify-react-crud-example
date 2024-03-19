import type { Book } from "@buutti/shared";
import type React from "react";
import { cn } from "../utils";

interface BookCardProps extends React.HTMLAttributes<HTMLDivElement> {
	book: Book;
}

const BookCard = ({ book, className, ...props }: BookCardProps) => {
	return (
		<div
			{...props}
			className={cn(
				"bg-card px-3 py-1 rounded border border-border h-20 w-full cursor-pointer",
				className,
			)}
		>
			<div className="flex items-center gap-1">
				<h3 className="font-semibold">{book.title}</h3>-
				<p className="text-sm">{book.author}</p>
			</div>
			<p>{book.description}</p>
		</div>
	);
};

export default BookCard;
