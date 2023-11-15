import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type UnwrappedArray<T> = T extends (infer U)[] ? U : T;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
