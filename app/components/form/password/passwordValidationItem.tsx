import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ZodSchema } from 'zod';
import CheckCircle from '~/components/icons/Check-circle';
import { useFormField } from '~/components/ui/form';
import { cn } from '~/lib/utils';

type Props = {
  title: string;
  schema: ZodSchema;
};

export default function PasswordValidationItem({ title, schema }: Props) {
  const { t } = useTranslation();
  const [isValid, setIsValid] = useState(false);
  const { value } = useFormField();

  const checkValue = useCallback(debounce((val) => {
    schema.safeParse(val).success ? setIsValid(true) : setIsValid(false);
  }, 400), []);

  useEffect(() => {
    checkValue(value);
  }, [value]);

  return (
    <li className="flex items-center gap-[8px]" key={title}>
      <CheckCircle className={cn(!isValid && 'fill-silver-700 dark:text-grey-100', isValid && 'fill-green-500')} />
      <p
        className={cn(
          'text-[11px] text-silver-700 dark:text-grey-100',
          isValid && 'text-green-500 dark:text-green-500'
        )}
      >
        {t(title)}
      </p>
    </li>
  );
}
