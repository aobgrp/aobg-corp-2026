import { useState } from 'react'
import { X } from 'lucide-react'

import { announcement } from '@/config/announcement'

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false)

  const message = announcement.message.trim()
  if (!announcement.enabled || !message || dismissed) return null

  return (
    <div
      role="region"
      aria-label="Site announcement"
      className="bg-announcement text-white"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-5 py-2.5 sm:px-8">
        <p className="flex-1 text-center text-sm font-medium leading-snug">
          {message}
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="-mr-1.5 flex shrink-0 items-center justify-center rounded-md p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--announcement))]"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
