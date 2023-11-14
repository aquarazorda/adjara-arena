import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../../ui/button';
import { useTranslation } from 'react-i18next';
import { useRemixForm } from 'remix-hook-form';
import { authSchema } from '~/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '~/lib/api';
import { FormControl, FormField, FormItem, FormMessage, FormProvider, setFormErrors } from '~/components/ui/form';
import { Link, useNavigate } from '@remix-run/react';
import type { z } from 'zod';
import { Input } from '~/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { useState } from 'react';
import Separator from '~/components/ui/separator';
import { useMutation } from 'react-query';

export default function LoginDialog() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutateAsync, isLoading } = useMutation(trpc.user.authenticate.mutate);

  const form = useRemixForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    reValidateMode: 'onSubmit',
    defaultValues: {
      emailOrUsername: '',
      password: '',
    },
    submitHandlers: {
      onValid: async (data) => {
        const response = await mutateAsync(data);

        if (response.err) {
          setFormErrors(form, response.val);
        }
      },
    },
  });

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="px-5">
          <p>{t('შესვლა')}</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="font-medium text-2xl uppercase">{t('login')}</span>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-5 pt-5">
              <Button
                variant="ghost"
                className="flex h-[52px] w-full items-center bg-blue-500 text-base text-white hover:bg-blue-500/80"
              >
                {t('login_facebook')}
              </Button>
              <Separator />
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit} className="flex w-full flex-col">
                  <div className="mb-1 flex flex-col gap-5">
                    <FormField
                      control={form.control}
                      name="emailOrUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder={t('username_or_email')} {...field} />
                          </FormControl>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogClose asChild>
                    <Link to="/forgot_password">{t('forgot_password')}</Link>
                  </DialogClose>
                  <div className="mt-5 flex flex-col gap-1 font-regular_uppercase">
                    <Button type="submit" variant="success" size="lg" className="mb-3" disabled={isLoading}>
                      {t('login')}
                    </Button>
                    <DialogClose asChild>
                      <Button type="button" size="lg" onClick={() => navigate('/register')}>
                        {t('registration')}
                      </Button>
                    </DialogClose>
                  </div>
                </form>
              </FormProvider>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
