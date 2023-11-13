import { zodResolver } from '@hookform/resolvers/zod';
import { useSubmit } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { registrationSchema } from '~/lib/schemas/register';
import { RegistrationVerificationInputs } from '../_main.register/verificationInputs';

export default function PasswordRecoveryForm() {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
  });

  const [verificationMethod, setVerificationMethod] = useState('phoneNumber');

  const [codeSent, setCodeSent] = useState(false);

  useEffect(() => {
    form.watch((values) => {
      setVerificationMethod(values.verificationMethod!);
    });
  }, [form]);

  const submit = useSubmit();

  return (
    <Form {...form}>
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
          <p className="text-base font-regular_uppercase">{t('აღდგენა')}</p>
        </Button>
      </div>
    </Form>
  );
}
