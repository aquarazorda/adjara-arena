import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { cn } from '~/lib/utils';
import X from '../icons/X';

type ToastComponentProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description?: string;
};

export const ToastComponent = ({ open, setOpen, title, description }: ToastComponentProps) => {
  return (
    <Toast.Provider swipeDirection="right" duration={500000}>
      <Toast.Root
        className="bg-green text-white rounded-lg shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] px-4 py-2 flex items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="flex flex-col justify-center flex-1">
          {title ? (
            <Toast.Title
              className={cn('[grid-area:_title] font-medium text-slate12 text-[14px]', description ? 'mb-[5px]' : '')}
            >
              {title}
            </Toast.Title>
          ) : null}
          {description ? <Toast.Description className="text-[14px]">{description + 'asdasd'}</Toast.Description> : null}
        </div>
        <div className="bg-[#FFFFFF4D] h-[28px] md:h-[44px] w-[1px] mr-4"></div>
        <Toast.Action className="[grid-area:_action]" asChild altText="Goto schedule to undo">
          <div className="cursor-pointer">
            <X className="fill-white w-5" />
          </div>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed top-[calc(102px-var(--viewport-padding))] right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
};
