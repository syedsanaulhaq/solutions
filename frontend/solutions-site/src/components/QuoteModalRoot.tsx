'use client';

import { useEffect, useState } from 'react';
import { QuoteModal } from '@/components/QuoteModal';

/**
 * Mounts once in the root layout and listens for 'open-quote-modal' custom events.
 * This allows any component — including server components — to trigger the modal
 * via QuoteButton without prop-drilling.
 */
export function QuoteModalRoot() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handler() { setOpen(true); }
    window.addEventListener('open-quote-modal', handler);
    return () => window.removeEventListener('open-quote-modal', handler);
  }, []);

  return <QuoteModal open={open} onClose={() => setOpen(false)} />;
}
