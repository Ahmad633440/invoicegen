import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--card-foreground)] shadow-sm dark:border-[color:var(--border)] dark:bg-[color:var(--card)] dark:text-[color:var(--card-foreground)]",
  {
    variants: {
      variant: {
        default: "",
        elevated: "shadow-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, className }))} {...props} />
  )
)
Card.displayName = "Card"

export { Card }
