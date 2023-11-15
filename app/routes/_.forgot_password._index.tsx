import { useTranslation } from 'react-i18next';
import type { ActionFunctionArgs} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { getValidatedFormData, useRemixForm } from 'remix-hook-form';
import { forgotPasswordFirstStepSchema } from '~/lib/schemas/forgot-password';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useEffect, useState } from 'react';
import { FormControl, FormField, FormItem, FormMessage, FormProvider } from '~/components/ui/form';
import { Form } from '@remix-run/react';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Button } from '~/components/ui/button';
import { RegistrationVerificationInputs } from './_.register/verificationInputs';

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
  const [verificationMethod, setVerificationMethod] = useState('phoneNumber');
  const form = useRemixForm<z.infer<typeof forgotPasswordFirstStepSchema>>({
    resolver: zodResolver(forgotPasswordFirstStepSchema),
    mode: 'onSubmit',
    defaultValues: {
      verificationMethod: 'phoneNumber'
    },
  });

  useEffect(() => {
    form.watch((values, { name }) => {
      if (name === 'verificationMethod' && values.verificationMethod) {
        setVerificationMethod(values.verificationMethod);
        form.setValue('phoneNumber', 0);
        form.setValue('email', '');
      }
    });
  }, [form]);

  return (
    <FormProvider {...form}>
      <Form method="post" onSubmit={form.handleSubmit} className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="verificationMethod"
          defaultValue="phoneNumber"
          render={({ field }) => {
            return (
              <FormItem>
                <Label className="text-silver-800">{t('თქვენ მიიღებთ კოდს მობილურზე ან ელ-ფოსტაზე')}</Label>
                <FormControl>
                  <RadioGroup defaultValue="phoneNumber" onValueChange={field.onChange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phoneNumber" id="phoneNumber" />
                      <Label htmlFor="phoneNumber" className="text-silver-500 peer-aria-checked:text-silver-800">
                        {t('phone')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email" className="text-silver-500 peer-aria-checked:text-silver-800">
                        {t('email')}
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <RegistrationVerificationInputs verificationMethod={verificationMethod} />
        <Button variant="success" size="lg" type="submit">
          <p className="font-regular_uppercase text-base">{t('აღდგენა')}</p>
        </Button>
      </Form>
    </FormProvider>
  );
}
