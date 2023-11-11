import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRemixForm } from 'remix-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Form as UIForm, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import type { registrationSchema } from '~/lib/schemas/register';
import { RegistrationVerificationInputs } from './verificationInputs';
import { DatePicker } from '~/components/ui/date-picker';
import { trpc } from '~/lib/api';
import { Checkbox } from '~/components/ui/checkbox';

export default function RegistrationForm() {
  const { t } = useTranslation();
  const [verificationMethod, setVerificationMethod] = useState('phoneNumber');

  const form = useRemixForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(z.any()),
    reValidateMode: 'onSubmit',
  });

  useEffect(() => {
    form.watch((values) => {
      setVerificationMethod(values.verificationMethod!);
    });
  }, [form]);

  return (
    // @ts-expect-error
    <UIForm {...form}>
      <Form method="post" className="flex flex-col gap-6" onSubmit={form.handleSubmit}>
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
        <FormField
          control={form.control}
          name="verificationMethod"
          defaultValue="phoneNumber"
          render={({ field }) => {
            return (
              <FormItem>
                <Label className="text-silver-800">{t('verification_method')}</Label>
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t('password')} {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
            <FormItem className='flex items-center gap-2'>
              <Checkbox onCheckedChange={(value) => {
                field.onChange(value);
                trpc.user.storeAcceptTerms.mutate({
                  value: !!value,
                  user_agent: window.navigator.userAgent,
                });
              }} />
              <Label>{t('terms_and_conditions_description')}</Label>
            </FormItem>
          )}
        />

        <Button variant="success" size="lg">
          <p className="font-regular_uppercase text-base">{t('registration')}</p>
        </Button>
      </Form>
    </UIForm>
  );
}
