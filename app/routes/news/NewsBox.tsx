import { useTranslation } from 'react-i18next';
import SportIcon from '~/components/icons/SportIcon';
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
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'w-full h-full overflow-hidden md:p-2 font-regular flex max-md:gap-2',
        large ? 'flex-col' : 'md:flex-col'
      )}
    >
      <div className="flex-initial relative">
        <img
          className={cn(
            'w-full aspect-[315/172] object-cover rounded-[4px]',
            large
              ? 'md:rounded-xl'
              : 'md:rounded-lg w-[120px] md:w-full h-[70px] md:h-full aspect-[120/70] md:aspect-[315/172]'
          )}
          src={img}
          alt="News image"
        />
        {large && (
          <div className="md:hidden absolute bottom-3 left-3">
            {tags.map((tag, index) => (
              <div key={index} className="p-1 flex gap-1 items-center justify-center bg-grey-500 rounded-full">
                <SportIcon name={tag} size={14} />
                <span className="text-grey-100 text-xs font-regular_uppercase">{t(tag)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={cn('flex-1', large ? 'md:px-2 md:pt-[20px]' : 'md:pt-[10px]')}>
        <div
          className={cn(
            'flex flex-wrap max-md:justify-between md:gap-4 gap-y-2 items-center mb-1 md:mb-2 max-md:hidden'
          )}
        >
          {tags.map((tag, index) => (
            <div key={index} className="p-1 flex gap-1 items-center justify-center bg-grey-500 rounded-full">
              <SportIcon name={tag} size={14} />
              <span className="text-grey-100 text-xs font-regular_uppercase">{t(tag)}</span>
            </div>
          ))}
          <p className="text-xs text-grey-100">2 {t('hours_ago')}</p>
        </div>
        <h3
          className={cn(
            'md:font-bold text-white',
            large ? 'text-base md:text-[18px] mb-1 md:mb-[10px]' : 'text-xs md:text-base mb-1',
            description ? 'line-clamp-2 md:line-clamp-1' : 'line-clamp-2'
          )}
        >
          {title}
        </h3>
        <div className="mb-2">
          <p className="text-xs text-grey-100">2 {t('hours_ago')}</p>
        </div>
        {description && (
          <p
            className={cn(
              'text-grey-100 text-xs md:text-sm md:mb-[10px]',
              large ? 'line-clamp-4 md:line-clamp-[10]' : 'line-clamp-2 max-md:hidden'
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsBox;
