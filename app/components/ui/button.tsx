import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'app/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium text-sm ring-offset-0 transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'border border-[#333E4A] bg-[#28313B] text-white ring-white hover:bg-[#222930]',
        success: 'bg-green-500 text-white ring-white hover:bg-[#038047] disabled:bg-green-500/50',
        outline: 'border border-silver-200 bg-white text-silver-800',
        // destructive:
        //   "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // secondary:
        //   "text-secondary-foreground bg-secondary hover:bg-secondary/80",
        ghost: 'text-white focus-visible:ring-0',
        plain: '',
        link: "text-primary underline-offset-4 hover:underline",
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
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        autoFocus={false}
        type={type || 'button'}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
