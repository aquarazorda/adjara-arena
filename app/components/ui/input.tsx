import * as React from 'react';
import { cn } from 'app/lib/utils';
import { useRemixFormContext } from 'remix-hook-form';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  addon?: React.ReactNode;
  tooltipContent?: JSX.Element;
  value?: string | number | readonly string[] | undefined | null;
}

export const inputClass =
  'peer flex pt-4 data-[hasvalue="true"]:pt-6 data-[hasvalue="true"]:pb-2 focus-visible:pt-6 focus-visible:pb-2 h-12 text-base w-full rounded-md border dark:border-grey-400 border-silver-400 aria-[invalid="true"]:border-error-red px-3 bg-silver-200 dark:bg-grey-500 text-dark-grey dark:text-white-secondary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50';

export const inputLabelClass =
  'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-silver-600 transition-all duration-300 peer-focus-visible:top-1 peer-focus-visible:translate-y-0 peer-data-[hasvalue="true"]:top-1 peer-data-[hasvalue="true"]:translate-y-0 peer-aria-[invalid="true"]:text-error-red';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      placeholder,
      value = '',
      addon,
      tooltipContent,
      onChange,
      onFocus,
      onBlur,
      ...props
    }: InputProps,
    ref
  ) => {
    const { register } = useRemixFormContext();
    const [inputFocus, setInputFocus] = React.useState(false);
    return (
      <div className="relative w-full">
        <>
          <input
            {...register(props.name!)}
            type={type}
            className={cn(inputClass, className)}
            onFocus={(e) => {
              setInputFocus(true);
              onFocus && onFocus(e);
            }}
            onBlur={(e) => {
              setInputFocus(false);
              onBlur && onBlur(e);
            }}
            {...props}
          />
          <label className={inputLabelClass}>{placeholder}</label>
          {addon && <div className="absolute right-0 top-1 pr-3">{addon}</div>}
        </>
        {tooltipContent && (
          <div
            className={cn(
              'absolute bottom-[calc(100%+12px)] bg-silver-300 dark:bg-grey-500 p-4 rounded-[12px] after:block after:rounded-base after:w-[18px] after:h-[18px] after:rotate-45 after:bg-silver-300 dark:after:bg-grey-500 after:bottom-[-7px] after:absolute transition-opacity',
              inputFocus ? 'opacity-100' : 'invisible opacity-0'
            )}
          >
            {tooltipContent}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
