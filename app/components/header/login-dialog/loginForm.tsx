import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@remix-run/react';
import { DialogClose } from '@radix-ui/react-dialog';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col">
        <div className="mb-5 flex flex-col gap-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t('username_or_email')} {...field} />
                </FormControl>
                {/* <FormDescription>
                არასწორია
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 space-y-0">
                <FormControl>
                  <Input placeholder={t('password')} type="password" {...field} />
                </FormControl>
                {/* <FormDescription>
                არასწორია
              </FormDescription> */}
                <a href="" className="w-fit text-xs text-silver-ground dark:text-silver">
                  {t('forgot_password')}
                </a>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" variant="success" size="lg" className="mb-3">
          {t('login')}
        </Button>
        <DialogClose asChild>
          <Button type="button" size="lg" onClick={() => navigate('/register')}>
            {t('registration')}
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
};

export default LoginForm;