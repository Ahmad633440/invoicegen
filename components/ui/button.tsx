import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:bg-[color:var(--ring)] focus-visible:ring-[color:var(--ring)]",
        outline:
          "border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--foreground)] hover:bg-[color:var(--secondary)] aria-expanded:bg-[color:var(--secondary)] dark:border-[color:var(--border)] dark:bg-[color:var(--card)] dark:text-[color:var(--foreground)] dark:hover:bg-[color:var(--secondary)]",
        secondary:
          "bg-[color:var(--secondary)] text-[color:var(--secondary-foreground)] hover:bg-[color:var(--muted)] aria-expanded:bg-[color:var(--muted)] dark:bg-[color:var(--secondary)] dark:text-[color:var(--secondary-foreground)] dark:hover:bg-[color:var(--muted)]",
        ghost:
          "text-[color:var(--foreground)] hover:bg-[color:var(--secondary)] aria-expanded:bg-[color:var(--secondary)] dark:text-[color:var(--foreground)] dark:hover:bg-[color:var(--secondary)]",
        destructive:
          "bg-rose-100 text-rose-700 hover:bg-rose-200 focus-visible:border-rose-400 focus-visible:ring-rose-200",
        link: "text-[color:var(--primary)] underline-offset-4 hover:underline dark:text-[color:var(--primary-foreground)]",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
