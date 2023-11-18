import { FieldError } from 'react-hook-form';
import { Err } from 'ts-results';

export const createFormErrorReturn =
  <T extends object>(defaultValues: T) =>
  (errors: Partial<Record<keyof T, string>>) => {
    const errorValues = Object.keys(errors).reduce((acc, curr) => {
      acc[curr as keyof T] = { message: errors[curr as keyof T], type: 'custom' };
      return acc;
    }, {} as Record<keyof T, FieldError>);
    return Err({ defaultValues, errors: errorValues });
  };