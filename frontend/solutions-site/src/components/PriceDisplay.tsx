'use client';

import { useCurrency } from '@/components/CurrencyProvider';
import { formatRange, formatCurrency } from '@/lib/currency';

interface PriceDisplayProps {
  low: number;
  high?: number;
  highPlus?: boolean;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function PriceDisplay({
  low,
  high,
  highPlus = false,
  prefix = '',
  suffix = '',
  className,
}: PriceDisplayProps) {
  const currency = useCurrency();
  const text = high
    ? formatRange(low, high, currency, highPlus)
    : formatCurrency(low, currency, prefix, suffix);

  return <span className={className}>{text}</span>;
}
