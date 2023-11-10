import { useTranslation } from 'react-i18next';

export default function Separator() {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-silver-500 dark:text-grey-300" />
      <span className="text-base text-silver-700 dark:text-grey-100">{t('or')}</span>
      <div className="h-px flex-1 bg-silver-500 dark:text-grey-300" />
    </div>
  );
}
