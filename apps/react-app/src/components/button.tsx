import type React from "react";
import { cn } from "../utils";

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ className, type, ...props }: buttonProps) => {
	return (
		<button
			type={type}
			className={cn(
				"px-2 py-1 bg-button rounded hover:bg-buttonHover",
				className,
			)}
			{...props}
		/>
	);
};

export default Button;
