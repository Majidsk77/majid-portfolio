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
    borderHover: 'rgba(255, 255, 255, 0.14)',  // light border on dark hover bg
    bgRest:      'transparent',
    bgHover:     '#0e0e0d',                     // deep dark — portal opens
    arrowRest:   'rgba(17, 17, 16, 0.32)',
    arrowHover:  'rgba(247, 245, 240, 0.80)',   // cream on dark
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
// Layers: scrolling scanlines + pixel grid floor + 10 pixel blocks spread
// across the card in a staggered "boot sequence" pattern.
// steps(1) easing on all blinking produces hard frame-cuts (8-bit feel).

const PIXEL_BLOCKS = [
  // bottom strip — first to light up
  { w: 4, h: 4, bottom: 20, left:  22, right: undefined, delay: '0.00s', dur: '0.55s' },
  { w: 3, h: 3, bottom: 20, left:  36, right: undefined, delay: '0.08s', dur: '0.70s' },
  { w: 4, h: 4, bottom: 22, left: undefined, right: 22,  delay: '0.16s', dur: '0.60s' },
  { w: 3, h: 3, bottom: 20, left: undefined, right: 36,  delay: '0.12s', dur: '0.80s' },
  // mid band
  { w: 3, h: 3, bottom: 60, left:  26, right: undefined, delay: '0.30s', dur: '0.65s' },
  { w: 4, h: 4, bottom: 56, left: undefined, right: 28,  delay: '0.40s', dur: '0.75s' },
  { w: 3, h: 3, bottom: 64, left:  50, right: undefined, delay: '0.35s', dur: '0.90s' },
  // upper strip — last to light up, giving boot-sequence feel
  { w: 3, h: 3, bottom: 96, left:  22, right: undefined, delay: '0.55s', dur: '0.85s' },
  { w: 4, h: 4, bottom: 90, left: undefined, right: 22,  delay: '0.62s', dur: '0.60s' },
  { w: 3, h: 3, bottom: 100,left:  46, right: undefined, delay: '0.70s', dur: '0.70s' },
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
        transition: 'opacity 0.25s ease',
      }}
    >
      {/* Pixel-grid floor — 8×8 tile scrolls diagonally, gives sense of digital space */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: [
            'repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(99,102,241,0.045) 7px, rgba(99,102,241,0.045) 8px)',
            'repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(99,102,241,0.045) 7px, rgba(99,102,241,0.045) 8px)',
          ].join(', '),
          backgroundSize: '8px 8px',
          animation: visible ? 'v2GridDrift 3s linear infinite' : 'none',
        }}
      />
      {/* Scanlines — denser and faster than before */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(transparent, transparent 2px, rgba(99,102,241,0.09) 2px, rgba(99,102,241,0.09) 3px)',
          backgroundSize: '100% 3px',
          animation: visible ? 'v2ScanScroll 0.9s linear infinite' : 'none',
        }}
      />
      {/* Pixel blocks — spread top-to-bottom, boot-sequence stagger */}
      {PIXEL_BLOCKS.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            bottom: p.bottom,
            ...(p.left  !== undefined ? { left:  p.left  } : {}),
            ...(p.right !== undefined ? { right: p.right } : {}),
            width:  p.w,
            height: p.h,
            background: 'rgba(99,102,241,0.7)',
            animation: visible
              ? `v2PixelBlink ${p.dur} steps(1) ${p.delay} infinite`
              : 'none',
          }}
        />
      ))}
    </span>
  )
}

// ── WorkOverlay — Selected Work card only ─────────────────────────────────────
// Bold editorial portal over a deep #0e0e0d base:
//  1. Rotating conic wheel — saturated magenta/violet/amber/teal — liquid color
//  2. Two drifting bright radial blobs at screen blend — bloom + depth
//  3. Diagonal light sweep crossing the surface
//  4. Grain at screen blend — film texture on the dark field
// Text inverts to cream (see WorldCard). Smooth easing — premium, not glitchy.

const WORK_GRAIN = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>" +
  "<filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/></filter>" +
  "<rect width='220' height='220' filter='url(#g)' opacity='0.55'/>" +
  "</svg>"
)

