import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'app/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium text-sm ring-offset-0 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white-border disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'border border-silver-ground-lower bg-secondary text-white-secondary ring-white-secondary hover:bg-[#222930]',
        success: 'bg-green text-white-secondary ring-white-secondary hover:bg-[#038047]',
        // destructive:
        //   "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // secondary:
        //   "text-secondary-foreground bg-secondary hover:bg-secondary/80",
        ghost: 'text-white focus-visible:ring-0',
        // link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-12 rounded-md px-8 text-base uppercase',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} autoFocus={false} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
