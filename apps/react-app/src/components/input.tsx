import { cn } from "../utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className, type, ...props }: InputProps) => {
  return (
    <input
      type={type}
      className={cn("px-[0.4rem] py-[0.2rem] outline-none border border-border bg-input", className)}
      {...props}
    />
  )
}

export default Input