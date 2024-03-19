import React from "react"
import { cn } from "../utils"

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ className, ...props }: buttonProps) => {
  return (
    <button
      className={cn("px-2 py-1 bg-button rounded hover:bg-buttonHover", className)}
      {...props}
    />
  )
}

export default Button