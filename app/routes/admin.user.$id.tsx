import { loader$ } from './api.trpc.$/root';
import { Form, useLoaderData } from '@remix-run/react';
import { FormControl, FormField, FormItem, FormMessage, FormProvider } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from '~/lib/schemas/registration.schema';
import { useRemixForm } from 'remix-hook-form';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '~/components/ui/date-picker';

export const loader = loader$(async (caller, { params }) => {
  if (!params.id) return undefined;
  const user = await caller.admin.findUserById(params.id);
  return user;
});

export default function AdminUserRoute() {
  const { t } = useTranslation();
  const data = useLoaderData<typeof loader>();

  const form = useRemixForm({
    defaultValues: data,
    resolver: zodResolver(registrationSchema),
    mode: 'onSubmit',
  });

  return (
    <FormProvider {...form}>
      <Form className="grid grid-cols-2 max-w-3xl mx-auto mt-8 gap-2 w-full items-center justify-center">
        <FormField
          control={form.control}
          name="full_name"
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
          name="username"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t('email')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t('phone')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker placeholder={t('birth_date')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </FormProvider>
  );
}
