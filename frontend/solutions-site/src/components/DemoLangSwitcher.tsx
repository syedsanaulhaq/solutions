'use client';

import { useState } from 'react';

const LANGS = [
  {
    code: 'en',
    label: 'English',
    flag: '🇬🇧',
    src: '/demo.html',
    title: 'Voice AI Order Taker Demo',
    barLabel: 'Alex — Voice Order Taker (English)',
  },
  {
    code: 'ja',
    label: '日本語',
    flag: '🇯🇵',
    src: '/demo-ja.html',
    title: 'Voice AI Order Taker Demo — Japanese',
    barLabel: 'ハナ — 音声注文受付 (日本語)',
  },
] as const;

export function DemoLangSwitcher() {
  const [active, setActive] = useState<'en' | 'ja'>('en');
  const lang = LANGS.find((l) => l.code === active)!;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Language tabs */}
      <div className="flex justify-center mb-5">
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-muted border border-border/60 shadow-sm">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => setActive(l.code)}
              className={[
                'flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                active === l.code
                  ? 'bg-white dark:bg-background text-foreground shadow-sm ring-1 ring-border/40'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/60',
              ].join(' ')}
            >
              <span className="text-base leading-none">{l.flag}</span>
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Demo frame */}
      <div className="rounded-2xl border border-border/60 bg-background overflow-hidden shadow-lg">
        {/* Fake browser bar */}
        <div className="bg-[#2563EB]/5 border-b border-[#2563EB]/20 px-6 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-sm text-muted-foreground ml-2 font-medium">
            {lang.barLabel}
          </span>
        </div>
        <iframe
          key={lang.src}
          src={lang.src}
          className="w-full"
          style={{ height: '860px', border: 'none' }}
          title={lang.title}
          allow="microphone"
        />
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Powered by ElevenLabs neural voice · Groq LLM · Works in Chrome &amp; Edge
      </p>
    </div>
  );
}
