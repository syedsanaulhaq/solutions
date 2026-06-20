'use client';

import { useEffect, useState } from 'react';

const SOLUTIONS_URL = 'https://solutions.hostingocean.net';
const SESSION_KEY = 'ho_solutions_popup_dismissed';
const PROMO_IMAGE = '/solutions-promo.jpg';

export function SolutionsPromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const dismissed = sessionStorage.getItem(SESSION_KEY);
    if (dismissed === '1') return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  const closePopup = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_KEY, '1');
    }
    setIsOpen(false);
  };

  const openSolutions = () => {
    window.open(SOLUTIONS_URL, '_blank', 'noopener,noreferrer');
    closePopup();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl">
        <button
          type="button"
          aria-label="Close popup"
          className="absolute right-3 top-3 z-10 rounded-full bg-black/75 px-2 py-1 text-xs font-semibold text-white hover:bg-black"
          onClick={closePopup}
        >
          X
        </button>

        {!imageFailed ? (
          <img
            src={PROMO_IMAGE}
            alt="Solutions by Hosting Ocean"
            className="h-44 w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="h-44 w-full bg-gradient-to-r from-[#0f172a] via-[#1d4ed8] to-[#0ea5e9] p-6 text-white">
            <p className="text-xs uppercase tracking-[0.28em] opacity-90">Solutions</p>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight">Custom LMS, AI and Web Development</h3>
          </div>
        )}

        <div className="p-5">
          <h3 className="text-lg font-extrabold text-zinc-900">Explore Hosting Ocean Solutions</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Discover our LMS platforms, AI chatbots and custom web systems for businesses.
          </p>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={openSolutions}
              className="flex-1 rounded-md bg-black px-4 py-2.5 text-sm font-bold text-white hover:bg-zinc-800"
            >
              Open Solutions Site
            </button>
            <button
              type="button"
              onClick={closePopup}
              className="rounded-md border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
