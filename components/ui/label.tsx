import * as React from "react"
import { cn } from "@/lib/utils"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

function Label({ className, ...props }: LabelProps) {
  return <label className={cn("text-sm font-medium leading-none text-slate-900 dark:text-slate-100/90", className)} {...props} />
}

export { Label }
