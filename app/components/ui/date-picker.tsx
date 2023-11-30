'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { inputClass, inputLabelClass } from './input';
import { useTranslation } from 'react-i18next';
import { forwardRef, useEffect, useState } from 'react';

type Props = {
  placeholder: string;
  onChange: (date?: Date) => void;
};

export const DatePicker = forwardRef(({ placeholder, onChange }: Props, ref) => {
  const [date, setDate] = useState<Date>();
  const { t } = useTranslation();

  useEffect(() => {
    onChange(date);
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={'relative w-full'}>
          <button
            type="button"
            tabIndex={0}
            data-hasvalue={!!date}
            className={cn(inputClass, 'group-data-[hasvalue="true"]:top-1 group-data-[hasvalue="true"]:translate-y-0')}
          >
            {!!date && format(date, 'PPP')} <CalendarIcon className="ml-auto h-4 w-4" />
          </button>
          <span className={inputLabelClass}>{t(placeholder)}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={{
            from: new Date(2023, 10, 24),
            to: new Date(2023, 10, 30),
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
});
DatePicker.displayName = 'DatePicker';
