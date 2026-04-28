'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Link2, Check } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
}

export function SocialShare({ url, title }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Share
      </span>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=HostingOcean`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter / X"
        className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] transition-colors"
      >
        <Twitter className="h-3.5 w-3.5" />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] transition-colors"
      >
        <Linkedin className="h-3.5 w-3.5" />
      </a>

      {/* Copy link */}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link to clipboard"
        className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#2563EB]/10 hover:text-[#2563EB] transition-colors"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <Link2 className="h-3.5 w-3.5" />
        )}
      </button>

      {copied && (
        <span className="text-xs text-emerald-500 font-medium animate-pulse">
          Copied!
        </span>
      )}
    </div>
  );
}
