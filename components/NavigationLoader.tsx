'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function NavigationLoader() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const isFirst = useRef(true)

  // The /v2 redesign opts out of the old route-transition loader — its routes
  // should feel direct and immediate. Production routes keep the behavior.
  const isV2 = pathname?.startsWith('/v2') ?? false

  useEffect(() => {
    // Skip the very first render (initial page load)
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    if (isV2) {
      setVisible(false)
      return
    }

    setVisible(true)
    const t = setTimeout(() => setVisible(false), 480)
    return () => clearTimeout(t)
  }, [pathname, isV2])

  if (isV2) return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
      style={{
        background: 'var(--bg)',
        opacity: visible ? 1 : 0,
        transition: visible
          ? 'opacity 0.12s ease'
          : 'opacity 0.3s ease 0.15s',
      }}
    >
      {/* Orb */}
      <div
        className="loader-orb absolute"
        style={{
          width: '340px',
          height: '280px',
          background:
            'radial-gradient(ellipse at 40% 40%, #c4b5f4 0%, #f0b897 50%, #e8a0b0 100%)',
          filter: 'blur(72px)',
          opacity: 0.55,
          borderRadius: '50%',
        }}
      />
      <span className="relative font-serif italic text-[var(--muted)] text-[14px] tracking-[-0.01em]">
        Loading
      </span>
    </div>
  )
}
