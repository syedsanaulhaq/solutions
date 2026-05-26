'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { CurrencyCode } from '@/lib/currency';

const CurrencyContext = createContext<CurrencyCode>('USD');

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  useEffect(() => {
    fetch('https://ipapi.co/country_code/')
      .then((r) => r.text())
      .then((code) => {
        if (code.trim() === 'PK') setCurrency('PKR');
      })
      .catch(() => {
        // silently fall back to USD if geo lookup fails
      });
  }, []);

  return (
    <CurrencyContext.Provider value={currency}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyCode {
  return useContext(CurrencyContext);
}
