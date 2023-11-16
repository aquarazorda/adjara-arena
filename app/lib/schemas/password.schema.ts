import { z } from 'zod';

export const passwordLength = z
  .string()
  .min(8, { message: 'password_validation_length_min' })
  .max(30, { message: 'password_validation_length_max' });

export const passwordCapitalLetter = z.string().refine((password) => /[A-Z]/.test(password), {
  message: 'password_validation_capital_letter',
});

export const passwordLowerCaseLetter = z.string().refine((password) => /[a-z]/.test(password), {
  message: 'password_validation_lower_case_letter',
});

export const passwordOneDigit = z.string().refine((password) => /\d/.test(password), {
  message: 'password_validation_one_digit',
});

export const passwordOneSymbol = z.string().refine((password) => /[!@#$%^&*]/.test(password), {
  message: 'password_validation_one_symbol',
});

export const passwordSchema = z
  .string()
  .pipe(passwordLength)
  .pipe(passwordCapitalLetter)
  .pipe(passwordLowerCaseLetter)
  .pipe(passwordOneDigit)
  .pipe(passwordOneSymbol);
