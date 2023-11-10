import * as React from 'react';
import { cn } from 'app/lib/utils';

type InputProps = {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  [x: string]: any;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, value = '', ...props }: InputProps, ref) => {
    const [focused, setFocused] = React.useState(false);

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            'flex h-12 text-base w-full rounded-md border dark:border-light-grey border-silver px-3 bg-silver-light dark:bg-grey text-dark-grey dark:text-white-secondary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            !focused && value === '' ? 'pt-6 pb-2' : 'pt-4',
            className
          )}
          onBlur={() => {
            setFocused(false);
          }}
          onFocus={() => {
            props.onFocus?.();
            setFocused(true);
          }}
          {...props}
        />
        <label
          className={cn(
            'absolute left-3 transition-all duration-300 text-border-hover text-xs pointer-events-none text-[#80868B]',
            !focused && value === '' ? 'top-1/2 -translate-y-1/2' : 'top-1'
          )}
        >
          {placeholder}
        </label>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
