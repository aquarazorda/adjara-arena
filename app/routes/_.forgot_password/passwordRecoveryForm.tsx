import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { z } from 'zod';
import { RegistrationVerificationInputs } from '../_.register/verificationInputs';
import { FormControl, FormField, FormItem, FormMessage, FormProvider } from '~/components/ui/form';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Button } from '~/components/ui/button';
import { useRemixForm } from 'remix-hook-form';
import { forgotPasswordFirstStepSchema } from '~/lib/schemas/forgot-password';
import { Form } from '@remix-run/react';

export default function PasswordRecoveryForm() {
  const { t } = useTranslation();
  const [verificationMethod, setVerificationMethod] = useState('phoneNumber');
  const form = useRemixForm<z.infer<typeof forgotPasswordFirstStepSchema>>({
    resolver: zodResolver(forgotPasswordFirstStepSchema),
    mode: 'onSubmit',
    defaultValues: {
      verificationMethod: 'phoneNumber',
      phoneNumber: '',
      email: '',
      verificationCode: '',
    },
  });

  useEffect(() => {
    form.watch((values, { name }) => {
      if (name === 'verificationMethod' && values.verificationMethod) {
        setVerificationMethod(values.verificationMethod);
        form.setValue('phoneNumber', '');
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
          <p className="text-base font-regular_uppercase">{t('აღდგენა')}</p>
        </Button>
      </Form>
    </FormProvider>
  );
}
