import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { z } from 'zod';
import { registrationSchema } from '~/lib/schemas/registration.schema';
import { FormControl, FormField, FormItem, FormMessage, FormProvider } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import PasswordInput from '~/components/form/password/passwordInput';
import { action$ } from './api.trpc.$/root';
import { getValidatedFormData } from 'remix-hook-form';
import { forgotPasswordSecondStepSchema } from '~/lib/schemas/forgot-password';
import { json, redirect } from '@remix-run/node';
import { auth } from 'server/auth/lucia';

export const action = action$(async (caller, request) => {
  const {
    receivedValues: defaultValues,
    data,
    errors,
  } = await getValidatedFormData<z.infer<typeof forgotPasswordSecondStepSchema>>(
    request,
    zodResolver(forgotPasswordSecondStepSchema)
  );

  if (errors) {
    return json({ defaultValues, errors });
  }

  if (!data) {
    return redirect('/forgot_password');
  }

  const isValid = await caller.verification.verifyCode({
    id: data.verificationId,
    verificationCode: data.verificationCode,
  });

  if (isValid.err) {
    return json(isValid.val);
  }

  if (!isValid.val.associatedUserId) {
    return redirect('/forgot_password');
  }

  try {
    let user = await auth.getUser(isValid.val.associatedUserId);
    await auth.invalidateAllUserSessions(user.userId);
    await auth.updateKeyPassword('userId', user.userId, data.password);

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    const sessionCookie = auth.createSessionCookie(session);

    return redirect('/', {
      headers: {
        'Set-Cookie': sessionCookie.serialize(),
      },
    });
  } catch (e) {
    return redirect('/forgot_password');
  }
});

export default function NewPasswordRoute() {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
  });

  return (
    <FormProvider {...form}>
      <PasswordInput />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={t('confirm_password')} {...field} type="password" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button variant="success" size="lg" onClick={console.log}>
        <p className="font-regular_uppercase text-base">{t('აღდგენა')}</p>
      </Button>
    </FormProvider>
  );
}
