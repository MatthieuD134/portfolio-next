import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:cursor-pointer",
  {
    variants: {
      variant: {
        default: 'bg-transparent text-foreground/60 hover:text-foreground',
        primary:
          'text-primary/80 hover:text-primary relative before:absolute before:top-0 before:bottom-0 before:left-0 before:w-2 before:border before:border-r-0 before:transition-all after:absolute after:top-0 after:right-0 after:bottom-0 after:w-2 after:border after:border-l-0 after:transition-all hover:before:translate-x-2 hover:after:-translate-x-2',
        secondary:
          'text-cyan-400/80 hover:text-cyan-400 relative before:absolute before:top-0 before:bottom-0 before:left-0 before:w-2 before:border before:border-r-0 before:transition-all after:absolute after:top-0 after:right-0 after:bottom-0 after:w-2 after:border after:border-l-0 after:transition-all hover:before:translate-x-2 hover:after:-translate-x-2',
        foreground:
          'text-foreground/80 hover:text-foreground relative before:absolute before:top-0 before:bottom-0 before:left-0 before:w-2 before:border before:border-r-0 before:transition-all after:absolute after:top-0 after:right-0 after:bottom-0 after:w-2 after:border after:border-l-0 after:transition-all hover:before:translate-x-2 hover:after:-translate-x-2',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
