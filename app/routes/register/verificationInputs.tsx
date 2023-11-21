import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRemixFormContext } from 'remix-hook-form';
import { Button } from '~/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage, setFormErrors } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import Checkmark from '~/components/icons/Checkmark.svg?react';
import type { z } from 'zod';
import { emailSchema, phoneNumberSchema } from '~/lib/schemas/shared-user.schema';
import { verificationSendSchema, type verificationInputSchema } from '~/lib/schemas/verification';
import { useMutation } from 'react-query';
import { trpc } from '~/lib/api';
import { VerificationType } from 'server/db/schema/verification';
import { createFormErrorReturn } from 'server/utils/form';

type State = {
  codeSent: boolean;
  codeTime: number;
  codeInterval: NodeJS.Timeout | null;
  verificationButtonDisabled: boolean;
  verificationMethod: VerificationType;
};

const defaultState: State = {
  codeSent: false,
  codeTime: 60,
  codeInterval: null,
  verificationButtonDisabled: true,
  verificationMethod: 'phoneNumber',
};

export const RegistrationVerificationInputs = () => {
  const { t } = useTranslation();
  const form = useRemixFormContext<z.infer<typeof verificationInputSchema>>();
  const [state, setState] = useState(defaultState);
  const { mutateAsync: sendSms, isLoading: isSmsSending } = useMutation({
    mutationFn: trpc.verification.generateCodeAndSend.mutate,
  });

  useEffect(() => {
    state.codeInterval && clearInterval(state.codeInterval);
  }, [state.verificationMethod]);

  useEffect(() => {
    form.watch((values, { name }) => {
      if (name === 'verificationMethod' && values.verificationMethod) {
        setState((s) => ({ ...s, verificationMethod: values.verificationMethod as VerificationType }));
        form.setValue('phoneNumber', 0);
        form.setValue('email', '');
      }

      if (name === 'phoneNumber' || name === 'email') {
        setState((s) => ({
          ...s,
          verificationButtonDisabled: !(
            phoneNumberSchema.safeParse(values.phoneNumber).success || emailSchema.safeParse(values.email).success
          ),
        }));
      }
    });
  }, []);

  const getVerificationInterval = () =>
    setInterval(() => {
      setState((s) => {
        if (s.codeTime <= 0 && s.codeInterval) {
          clearInterval(s.codeInterval);
          return { ...s, codeInterval: null };
        }

        return { ...s, codeTime: s.codeTime - 1 };
      });
    }, 1000);

  const sendVerificationCode = async () => {
    const values = verificationSendSchema.safeParse(form.getValues());

    if (!values.success) return;
    try {
      const res = await sendSms(values.data);

      if (res.err) {
        setFormErrors(form, res.val);
        return;
      }

      form.setValue('verificationId', res.val.id);
      setState({ ...defaultState, codeSent: true, verificationMethod: state.verificationMethod, codeInterval: getVerificationInterval() });
    } catch (e) {
      setFormErrors(
        form,
        createFormErrorReturn(values.data)({
          phoneNumber: 'error_sending_verification_code',
          email: 'error_sending_verification_code',
        }).val
      );
    }
  };

  const VerificationButton = () =>
    state.codeSent ? (
      <div>
        <Checkmark />
      </div>
    ) : (
      <Button
        variant={'success'}
        type="button"
        className="z-10"
        onClick={() => sendVerificationCode()}
        disabled={state.verificationButtonDisabled || isSmsSending}
      >
        {t('verification')}
      </Button>
    );

  return (
    <>
      {state.verificationMethod == 'email' ? (
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t('email')} addon={<VerificationButton />} {...field} />
              </FormControl>
              <FormMessage />
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
                <Input placeholder={t('phone_number')} addon={<VerificationButton />} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {state.codeSent && (
        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t('verification_code')} {...field} />
              </FormControl>
              <FormMessage />
              {state.codeSent && (
                <div className="flex text-xs text-silver-600">
                  <span>{t('didnt_receive_code')}</span>
                  <div className="ml-auto flex gap-1">
                    {!!state.codeTime && (
                      <span className="text-silver-800">
                        00:{state.codeTime < 10 ? `0${state.codeTime}` : state.codeTime}
                      </span>
                    )}
                    {!state.codeTime && (
                      <Button variant={'plain'} className="text-xs text-silver-600" onClick={sendVerificationCode}>
                        {t('resend_code')}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </FormItem>
          )}
        />
      )}
    </>
  );
};
