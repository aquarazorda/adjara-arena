import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import RadioGroup from '~/components/ui/radio-group';
import { registrationSchema } from '~/lib/schemas/register';

export default function RegistrationForm() {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
  });

  const [isEmail, setIsEmail] = useState(true);

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={t('first_and_last_name')} {...field} />
            </FormControl>
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
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="birthday"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={t('birth_date')} {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="verificationMethod"
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <RadioGroup
                  title={t('verification_method')}
                  values={[
                    {
                      label: t('email'),
                      value: 'email',
                    },
                    {
                      label: t('phone_number'),
                      value: 'phone_number',
                    },
                  ]}
                  {...field}
                  onChange={(e) => {
                    setIsEmail(e.target.value === 'email');
                    field.onChange(e);
                  }}
                />
              </FormControl>
            </FormItem>
          );
        }}
      />
      {isEmail ? (
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t('email')} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      ) : (
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t('phone_number')} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={t('password')} {...field} type="password" />
            </FormControl>
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
          </FormItem>
        )}
      />
      <Button variant="success" size="lg">
        <p className="text-base font-regular_uppercase">{t('რეგისტრაცია')}</p>
      </Button>
    </Form>
  );
}
