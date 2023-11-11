import RegistrationLayout from '~/components/registration-layout';
import FbRegistrationForm from './fbRegistrationForm';
import { useTranslation } from 'react-i18next';

const FbRegistrationPage = () => {
  const { t } = useTranslation();

  return (
    <RegistrationLayout className="gap-6 p-4">
      <div className="flex flex-col gap-5">
        <p className="font-medium text-lg text-dark-silver-text dark:text-white">{t('fb_registration')}</p>
        <p className="font-medium text-base text-silver-ground dark:text-silver">
          {t('თქვენ მიიღებთ OTP კოდს მობილურის ნომერზე')}
        </p>
      </div>
      <FbRegistrationForm />
    </RegistrationLayout>
  );
};

export default FbRegistrationPage;
