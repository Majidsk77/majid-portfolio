'use client'

// /v2 — Homepage redesign sandbox: three-worlds lobby concept.
// Implements the Figma "AI Playground" frame (node 1:32).
// Reuses shared Nav + Footer. Does NOT affect the production homepage.
// Branch: redesign/v2

import Link from 'next/link'
import { Hanken_Grotesk } from 'next/font/google'
import { useState, useEffect } from 'react'
import NavV2 from './NavV2'
import FooterV2 from './FooterV2'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

// ── Types ─────────────────────────────────────────────────────────────────────

type WorldId = 'playground' | 'work' | 'about'

interface World {
  id: WorldId
  label: string
  href: string
}

// ── World definitions ─────────────────────────────────────────────────────────

const WORLDS: World[] = [
  { id: 'playground', label: 'AI Playground', href: '#' },
  { id: 'work',       label: 'Selected Work',  href: '#' },
  { id: 'about',      label: 'About Me',        href: '#' },
]

// ── Per-world color tokens ────────────────────────────────────────────────────
// Kept subtle and premium against the cream #f7f5f0 background.
// AI Playground: muted indigo (experimental, digital)
// Selected Work: near-black (editorial, resolved)
// About Me: warm terracotta (personal, human)

const TOKENS: Record<WorldId, {
  borderRest: string
  borderHover: string
  bgRest: string
  bgHover: string
  arrowRest: string
  arrowHover: string
  pixelGrid: boolean   // AI Playground only: faint dot-grid on hover
}> = {
  playground: {
    borderRest:  'rgba(99, 102, 241, 0.25)',
    borderHover: 'rgba(99, 102, 241, 0.55)',
    bgRest:      'rgba(99, 102, 241, 0.025)',
    bgHover:     'rgba(99, 102, 241, 0.06)',
    arrowRest:   'rgba(99, 102, 241, 0.50)',
    arrowHover:  'rgba(99, 102, 241, 0.90)',
    pixelGrid:   true,
  },
  work: {
    borderRest:  'rgba(17, 17, 16, 0.20)',
    borderHover: 'rgba(17, 17, 16, 0.65)',
    bgRest:      'transparent',
    bgHover:     'rgba(17, 17, 16, 0.027)',
    arrowRest:   'rgba(17, 17, 16, 0.32)',
    arrowHover:  'rgba(17, 17, 16, 0.80)',
    pixelGrid:   false,
  },
  about: {
    borderRest:  'rgba(160, 90, 40, 0.25)',
    borderHover: 'rgba(160, 90, 40, 0.52)',
    bgRest:      'rgba(251, 235, 215, 0.30)',
    bgHover:     'rgba(251, 235, 215, 0.75)',
    arrowRest:   'rgba(160, 90, 40, 0.50)',
    arrowHover:  'rgba(160, 90, 40, 0.90)',
    pixelGrid:   false,
  },
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

// ── PixelOverlay — AI Playground card only ────────────────────────────────────
// Scanlines scroll upward + three pixels blink at staggered step intervals.
// steps(1) easing produces the hard frame-cut that reads as 8-bit.

const PIXEL_BLOCKS = [
  { w: 4, h: 4, bottom: 28, right: 22, delay: '0s',     dur: '0.7s' },
  { w: 3, h: 3, bottom: 38, right: 31, delay: '0.28s',  dur: '0.9s' },
  { w: 4, h: 4, bottom: 22, right: 33, delay: '0.55s',  dur: '0.6s' },
]

function PixelOverlay({ visible }: { visible: boolean }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        borderRadius: 'inherit',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.35s ease',
      }}
    >
      {/* Scanlines — thin horizontal rules that scroll upward */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(transparent, transparent 3px, rgba(99,102,241,0.06) 3px, rgba(99,102,241,0.06) 4px)',
          backgroundSize: '100% 4px',
          animation: visible ? 'v2ScanScroll 1.4s linear infinite' : 'none',
        }}
      />
      {/* Pixel blocks — blink in hard steps */}
      {PIXEL_BLOCKS.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            bottom: p.bottom,
            right: p.right,
            width: p.w,
            height: p.h,
            background: 'rgba(99,102,241,0.6)',
            animation: visible
              ? `v2PixelBlink ${p.dur} steps(1) ${p.delay} infinite`
              : 'none',
          }}
        />
      ))}
    </span>
  )
}

