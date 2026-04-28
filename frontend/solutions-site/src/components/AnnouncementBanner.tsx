'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

const BANNER_DISMISS_KEY = 'ho_launch_banner_dismissed'

interface AnnouncementBannerProps {
  message?: string
  ctaText?: string
  ctaHref?: string
}

export default function AnnouncementBanner({
  message = 'HostingOcean Solutions is now live — AI Chatbot, LMS Builder & Automation platforms',
  ctaText = 'Explore',
  ctaHref = '/solutions/chatbot',
}: AnnouncementBannerProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(BANNER_DISMISS_KEY)
      if (!dismissed) {
        setVisible(true)
      }
    } catch {
      // localStorage unavailable (e.g. SSR or privacy mode) — show banner
      setVisible(true)
    }
  }, [])

  function handleDismiss() {
    setVisible(false)
    try {
      localStorage.setItem(BANNER_DISMISS_KEY, '1')
    } catch {
      // ignore
    }
  }

  if (!visible) return null

  return (
    <div
      role="banner"
      className="relative z-50 w-full bg-blue-600 text-white px-4 py-2.5 text-sm"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-center gap-x-4 pr-10">
        <p className="text-center leading-snug">
          {message}{' '}
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:no-underline"
          >
            {ctaText} &rarr;
          </Link>
        </p>
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-blue-500 transition-colors"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}
