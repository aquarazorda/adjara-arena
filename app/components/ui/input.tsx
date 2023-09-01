import * as React from "react";

import { cn } from "app/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-12 text-base w-full rounded-md border border-input px-3 bg-background text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            props.value !== "" && "py-2 pt-6",
            className
          )}
          ref={ref}
          {...props}
        />
        <label
          className={cn(
            "absolute left-3 transition-all duration-300 text-border-hover text-xs",
            props.value === ""
              ? "top-1/2 -translate-y-1/2"
              : "top-1"
          )}
        >
          {placeholder}
        </label>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
