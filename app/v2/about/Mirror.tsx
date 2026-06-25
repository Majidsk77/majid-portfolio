'use client'

import { useEffect, useRef, useState } from 'react'
import { EMAIL, useEmailCopy, EmailCopyToast } from '@/components/EmailCopy'

export default function Mirror() {
  const [hovered, setHovered] = useState(false)
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

  // Escape closes panel + returns focus; click-outside closes
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); mirrorRef.current?.focus() }
    }
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (
        panelRef.current && !panelRef.current.contains(t) &&
        mirrorRef.current && !mirrorRef.current.contains(t)
      ) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onDown)
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onDown)
    }
  }, [open])

  const transitionDuration = reducedMotion ? '0s' : '0.25s'

  return (
    <>
      <button
        ref={mirrorRef}
        type="button"
        className="ab-obj am-mirror"
        style={{ left: '57.7%', top: '10.7%', width: '32.3%' }}
        aria-label="Standing mirror — open a little about me"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {/* Default mirror — fades out on hover */}
        <img
          src="/images/about/pixel-art-mirror-person.png"
          alt=""
          aria-hidden="true"
          className="am-frame"
          style={{
            aspectRatio: '1024 / 1536',
            opacity: hovered ? 0 : 1,
            transition: `opacity ${transitionDuration} ease`,
          }}
        />
        {/* Smiling reflection — fades in on hover */}
        <img
          src="/images/about/pixel-art-mirror-person-smiling.png"
          alt="Pixel-art reflection of Majid smiling in a standing mirror"
          className="am-frame am-frame--hover"
          style={{
            aspectRatio: '1024 / 1536',
            opacity: hovered ? 1 : 0,
            transition: `opacity ${transitionDuration} ease`,
          }}
        />
      </button>

      {/* Contextual About panel beside the mirror */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-label="About Majid"
        className={`am-panel${open ? ' is-open' : ''}`}
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
          Hi, I&apos;m a Product Designer who loves solving complex problems and
          turning them into experiences that feel simple, thoughtful, and
          enjoyable to use.
        </p>
        <p className="am-body">
          When I&apos;m away from my desk, I&apos;m probably exploring a new café,
          at a concert or festival, mixing music, or watching an arthouse film.
        </p>
        <p className="am-body">
          <span className="am-funfact">Fun fact:</span> I spent seven years
          playing classical guitar in an orchestra.
        </p>
        <button
          type="button"
          className="am-cta"
          onClick={copyEmail}
          aria-label={`Copy email ${EMAIL}`}
        >
          Copy email
        </button>
      </div>

      <EmailCopyToast copied={copied} />

      <style>{`
        /* Two-image swap: both images stacked, opacity toggled on hover/focus */
        .am-mirror { outline: none; }
        .am-mirror:focus-visible {
          outline: 2px solid rgba(121,175,182,0.9);
          outline-offset: 6px;
          border-radius: 6px;
        }
        .am-frame {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          user-select: none;
        }
        /* Hover image sits exactly on top of default */
        .am-frame--hover {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* ── Contextual panel ───────────────────────────────── */
        .am-panel {
          position: absolute;
          top: 14%;
          /* mirror button left edge is 57.7%, but the PNG has transparent
             padding, so sitting near-flush to the box leaves a ~12-18px visual
             gap to the actual glass — reads as attached to the mirror */
          right: 39.8%;
          width: clamp(240px, 29%, 360px);
          z-index: 3;
          background: #fffefb;
          border: 1.5px solid rgba(121, 175, 182, 0.55);
          border-radius: 16px;
          padding: 22px 22px 24px;
          box-shadow: 0 6px 18px rgba(121, 175, 182, 0.14);
          color: #111110;
          opacity: 0;
          /* grows out of the mirror edge: slide in from the right + subtle scale */
          transform: translateX(18px) scale(0.96);
          transform-origin: right center;
          /* easeOutCubic — calm, premium, not springy */
          transition: opacity 0.28s cubic-bezier(0.215, 0.61, 0.355, 1),
                      transform 0.32s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        .am-panel.is-open { opacity: 1; transform: translateX(0) scale(1); }
        @media (prefers-reduced-motion: reduce) {
          .am-panel { transition: none; transform: none; }
        }

        .am-close {
          position: absolute; top: 10px; right: 12px;
          background: none; border: none;
          font-size: 22px; line-height: 1;
          color: rgba(17,17,16,0.45);
          cursor: pointer; padding: 2px 6px; border-radius: 8px;
        }
        .am-close:hover { color: #111110; background: rgba(121,175,182,0.12); }
        .am-title { font-size: 20px; font-weight: 500; margin: 0 0 12px; letter-spacing: -0.01em; }
        .am-body  { font-size: 14px; line-height: 1.6; color: #4a4a47; margin: 0 0 14px; max-width: 34ch; }
        .am-body:last-of-type { margin-bottom: 18px; }
        .am-funfact { font-weight: 500; color: #2f6a72; }
        .am-cta {
          font-family: inherit; font-size: 14px;
          padding: 9px 18px; border-radius: 30px;
          border: 1.5px solid rgba(121, 175, 182, 0.7);
          background: rgba(121, 175, 182, 0.12);
          color: #111110; cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .am-cta:hover { background: rgba(121, 175, 182, 0.22); border-color: rgba(121, 175, 182, 1); }

        /* Mobile — panel becomes full-width card in the stack */
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
