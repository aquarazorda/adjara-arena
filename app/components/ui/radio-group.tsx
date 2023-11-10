import { Circle } from 'lucide-react';
import { Label } from './label';
import React from 'react';
import { cn } from '~/lib/utils';

type RadioProps = { label: string; value: string };
type RadioGroupProps = {
  title?: string;
  values: RadioProps[];
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ title, values, value, ...props }: RadioGroupProps, ref) => {
    if (!value) {
      value = values[0].value;
    }

    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm dark:text-silver text-dark-silver-text">{title}</p>
        <div className="flex items-center gap-4">
          {values.map((v: { label: string; value: string }, i) => (
            <Label
              className={cn(
                'flex items-center cursor-pointer text-sm',
                value === v.value
                  ? 'text-dark-silver-text dark:text-white-secondary'
                  : 'text-silver-ground dark:text-silver'
              )}
              key={i}
            >
              <input type="radio" id={v.value + i} {...props} value={v.value} className="hidden" />
              <div className="flex justify-center items-center w-5 h-5 relative">
                <Circle
                  className={cn(
                    'absolute inset-0 w-5 h-5 stroke-[1px]',
                    value === v.value ? 'fill-green/20 text-[transparent]' : 'text-silver'
                  )}
                />
                <Circle
                  className={cn('w-2 h-2 fill-green text-[transparent]', value === v.value ? 'block' : 'hidden')}
                />
              </div>
              <span className="ml-2">{v.label}</span>
            </Label>
          ))}
        </div>
      </div>
    );
  }
);

export default RadioGroup;