// ── WorldCard ─────────────────────────────────────────────────────────────────

function WorldCard({ id, label, href, reducedMotion }: World & { reducedMotion: boolean }) {
  const [hovered, setHovered] = useState(false)
  const on = hovered && !reducedMotion
  const tk = TOKENS[id]

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={label}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '148px',
        borderRadius: '14px',
        border: `1.5px solid ${on ? tk.borderHover : tk.borderRest}`,
        background: on ? tk.bgHover : tk.bgRest,
        padding: '26px 22px 20px',
        textDecoration: 'none',
        outline: 'none',
        position: 'relative',
        overflow: 'hidden',
        // Selected Work: editorial shadow lift
        boxShadow:
          id === 'work' && on
            ? '0 4px 20px rgba(17,17,16,0.08)'
            : '0 0 0 rgba(0,0,0,0)',
        transition: reducedMotion
          ? 'none'
          : `border-color 0.4s ${EASE}, background 0.4s ${EASE}, box-shadow 0.4s ${EASE}`,
      }}
    >
      {/* 8-bit overlay — AI Playground only */}
      {id === 'playground' && !reducedMotion && (
        <PixelOverlay visible={on} />
      )}

      {/* Label */}
      <span
        style={{
          fontSize: '18px',
          fontWeight: 400,
          color: '#111110',
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </span>

      {/* Arrow — slides right and intensifies on hover */}
      <span
        aria-hidden="true"
        style={{
          fontSize: '14px',
          color: on ? tk.arrowHover : tk.arrowRest,
          display: 'inline-block',
          transform: on ? 'translateX(4px)' : 'translateX(0)',
          transition: reducedMotion
            ? 'none'
            : `transform 0.4s ${EASE}, color 0.4s ${EASE}`,
        }}
      >
        →
      </span>
    </Link>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePageV2() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div
      className={hanken.className}
      style={{
        // Exact viewport height on desktop so nav+lobby+footer all fit without scroll.
        // dvh falls back to vh in older browsers; both prevent over-tall pages.
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
        // Allow scroll on very small/mobile viewports where content naturally exceeds one screen.
        overflowY: 'auto',
      }}
    >
      <NavV2 />

      {/* Lobby — fills the space between Nav and Footer, content centered */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Top: just enough to clear the fixed nav (~88px).
          // Use vh for vertical values so padding scales with viewport height, not width.
          padding: 'clamp(88px, 11vh, 108px) clamp(16px, 2.8vw, 40px) clamp(16px, 2vh, 32px)',
          minHeight: 0, // lets flex child shrink inside the exact-height parent
        }}
      >
        {/* Outer rounded container — matches Figma panel (1360px, border, radius 30) */}
        <div
          style={{
            width: '100%',
            maxWidth: '1360px',
            // Stretch to fill all available height between nav offset and footer.
            alignSelf: 'stretch',
            border: '1px solid rgba(217, 217, 217, 0.7)',
            borderRadius: '30px',
            padding: 'clamp(28px, 5vh, 64px) clamp(28px, 5vw, 72px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // Center content vertically inside the now-tall panel.
            justifyContent: 'center',
            gap: 'clamp(20px, 3vh, 40px)',
          }}
        >
          {/* Headline — preserved from Figma, Hanken Grotesk 400 */}
          <p
            style={{
              fontSize: 'clamp(22px, 2.8vw, 40px)',
              fontWeight: 400,
              lineHeight: 1.3,
              color: '#111110',
              textAlign: 'center',
              maxWidth: '580px',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Currently designing products, exploring AI, and occasionally building
            things that shouldn&apos;t exist.
          </p>

          {/* Three worlds — CSS grid, equal columns, stacks on mobile */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              width: '100%',
              maxWidth: '560px',
            }}
            // Stack to single column below 480px
            className="worlds-grid"
          >
            {WORLDS.map(w => (
              <WorldCard key={w.id} {...w} reducedMotion={reducedMotion} />
            ))}
          </div>
        </div>
      </main>

      <FooterV2 />

      {/* Scoped keyframes and responsive rules — isolated to /v2 */}
      <style>{`
        @keyframes v2ScanScroll {
          from { background-position: 0 0; }
          to   { background-position: 0 -4px; }
        }
        @keyframes v2PixelBlink {
          0%   { opacity: 0; }
          50%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @media (max-width: 480px) {
          .worlds-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
