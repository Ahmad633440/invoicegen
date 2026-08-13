import * as React from "react"
import { cn } from "@/lib/utils"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

function Label({ className, ...props }: LabelProps) {
  return <label className={cn("text-sm font-medium leading-none text-[color:var(--foreground)]", className)} {...props} />
}

export { Label }
