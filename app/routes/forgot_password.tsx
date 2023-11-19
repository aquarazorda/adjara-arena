import { Outlet } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import RegistrationLayout from '~/components/registration-layout';

export default function ForgotPasswordLayout() {
  const {t} = useTranslation();
  
  return <RegistrationLayout className="gap-6 p-4">
    <div className="flex flex-col gap-5">
      <p className="text-dark-silver-text font-medium text-lg dark:text-white">{t('პაროლის აღდგენა')}</p>
    </div>
    <Outlet />
  </RegistrationLayout>;
}
