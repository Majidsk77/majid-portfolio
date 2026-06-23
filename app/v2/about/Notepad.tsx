'use client'

// Notepad — click/Enter/Space cycles through short notes. The only
// interactive island on the otherwise server-rendered About room.
// Notes are intentionally easy to edit: just adjust the array below.

import { useEffect, useRef, useState } from 'react'

const NOTES = [
  'Currently overthinking small details.',
  'Favorite kind of chaos: organized.',
  'Probably making another prototype.',
  'Amsterdam made me softer.',
  'Ask me about tiny interactions.',
  'Still chasing better hover states.',
]

export default function Notepad() {
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => {
      mq.removeEventListener('change', handler)
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const next = () => {
    if (reducedMotion) {
      setIndex(i => (i + 1) % NOTES.length)
      return
    }
    // fade/slide out, swap, fade back in
    setShown(false)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setIndex(i => (i + 1) % NOTES.length)
      setShown(true)
    }, 170)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      next()
    }
  }

  return (
    <button
      type="button"
      className="ab-obj ab-notepad ab-notepad--interactive"
      aria-label={`Fun fact about me. Click to show the next one. Currently: ${NOTES[index]}`}
      onClick={next}
      onKeyDown={onKeyDown}
    >
      <img
        src="/images/about/notepad.svg"
        alt=""
        style={{ aspectRatio: '126.136 / 159.492' }}
      />
      <span className="ab-notepad-text">
        <span
          aria-live="polite"
          style={{
            display: 'inline-block',
            opacity: shown ? 1 : 0,
            transform: reducedMotion ? 'none' : shown ? 'translateY(0)' : 'translateY(4px)',
            transition: reducedMotion
              ? 'none'
              : 'opacity 0.17s ease, transform 0.17s ease',
          }}
        >
          {NOTES[index]}
        </span>
      </span>
    </button>
  )
}
