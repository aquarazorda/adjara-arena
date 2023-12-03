import { cn } from '~/lib/utils';

const Container = ({ className, children }: any) => {
  return (
    <div className={cn('max-w-[calc(1300px+2rem)] 2xl:max-w-[calc(1420px+2rem)] mx-auto px-4', className)}>
      {children}
    </div>
  );
};

export default Container;
