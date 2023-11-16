import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { z } from 'zod';
import { registrationSchema } from '~/lib/schemas/registration.schema';
import { FormControl, FormField, FormItem, FormMessage, FormProvider } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import PasswordInput from '~/components/form/password/passwordInput';

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
