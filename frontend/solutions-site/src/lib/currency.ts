// ---------------------------------------------------------------------------
// Currency utilities — supports USD (default) and PKR for Pakistani visitors
// ---------------------------------------------------------------------------

export type CurrencyCode = 'USD' | 'PKR';

/** Approximate fixed exchange rate. Update periodically. */
export const USD_TO_PKR = 280;

export function formatCurrency(
  amount: number,
  currency: CurrencyCode,
  prefix = '',
  suffix = '',
): string {
  if (currency === 'PKR') {
    const pkr = Math.round(amount * USD_TO_PKR);
    return `${prefix}PKR\u00a0${pkr.toLocaleString()}${suffix}`;
  }
  return `${prefix}$${amount.toLocaleString()}${suffix}`;
}

export function formatRange(
  low: number,
  high: number | null | undefined,
  currency: CurrencyCode,
  highPlus = false,
): string {
  if (currency === 'PKR') {
    const pkrLow = Math.round(low * USD_TO_PKR);
    if (!high) return `PKR\u00a0${pkrLow.toLocaleString()}+`;
    const pkrHigh = Math.round(high * USD_TO_PKR);
    return `PKR\u00a0${pkrLow.toLocaleString()} \u2013 PKR\u00a0${pkrHigh.toLocaleString()}${highPlus ? '+' : ''}`;
  }
  if (!high) return `$${low.toLocaleString()}+`;
  return `$${low.toLocaleString()} \u2013 $${high.toLocaleString()}${highPlus ? '+' : ''}`;
}
