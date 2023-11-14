import * as React from 'react';
import { cn } from 'app/lib/utils';
import { useRemixFormContext } from 'remix-hook-form';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  addon?: React.ReactNode;
}

export const inputClass =
  'peer flex pt-4 data-[hasvalue="true"]:pt-6 data-[hasvalue="true"]:pb-2 focus-visible:pt-6 focus-visible:pb-2 h-12 text-base w-full rounded-md border dark:border-light-grey border-silver px-3 bg-silver-light dark:bg-grey text-dark-grey dark:text-white-secondary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

export const inputLabelClass =
  'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-silver-600 transition-all duration-300 peer-focus-visible:top-1 peer-focus-visible:translate-y-0 peer-data-[hasvalue="true"]:top-1 peer-data-[hasvalue="true"]:translate-y-0';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, value = '', addon, onChange, ...props }: InputProps, ref) => {
    const { register } = useRemixFormContext();
    return (
      <div className="relative w-full">
        <>
          <input {...register(props.name!)} type={type} className={cn(inputClass, className)} {...props} />
          <label className={inputLabelClass}>{placeholder}</label>
          {addon && <div className="absolute right-0 top-1 pr-3">{addon}</div>}
        </>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
