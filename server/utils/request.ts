import { json } from '@remix-run/node';
import type { FieldError } from 'react-hook-form';
import i18next from '~/i18n.server';
import { parseCookies } from '~/lib/cookies';

export const parseFormData = <T>(formData: FormData) => {
  const data: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value.toString();
  }
  return data as T;
}

export const getLoaderLangs = async (request: Request, langKeys: string[]) => {
  const cookie = parseCookies(request.headers.get('cookie'));
  const t = await i18next.getFixedT(cookie.lang || request);

  return langKeys.reduce((acc, curr) => {
    acc[curr] = t(curr);
    return acc;
  }, {} as Record<string, string>);
}

export const createFormErrorReturn = <T extends object>(defaultValues: T) => (errors: Partial<Record<keyof T, string>>) => {
  const errorValues = Object.keys(errors).reduce((acc, curr) => {
    acc[curr as keyof T] = { message: errors[curr as keyof T], type: "custom" };
    return acc;
  }, {} as Record<keyof T, FieldError>);

  return { status: "error", defaultValues, errors: errorValues } as const;
};

export const createFormErrorReturnJson = <T extends object>(defaultValues: T) => (errors: Partial<Record<keyof T, string>>) => {
  return json (createFormErrorReturn(defaultValues)(errors));
}