import { zodResolver } from '@hookform/resolvers/zod';
import { useSubmit } from '@remix-run/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { z } from 'zod';
import { registrationSchema } from '~/lib/schemas/register';
import { FormControl, FormField, FormItem, FormMessage, FormProvider } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

export default function NewPasswordForm() {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
  });

  const submit = useSubmit();

  return (
    <FormProvider {...form}>
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
      <Button variant="success" size="lg" onClick={console.log}>
        <p className="text-base font-regular_uppercase">{t('აღდგენა')}</p>
      </Button>
    </FormProvider>
  );
}
