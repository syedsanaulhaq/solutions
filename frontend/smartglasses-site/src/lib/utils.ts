import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Pakistani Rupees, e.g. 4990 -> "Rs. 4,990" */
export function formatPKR(amount: number) {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}
