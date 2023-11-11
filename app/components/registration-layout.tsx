import React from 'react';
import { cn } from '~/lib/utils';

type RegistrationLayoutProps = {
  className?: string;
  children?: React.ReactNode;
};

const RegistrationLayout = ({ className, children }: RegistrationLayoutProps) => {
  return (
    <div className="flex min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-80px)] dark:text-white text-grey">
      <div className="flex-1 hidden md:block">
        <img className="w-full h-full object-cover" src="" alt="adjarabetarena" />
      </div>
      <div className="flex-1 flex justify-center items-center py-[16px]">
        <div className={cn('flex flex-col md:max-w-[460px] w-full', className)}>{children}</div>
      </div>
    </div>
  );
};

export default RegistrationLayout;
