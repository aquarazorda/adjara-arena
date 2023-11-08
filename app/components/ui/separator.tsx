import { useTranslation } from 'react-i18next';

export default function Separator() {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-silver-lower dark:text-silver-ground-lower" />
      <span className="text-base text-silver-ground dark:text-silver">{t('or')}</span>
      <div className="h-px flex-1 bg-silver-lower dark:text-silver-ground-lower" />
    </div>
  );
}
