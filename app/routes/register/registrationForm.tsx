import { zodResolver } from '@hookform/resolvers/zod';
import { useRemixForm } from 'remix-hook-form';
import { Button } from '~/components/ui/button';
import { FormProvider, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { registrationSchema } from '~/lib/schemas/registration.schema';
import { RegistrationVerificationInputs } from './verificationInputs';
import { DatePicker } from '~/components/ui/date-picker';
import { trpc } from '~/lib/api';
import { Checkbox } from '~/components/ui/checkbox';
import { Form } from '@remix-run/react';
import type { z } from 'zod';
import PasswordInput from '~/components/form/password/passwordInput';
import { useTranslation } from 'react-i18next';

export default function RegistrationForm() {
  const { t } = useTranslation();

  const form = useRemixForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    mode: 'onSubmit',
  });

  return (
    <FormProvider {...form}>
      <Form className="flex flex-col gap-6" onSubmit={form.handleSubmit}>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t('first_and_last_name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t('user_name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker placeholder={t('birth_date')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <RegistrationVerificationInputs />
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
        <FormField
          control={form.control}
          name="termsAndConditions"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <Label className="flex items-center gap-2">
                <Checkbox
                  onCheckedChange={(value) => {
                    field.onChange(value);
                    trpc.user.storeAcceptTerms.mutate({
                      value: !!value,
                      user_agent: window.navigator.userAgent,
                    });
                  }}
                />
                {t('terms_and_conditions_description')}
              </Label>
            </FormItem>
          )}
        />

        <Button variant="success" size="lg" type="submit">
          <p className="font-regular_uppercase text-base">{t('registration')}</p>
        </Button>
      </Form>
    </FormProvider>
  );
}
