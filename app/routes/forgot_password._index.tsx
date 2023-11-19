import { useTranslation } from 'react-i18next';
import type { ActionFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { getValidatedFormData, useRemixForm } from 'remix-hook-form';
import { forgotPasswordFirstStepSchema } from '~/lib/schemas/forgot-password';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { Form } from '@remix-run/react';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import { RegistrationVerificationInputs } from './register/verificationInputs';
import { FormProvider } from '~/components/ui/form';

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
  return redirect('/forgot_password/new_password?code=1234');
};

export default function ForgotPasswordRoute() {
  const { t } = useTranslation();
  const form = useRemixForm<z.infer<typeof forgotPasswordFirstStepSchema>>({
    resolver: zodResolver(forgotPasswordFirstStepSchema),
    mode: 'onSubmit',
    defaultValues: {
      verificationMethod: 'phoneNumber',
    },
  });

  return (
    <FormProvider {...form}>
      <Form method="post" onSubmit={form.handleSubmit} className="flex flex-col gap-6">
        <Label className="text-silver-800">{t('თქვენ მიიღებთ კოდს მობილურზე ან ელ-ფოსტაზე')}</Label>
        <RegistrationVerificationInputs />
        <Button variant="success" size="lg" type="submit" disabled={!form.formState.isValid}>
          <p className="font-regular_uppercase text-base">{t('აღდგენა')}</p>
        </Button>
      </Form>
    </FormProvider>
  );
}
