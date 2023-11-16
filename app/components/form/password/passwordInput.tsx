import { useTranslation } from 'react-i18next';
import { FormControl, FormField, FormItem, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { useRemixFormContext } from 'remix-hook-form';
import {
  passwordCapitalLetter,
  passwordLength,
  passwordLowerCaseLetter,
  passwordOneDigit,
  passwordOneSymbol,
} from '~/lib/schemas/password.schema';
import PasswordValidationItem from './passwordValidationItem';

const passwordRules = [
  { title: 'validation_lower_case_letter', schema: passwordLowerCaseLetter },
  { title: 'validation_capital_letter', schema: passwordCapitalLetter },
  { title: 'validation_minimum_one_digit', schema: passwordOneDigit },
  { title: 'validation_minimum_one_symbol', schema: passwordOneSymbol },
  { title: 'validation_length', schema: passwordLength },
];

export default function PasswordInput() {
  const { t } = useTranslation();
  const form = useRemixFormContext<{ password: string }>();

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Input
              placeholder={t('password')}
              {...field}
              type="password"
              tooltipContent={
                <ul className="flex flex-col gap-[12px]">
                  {passwordRules.map(PasswordValidationItem)}
                </ul>
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
