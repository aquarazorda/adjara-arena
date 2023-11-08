import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';
import Separator from '~/components/ui/separator';
import RegistrationForm from './registrationForm';

export default function RegistrationPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 p-4">
      <p className="font-medium text-lg">{t('registration')}</p>
      <Button
        variant="ghost"
        className="flex h-[52px] w-full items-center bg-blue text-base text-white hover:bg-blue/80"
      >
        {t('login_facebook')}
      </Button>
      <Separator />
      <RegistrationForm />
    </div>
  );
}
