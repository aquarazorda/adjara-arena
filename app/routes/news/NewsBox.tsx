import { cn } from '~/lib/utils';

const NewsBox = ({
  title,
  description,
  img,
  tags = [],
  large = false,
}: {
  title: string;
  description?: string;
  img: string;
  tags?: string[];
  large?: boolean;
}) => {
  return (
    <div className="w-full h-full overflow-hidden p-2 font-regular">
      <img className="w-full aspect-[315/172] object-cover rounded-xl" src={img} alt="News image" />
      <div className={cn('', large ? 'px-2 pt-[20px]' : 'pt-[10px]')}>
        <div className={cn('flex flex-wrap gap-4 gap-y-2 items-center mb-1 md:mb-2')}>
          {tags.map((tag, index) => (
            <div key={index} className="p-1 flex gap-1 items-start justify-center bg-grey-500 rounded-full">
              <span className="text-grey-100 text-xs font-regular_uppercase">{tag}</span>
            </div>
          ))}
          <p className="text-xs text-grey-100">2 საათის წინ</p>
        </div>
        <h3
          className={cn(
            'font-bold text-white',
            large ? 'text-[18px] mb-[10px]' : 'text-base mb-1',
            description ? 'line-clamp-1' : 'line-clamp-2'
          )}
        >
          {title}
        </h3>
        {description && (
          <p className={cn('text-grey-100 text-sm mb-[10px]', large ? 'line-clamp-[10]' : 'line-clamp-2')}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsBox;
