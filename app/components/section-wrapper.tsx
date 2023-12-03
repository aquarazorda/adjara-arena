import { cn } from '~/lib/utils';

const SectionWrapper = ({ title, children, className }: any) => {
  return (
    <div className={cn('mb-[40px]', className)}>
      <h2 className="text-[22px] font-ABMontProUpperCase font-bold mb-2 md:mb-3">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default SectionWrapper;
