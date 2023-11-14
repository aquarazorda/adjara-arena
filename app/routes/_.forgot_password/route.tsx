import { useTranslation } from 'react-i18next';
import RegistrationLayout from '~/components/registration-layout';
import PasswordRecoveryForm from './passwordRecoveryForm';
import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { getValidatedFormData } from 'remix-hook-form';
import { forgotPasswordFirstStepSchema } from '~/lib/schemas/forgot-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    receivedValues: defaultValues,
    data,
    errors,
  } = await getValidatedFormData<z.infer<typeof forgotPasswordFirstStepSchema>>(
    request,
    zodResolver(forgotPasswordFirstStepSchema)
  );

  if (errors && !data) {
    return json({ defaultValues, errors });
  }

  // TODO check verification code, if not valid send error message
  redirect('/forgot-password/change-password?code=1234');
};

export default function ForgotPasswordRoute() {
  const { t } = useTranslation();

  return (
    <RegistrationLayout className="gap-6 p-4">
      <div className="flex flex-col gap-5">
        <p className="font-medium text-lg text-dark-silver-text dark:text-white">{t('forgot_password_header')}</p>
      </div>
      <PasswordRecoveryForm />
    </RegistrationLayout>
  );
}
