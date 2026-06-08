'use client'

import { useEffect, useRef, useState } from 'react'

export const EMAIL = 'majidsajid@outlook.com'

/**
 * Shared copy-to-clipboard behavior for the email links/buttons.
 * Uses the Clipboard API with a legacy execCommand fallback.
 * Never opens a mailto / email client.
 */
export function useEmailCopy() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Clean up the toast timer on unmount
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const showCopied = () => {
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  const copyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL)
        showCopied()
        return
      }
    } catch {
      // fall through to the legacy fallback below
    }
    try {
      const ta = document.createElement('textarea')
      ta.value = EMAIL
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.top = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      showCopied()
    } catch {
      // Last resort: nothing destructive, no mailto fallback per spec
    }
  }

  return { copied, copyEmail }
}

/**
 * Subtle "Email copied" toast — aria-live, fixed position so it never
 * shifts layout. Renders the message only while visible so screen readers
 * announce each copy.
 */
export function EmailCopyToast({ copied }: { copied: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] pointer-events-none transition-all duration-300 ${
        copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      {copied && (
        <span
          className="inline-flex items-center px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.08em] text-[var(--text)]"
          style={{
            border: '1px solid var(--border)',
            background: 'rgba(247,245,240,0.95)',
            backdropFilter: 'blur(8px)',
          }}
        >
          Email copied
        </span>
      )}
    </div>
  )
}
