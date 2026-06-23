'use client'

// Mirror — the primary interactive object in the About room.
// The reflection (Majid) is baked into the pixel-art PNG, so no overlay is
// needed. Hover/focus gives a gentle lift; click opens a contextual About
// panel beside the mirror (not a modal). Styles in the <style> block below.

import { useEffect, useRef, useState } from 'react'
import { EMAIL, useEmailCopy, EmailCopyToast } from '@/components/EmailCopy'

const BULLETS = [
  'Based in Amsterdam',
  'Product & UX Design',
  'Interaction Design',
  'AI Experiments',
  'Always Building',
]

export default function Mirror() {
  const [open, setOpen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const { copied, copyEmail } = useEmailCopy()
  const mirrorRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  // Escape closes + returns focus to the mirror; click outside closes
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        mirrorRef.current?.focus()
      }
    }
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (
        panelRef.current && !panelRef.current.contains(t) &&
        mirrorRef.current && !mirrorRef.current.contains(t)
      ) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onDown)
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onDown)
    }
  }, [open])

  return (
    <>
      <button
        ref={mirrorRef}
        type="button"
        className={`ab-obj am-mirror${open ? ' is-open' : ''}${reducedMotion ? ' is-reduced' : ''}`}
        style={{ left: '57.7%', top: '10.7%', width: '32.3%' }}
        aria-label="Standing mirror — open a little about me"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <img
          src="/images/about/pixel-art-mirror-person.png"
          alt="Pixel-art reflection of Majid in a standing mirror"
          className="am-frame"
          style={{ aspectRatio: '1024 / 1536' }}
        />
      </button>

      {/* Contextual panel beside the mirror */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-label="About Majid"
        className={`am-panel${open ? ' is-open' : ''}${reducedMotion ? ' is-reduced' : ''}`}
        hidden={!open}
      >
        <button
          ref={closeRef}
          type="button"
          className="am-close"
          aria-label="Close"
          onClick={() => { setOpen(false); mirrorRef.current?.focus() }}
        >
          ×
        </button>
        <h2 className="am-title">Hey, I&apos;m Majid 👋</h2>
        <p className="am-body">
          Product designer based in Amsterdam, interested in playful systems,
          interaction design, and thoughtful digital experiences.
        </p>
        <ul className="am-list">
          {BULLETS.map(b => <li key={b}>{b}</li>)}
        </ul>
        <button type="button" className="am-cta" onClick={copyEmail} aria-label={`Copy email ${EMAIL}`}>
          Copy email
        </button>
      </div>

      <EmailCopyToast copied={copied} />

      <style>{`
        /* ── Contextual panel ───────────────────────────────── */
        .am-panel {
          position: absolute;
          top: 16%;
          right: 45%;            /* sits just left of the mirror (mirror left edge ~57.7%) */
          width: clamp(240px, 30%, 360px);
          z-index: 3;
          background: #fffefb;
          border: 1.5px solid rgba(121, 175, 182, 0.55);
          border-radius: 16px;
          padding: 22px 22px 24px;
          box-shadow: 0 12px 34px rgba(121, 175, 182, 0.20);
          color: #111110;
          opacity: 0;
          transform: translateY(8px) scale(0.98);
          transform-origin: right center;
          transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .am-panel.is-open { opacity: 1; transform: translateY(0) scale(1); }
        .am-panel.is-reduced { transition: none; transform: none; }

        .am-close {
          position: absolute;
          top: 10px;
          right: 12px;
          background: none;
          border: none;
          font-size: 22px;
          line-height: 1;
          color: rgba(17,17,16,0.45);
          cursor: pointer;
          padding: 2px 6px;
          border-radius: 8px;
        }
        .am-close:hover { color: #111110; background: rgba(121,175,182,0.12); }
        .am-title { font-size: 20px; font-weight: 500; margin: 0 0 10px; letter-spacing: -0.01em; }
        .am-body  { font-size: 14px; line-height: 1.5; color: #4a4a47; margin: 0 0 14px; }
        .am-list  { list-style: none; padding: 0; margin: 0 0 18px; display: flex; flex-direction: column; gap: 7px; }
        .am-list li {
          font-size: 13px; color: #111110; padding-left: 18px; position: relative;
        }
        .am-list li::before {
          content: ''; position: absolute; left: 0; top: 6px;
          width: 7px; height: 7px; border-radius: 2px;
          background: rgba(121, 175, 182, 0.9);
        }
        .am-cta {
          font-family: inherit;
          font-size: 14px;
          padding: 9px 18px;
          border-radius: 30px;
          border: 1.5px solid rgba(121, 175, 182, 0.7);
          background: rgba(121, 175, 182, 0.12);
          color: #111110;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .am-cta:hover { background: rgba(121, 175, 182, 0.22); border-color: rgba(121, 175, 182, 1); }

        /* ── Mobile — panel becomes a full-width card in the stack ── */
        @media (max-width: 760px) {
          .am-panel {
            position: static !important;
            width: 100% !important;
            right: auto; top: auto;
            margin-top: 8px;
            transform: none;
          }
        }
      `}</style>
    </>
  )
}
