'use client'

import { useEffect, useRef, useState } from 'react'

const RESUME_URL =
  'https://drive.google.com/file/d/1-40FvUisOKLs-e9uVBAJ3Ftg8TM9EUVK/view?usp=sharing'

export default function Mirror() {
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
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
        aria-label="Standing mirror: open a little about me"
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
        <a
          className="am-cta"
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open resume (opens in a new tab)"
          onKeyDown={(e) => {
            // links activate on Enter natively; also honor Space
            if (e.key === ' ') { e.preventDefault(); (e.currentTarget as HTMLAnchorElement).click() }
          }}
        >
          Open Resume <span className="am-cta-arrow" aria-hidden="true">↗</span>
        </a>
      </div>

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

        /* ── Contextual panel — museum placard ─────────────────────────────
           Positioned to the RIGHT of the visible mirror glass.
           The mirror button box spans 57.7%–90% of the stage; the actual
           glass ends around 78–80% (the remaining ~10–12% is transparent
           PNG padding). left: 80% places the panel in that transparent zone
           so it never covers visible mirror pixels, while sitting flush with
           a ~20px visual gap from the glass edge.
           right: 0 keeps the panel within the stage so it is never clipped. */
        .am-panel {
          position: absolute;
          left: 80%;
          right: 0;
          /* vertically: upper-middle of mirror. Mirror top is 10.7%;
             at 30% the panel sits in the mirror's mid-upper section. */
          top: 30%;
          z-index: 3;
          background: #fffefb;
          /* thin, flat border — placard, not card */
          border: 1px solid rgba(121, 175, 182, 0.38);
          border-radius: 5px;
          /* compact padding — no excess vertical space */
          padding: 13px 15px 15px;
          /* no box-shadow — placards don't float */
          color: #111110;
          opacity: 0;
          /* unfolds horizontally from the mirror's right edge:
             scaleX(0.82) collapses width toward the left anchor,
             giving the impression the panel unfolds rightward. */
          transform: scaleX(0.82);
          transform-origin: left center;
          transition: opacity 0.22s ease-out,
                      transform 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .am-panel.is-open { opacity: 1; transform: scaleX(1); }
        @media (prefers-reduced-motion: reduce) {
          .am-panel { transition: opacity 0.15s ease; transform: scaleX(1); }
        }

        /* Close button — kept small and recessive so it doesn't break the placard feel */
        .am-close {
          position: absolute; top: 7px; right: 8px;
          background: none; border: none;
          font-size: 17px; line-height: 1;
          color: rgba(17,17,16,0.30);
          cursor: pointer; padding: 2px 5px; border-radius: 5px;
        }
        .am-close:hover { color: rgba(17,17,16,0.75); background: rgba(121,175,182,0.10); }

        /* Typography — tighter, editorial */
        .am-title { font-size: 15px; font-weight: 500; margin: 0 0 8px; letter-spacing: -0.015em; }
        .am-body  { font-size: 12px; line-height: 1.45; color: #4a4a47; margin: 0 0 7px; }
        .am-body:last-of-type { margin-bottom: 12px; }
        .am-funfact { font-weight: 500; color: #2f6a72; }

        /* CTA — slim pill, not enlarged */
        .am-cta {
          display: inline-flex;
          align-items: baseline;
          gap: 3px;
          font-family: inherit; font-size: 12.5px;
          padding: 6px 13px; border-radius: 20px;
          border: 1px solid rgba(121, 175, 182, 0.60);
          background: rgba(121, 175, 182, 0.10);
          color: #111110; cursor: pointer;
          text-decoration: none;
          transition: background 0.18s ease, border-color 0.18s ease;
        }
        .am-cta:hover { background: rgba(121, 175, 182, 0.20); border-color: rgba(121, 175, 182, 0.90); }
        .am-cta:focus-visible { outline: 2px solid rgba(121, 175, 182, 0.9); outline-offset: 2px; }
        .am-cta-arrow {
          opacity: 0.70;
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .am-cta:hover .am-cta-arrow,
        .am-cta:focus-visible .am-cta-arrow {
          opacity: 1;
          transform: translate(1.5px, -1.5px);
        }
        @media (prefers-reduced-motion: reduce) {
          .am-cta-arrow { transition: opacity 0.18s ease; }
          .am-cta:hover .am-cta-arrow,
          .am-cta:focus-visible .am-cta-arrow { transform: none; }
        }

        /* Mobile — mirror stays as a relative box; panel flows inline below it */
        @media (max-width: 760px) {
          .am-mirror {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 180px !important;
          }
          .am-panel {
            position: static !important;
            width: min(90vw, 340px) !important;
            margin: 12px auto 0 !important;
            transform: translateY(6px) scale(0.98) !important;
            right: auto !important;
            top: auto !important;
          }
          .am-panel.is-open {
            transform: translateY(0) scale(1) !important;
            opacity: 1;
          }
          .am-title { font-size: 17px; }
          .am-body { font-size: 13px; }
        }
        @media (max-width: 760px) and (prefers-reduced-motion: reduce) {
          .am-panel { transform: none !important; }
          .am-panel.is-open { transform: none !important; }
        }
      `}</style>
    </>
  )
}
