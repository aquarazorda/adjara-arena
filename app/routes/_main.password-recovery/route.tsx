import RegistrationLayout from '~/components/registration-layout';
import { useTranslation } from 'react-i18next';
import PasswordRecoveryForm from './passwordRecoveryForm';

const PasswordRecoveryPage = () => {
  const { t } = useTranslation();

  return (
    <RegistrationLayout className="gap-6 p-4">
      <div className="flex flex-col gap-5">
        <p className="font-medium text-lg text-dark-silver-text dark:text-white">{t('პაროლის აღდგენა')}</p>
      </div>
      <PasswordRecoveryForm />
    </RegistrationLayout>
  );
};

export default PasswordRecoveryPage;
