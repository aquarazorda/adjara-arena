import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';
import Separator from '~/components/ui/separator';
import RegistrationForm from './registrationForm';
import type { ActionFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { getValidatedFormData } from 'remix-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from '~/lib/schemas/registration.schema';
import { auth } from 'server/auth/lucia';
import { LuciaError } from 'lucia';
import { match } from 'ts-pattern';
import { createFormErrorReturnJson } from 'server/utils/request';
import type { z } from 'zod';
import { validateVerificationCode } from 'server/services/verification.service';
import postgres from 'postgres';

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    receivedValues: defaultValues,
    data,
    errors,
  } = await getValidatedFormData<z.infer<typeof registrationSchema>>(request, zodResolver(registrationSchema));

  const errorResponse = createFormErrorReturnJson(defaultValues);

  if (errors && !data) {
    return json({ defaultValues, errors });
  }

  if (data.verificationMethod === 'email' && !data.email) {
    return errorResponse({ email: 'email_must_be_required' });
  }

  if (data.verificationMethod === 'phoneNumber' && !data.phoneNumber) {
    return errorResponse({ phoneNumber: 'phoneNumber_must_be_required' });
  }

  const codeValidationRes = await validateVerificationCode({
    id: data.verificationId,
    verificationCode: data.verificationCode,
    value: String(data[data.verificationMethod]),
  });

  if (codeValidationRes.err) {
    return errorResponse({ verificationCode: 'invalid_verification_code' });
  }

  try {
    const user = await auth.createUser({
      key: {
        password: data.password,
        providerId: 'username',
        providerUserId: data.userName.toLowerCase(),
      },
      attributes: {
        full_name: data.fullName,
        username: data.userName,
        date_of_birth: data.birthday.toISOString(),
        address: null,
        email: data.email || null,
        phone_number: data.phoneNumber != undefined ? String(data.phoneNumber) : null,
        personal_id: null,
      },
    });

    const session = await auth.createSession({
      userId: user.id,
      attributes: {},
    });

    const sessionCookie = await auth.createSessionCookie(session);

    return redirect('/', {
      headers: {
        'Set-Cookie': sessionCookie.serialize(),
      },
    });
  } catch (e) {
    console.log(e);
    if (e instanceof LuciaError && e.message === `AUTH_DUPLICATE_KEY_ID`) {
      return errorResponse({ userName: 'username_already_exists' });
    }

    if (e instanceof postgres.PostgresError) {
      if (e.code === '23505') {
        return match(e.constraint_name)
          .when(
            (s) => s?.includes('username'),
            () => errorResponse({ userName: 'username_already_exists' })
          )
          .when(
            (s) => s?.includes('email'),
            () => errorResponse({ email: 'email_already_exists' })
          )
          .when(
            (s) => s?.includes('phone_number'),
            () => errorResponse({ phoneNumber: 'phone_number_already_exists' })
          )
          .otherwise(() => json({}, { status: 500 }));
      }
    }

    console.log(e);
    return json({}, { status: 500 });
  }
};

export default function RegistrationPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[calc(100vh-70px)] text-silver-800 dark:bg-grey-700 dark:text-white md:min-h-[calc(100vh-80px)]">
      <div className="hidden flex-1 md:block">
        <img className="h-full w-full object-cover" src="" alt="adjarabetarena" />
      </div>
      <div className="flex flex-1 items-center justify-center py-[16px]">
        <div className="flex w-full flex-col gap-6 p-4 md:max-w-[460px]">
          <p className="font-medium text-lg">{t('registration')}</p>
          <Button
            variant="ghost"
            size="lg"
            className="flex w-full items-center bg-blue-500 text-base lowercase text-white hover:bg-blue-500/80"
          >
            {t('register_facebook')}
          </Button>
          <Separator />
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
