import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex h-11 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-2 text-sm text-[color:var(--foreground)] shadow-sm transition focus:border-[color:var(--ring)] focus:ring-2 focus:ring-[color:var(--ring)]/10 disabled:cursor-not-allowed disabled:opacity-70 dark:border-[color:var(--border)] dark:bg-[color:var(--card)] dark:text-[color:var(--foreground)] dark:focus:border-[color:var(--ring)] dark:focus:ring-[color:var(--ring)]/10",
  {
    variants: {
      size: {
        default: "",
        sm: "h-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => {
    return <input ref={ref} type={type} className={cn(inputVariants({ className }))} {...props} />
  }
)
Input.displayName = "Input"

export { Input }
