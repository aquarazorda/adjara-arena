import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from 'app/lib/utils';
import { buttonVariants } from 'app/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-0 text-grey-500 dark:text-grey-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-grey-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-grey-100',
        row: 'flex w-full mt-2',
        cell: 'text-center text-sm p-0 relative bg-transparent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-grey-300 dark:text-white'
        ),
        day_selected: 'rounded-md bg-grey-300 !text-white dark:bg-grey-300 dark:text-white',
        day_today: 'border border-grey-300 text-white dark:border-grey-300 dark:text-white',
        day_outside: 'text-grey-500 opacity-50 dark:text-grey-200',
        day_disabled: 'text-grey-500 opacity-50 dark:text-grey-400',
        day_range_middle:
          '!h-7 !rounded-none !my-1 aria-selected:bg-silver-500/30 aria-selected:!text-black dark:aria-selected:bg-grey-300/30 dark:aria-selected:!text-white',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
