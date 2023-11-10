import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRemixFormContext } from 'remix-hook-form';
import { Button } from '~/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import Checkmark from '~/components/icons/Checkmark.svg?react';

type Props = {
  verificationMethod: string;
};

const defaultState = {
  codeSent: false,
  codeTime: 60,
  codeInterval: null,
} as { codeSent: boolean; codeTime: number; codeInterval: NodeJS.Timeout | null };

export const RegistrationVerificationInputs = ({ verificationMethod }: Props) => {
  const { t } = useTranslation();
  const form = useRemixFormContext();
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    setState(defaultState);
    state.codeInterval && clearInterval(state.codeInterval);
  }, [verificationMethod]);

  const getVerificationInterval = () =>
    setInterval(() => {
      if (state.codeTime <= 0 && state.codeInterval) {
        clearInterval(state.codeInterval);
      }
      if (state.codeTime > 0) {
        setState((s) => ({ ...s, codeTime: s.codeTime - 1 }));
      }
    }, 1000);

  const sendVerificationCode = () => setState({
    codeTime: 60,
    codeSent: true,
    codeInterval: getVerificationInterval(),
  });

  const VerificationButton = useCallback(
    () =>
      state.codeSent ? (
        <div>
          <Checkmark />
        </div>
      ) : (
        <Button variant={'success'} type="button" onClick={() => sendVerificationCode()}>
          {t('verification')}
        </Button>
      ),
    [state.codeSent]
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
              {state.codeSent && (
                <div className="flex text-xs text-silver-600">
                  <span>{t('didnt_receive_code')}</span>
                  <div className="ml-auto flex gap-1">
                    {!!state.codeTime && (
                      <span className="text-silver-800">
                        00:{state.codeTime < 10 ? `0${state.codeTime}` : state.codeTime}
                      </span>
                    )}
                    {!state.codeTime && t('resend_code')}
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