function WorkOverlay({ visible }: { visible: boolean }) {
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
        transition: 'opacity 0.55s ease',
      }}
    >
      {/* 1. Rotating conic color wheel — the liquid editorial energy */}
      <span
        style={{
          position: 'absolute',
          // oversized + centered so rotation never reveals corners
          inset: '-60%',
          background:
            'conic-gradient(from 0deg at 50% 50%, ' +
            '#d6356b 0deg, #6b3fd6 80deg, #2f6bd6 150deg, ' +
            '#1e9c8a 220deg, #d6953f 300deg, #d6356b 360deg)',
          filter: 'blur(28px)',
          opacity: 0.55,
          animation: visible ? 'v2WorkSpin 14s linear infinite' : 'none',
        }}
      />
      {/* 2. Drifting bright blobs — bloom highlights at screen blend */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          mixBlendMode: 'screen',
          background: [
            'radial-gradient(ellipse 70% 60% at 20% 25%, rgba(214,53,107,0.55) 0%, transparent 60%)',
            'radial-gradient(ellipse 65% 70% at 82% 78%, rgba(47,107,214,0.50) 0%, transparent 60%)',
          ].join(', '),
          backgroundSize: '200% 200%',
          animation: visible ? 'v2WorkDrift 9s ease-in-out infinite alternate' : 'none',
        }}
      />
      {/* 3. Diagonal light sweep */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.16) 50%, transparent 65%)',
          backgroundSize: '250% 250%',
          mixBlendMode: 'screen',
          animation: visible ? 'v2WorkSweep 6s ease-in-out infinite' : 'none',
        }}
      />
      {/* 4. Grain — film texture over the color field */}
      <span
        style={{
          position: 'absolute',
          inset: '-10px',
          backgroundImage: `url("data:image/svg+xml,${WORK_GRAIN}")`,
          backgroundSize: '220px 220px',
          mixBlendMode: 'screen',
          opacity: 0.5,
          animation: visible ? 'v2GrainBreathe 4s ease-in-out infinite' : 'none',
        }}
      />
      {/* Inner vignette — keeps edges grounded so text stays readable */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 45%, rgba(14,14,13,0.55) 100%)',
        }}
      />
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
        boxShadow:
          id === 'playground' && on
            ? 'inset 0 0 32px rgba(99,102,241,0.10), inset 0 0 8px rgba(99,102,241,0.08)'
            : id === 'work' && on
            ? '0 12px 48px rgba(0,0,0,0.40), 0 3px 12px rgba(0,0,0,0.25)'
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
      {/* Grain + gradient overlay — Selected Work only */}
      {id === 'work' && !reducedMotion && (
        <WorkOverlay visible={on} />
      )}

      {/* Label — playground glitches; work inverts to cream on dark bg */}
      <span
        style={{
          fontSize: '18px',
          fontWeight: 400,
          color: id === 'work' && on ? '#f7f5f0' : '#111110',
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
          display: 'inline-block',
          position: 'relative', // sits above overlay z-stack
          zIndex: 1,
          transition: reducedMotion ? 'none' : `color 0.4s ${EASE}`,
          animation: id === 'playground' && on && !reducedMotion
            ? 'v2LabelGlitch 2.4s steps(1) infinite'
            : 'none',
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
          position: 'relative',
          zIndex: 1,
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
          to   { background-position: 0 -3px; }
        }
        @keyframes v2GridDrift {
          from { background-position: 0 0; }
          to   { background-position: 8px 8px; }
        }
        @keyframes v2PixelBlink {
          0%   { opacity: 0; }
          50%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes v2WorkSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes v2WorkDrift {
          0%   { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        @keyframes v2WorkSweep {
          0%   { background-position: 0% 0%; }
          50%  { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes v2GrainBreathe {
          0%, 100% { opacity: 0.30; }
          50%       { opacity: 0.55; }
        }
        @keyframes v2LabelGlitch {
          0%    { transform: translateX(0px); }
          8%    { transform: translateX(2px); }
          12%   { transform: translateX(-1px); }
          16%   { transform: translateX(0px); }
          80%   { transform: translateX(0px); }
          86%   { transform: translateX(-2px); }
          90%   { transform: translateX(1px); }
          94%   { transform: translateX(-1px); }
          100%  { transform: translateX(0px); }
        }
        @media (max-width: 480px) {
          .worlds-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
