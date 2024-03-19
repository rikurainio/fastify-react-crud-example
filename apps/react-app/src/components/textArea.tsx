import { cn } from "../utils"

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = ({ className, ...props }: InputProps) => {
  return (
    <textarea
      className={cn("px-[0.4rem] py-[0.2rem] h-20 outline-none border border-border bg-input", className)}
      {...props}
    />
  )
}

export default TextArea