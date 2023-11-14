import { zodResolver } from '@hookform/resolvers/zod';
import { useSubmit } from '@remix-run/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { z } from 'zod';
import { Button } from '~/components/ui/button';
import { FormControl, FormField, FormItem, FormProvider } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { registrationSchema } from '~/lib/schemas/registration.schema';

export default function FbRegistrationForm() {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
  });

  const [codeSent, setCodeSent] = useState(false);

  const submit = useSubmit();

  return (
    <FormProvider {...form}>
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={t('phone_number')} {...field} readOnly={codeSent ? true : false} />
            </FormControl>
          </FormItem>
        )}
      />
      {codeSent && (
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="verificationCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t('verification_code')} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <p className="text-xs text-silver-ground dark:text-silver/60 cursor-pointer">{t('არ მიგიღია კოდი?')}</p>
            <p className="text-xs text-silver-ground dark:text-silver/60 cursor-pointer">
              <span className="dark:text-white-secondary text-dark-silver-text mr-2">00:10</span>
              {t('გააგზავნე ხელახლა')}
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="termsAndConditions"
          render={({ field }) => (
            <FormItem>
              <Input
                placeholder={t('termsAndConditions')}
                {...field}
                type="checkbox"
                onChange={(e: any) => {
                  const formData = new FormData();
                  formData.append('value', e.target.checked);
                  formData.append('user_agent', window.navigator.userAgent);

                  submit(formData, {
                    method: 'post',
                  });

                  field.onChange(e);
                }}
              />
            </FormItem>
          )}
        />
        <Button variant="success" size="lg" onClick={() => setCodeSent(true)}>
          <p className="text-base font-regular_uppercase">{t('რეგისტრაცია')}</p>
        </Button>
      </div>
    </FormProvider>
  );
}
