'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

// Three pixel dots — staggered steps(1) timing gives the hard frame-cut
// 8-bit feel that matches the AI Playground room.
const DOTS = [
  { delay: '0s',    color: 'rgba(99,102,241,0.80)' },  // indigo
  { delay: '0.18s', color: 'rgba(232,92,92,0.72)'  },  // coral
  { delay: '0.36s', color: 'rgba(99,102,241,0.55)' },  // indigo dim
]

export default function NavigationLoader() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const isFirst = useRef(true)

  useEffect(() => {
    // Skip the very first render (initial page load — not a navigation)
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    setVisible(true)
    const t = setTimeout(() => setVisible(false), 520)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <div
      aria-hidden="true"
      aria-live="polite"
      role="status"
      className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
      style={{
        background: 'var(--bg, #f7f5f0)',
        opacity: visible ? 1 : 0,
        transition: visible
          ? 'opacity 0.10s ease'
          : 'opacity 0.28s ease 0.18s',
      }}
    >
      {/* Pill frame — matches the room-frame language of the new site */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
          padding: '20px 28px',
          border: '1px solid rgba(17,17,16,0.10)',
          borderRadius: '14px',
          background: 'rgba(247,245,240,0.92)',
        }}
      >
        {/* Copy — DM Serif italic, warm and unhurried */}
        <span
          style={{
            fontFamily: 'var(--font-dm-serif, Georgia, serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: 1,
            color: 'var(--muted, #6b6b67)',
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
          }}
        >
          Opening the door…
        </span>

        {/* Pixel dots — 3 blocks, staggered steps(1) for 8-bit blink */}
        <div
          style={{ display: 'flex', gap: '7px', alignItems: 'center' }}
          aria-hidden="true"
        >
          {DOTS.map((d, i) => (
            <span
              key={i}
              className="nl-dot"
              style={{
                display: 'block',
                width: '5px',
                height: '5px',
                background: d.color,
                imageRendering: 'pixelated',
                animation: `nlDotBlink 0.72s steps(1) ${d.delay} infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes nlDotBlink {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50%       { opacity: 1;    transform: scale(1.4); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nl-dot { animation: none !important; opacity: 0.5 !important; }
        }
      `}</style>
    </div>
  )
}
