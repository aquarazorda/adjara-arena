import { useTranslation } from 'react-i18next';

export default function ForgotPasswordRoute() {
  const { t } = useTranslation();
  return <>{t('forgot_password_header')}</>;
}