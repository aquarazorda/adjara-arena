import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRemixFormContext } from 'remix-hook-form';
import { Button } from '~/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage, setFormErrors } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import Checkmark from '~/components/icons/Checkmark.svg?react';
import { z } from 'zod';
import debounce from 'lodash.debounce';
import {
  emailSchema,
  phoneNumberSchema,
  verificationMethodSchema,
} from '~/lib/schemas/shared-user.schema';
import { verificationCodeFormInputSchema } from '~/lib/schemas/verification';
import { useMutation } from 'react-query';
import { trpc } from '~/lib/api';

type Props = {
  verificationMethod: string;
};

type State = {
  codeSent: boolean;
  codeTime: number;
  codeInterval: NodeJS.Timeout | null;
  verificationButtonDisabled: boolean;
};

const defaultState: State = {
  codeSent: false,
  codeTime: 60,
  codeInterval: null,
  verificationButtonDisabled: true,
};

const verificationInputSchema = z.object({
  phoneNumber: phoneNumberSchema,
  email: emailSchema,
  verificationCode: verificationCodeFormInputSchema,
  verificationMethod: verificationMethodSchema,
});

export const RegistrationVerificationInputs = ({ verificationMethod }: Props) => {
  const { t } = useTranslation();
  const form = useRemixFormContext<z.infer<typeof verificationInputSchema>>();
  const [state, setState] = useState(defaultState);
  const { mutateAsync: sendSms } = useMutation({
    mutationFn: trpc.verification.generateCodeAndSendSms.query
  });

  const checkCodeVerification = useCallback(debounce((code: string) => {

  }, 400), []);

  useEffect(() => {
    setState(defaultState);
    state.codeInterval && clearInterval(state.codeInterval);
  }, [verificationMethod]);

  useEffect(() => {
    form.watch((values, { name }) => {
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
    const res = await sendSms(form.getValues("phoneNumber"));
    
    if (res.err) {
      setFormErrors(form, res.val);
      return;
    }

    setState({ ...defaultState, codeSent: true, codeInterval: getVerificationInterval() });
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
        onClick={() => sendVerificationCode()}
        disabled={state.verificationButtonDisabled}
      >
        {t('verification')}
      </Button>
    );

  return (
    <>
      {verificationMethod == 'email' ? (
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
