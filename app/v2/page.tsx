'use client'

// /v2 — Homepage redesign sandbox: three-worlds lobby concept.
// Implements the Figma "AI Playground" frame (node 1:32).
// Reuses shared Nav + Footer. Does NOT affect the production homepage.
// Branch: redesign/v2

import Link from 'next/link'
import { useState, useEffect } from 'react'
import RoomFrame from './RoomFrame'

// ── Types ─────────────────────────────────────────────────────────────────────

type WorldId = 'playground' | 'work' | 'about'

interface World {
  id: WorldId
  label: string
  href: string
}

// ── World definitions ─────────────────────────────────────────────────────────

const WORLDS: World[] = [
  { id: 'playground', label: 'AI Playground', href: '/v2/ai-playground' },
  { id: 'work',       label: 'Selected Work',  href: '#' },
  { id: 'about',      label: 'About Me',        href: '/v2/about' },
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
    borderHover: 'rgba(120, 170, 200, 0.45)',   // soft oceanic border
    bgRest:      'transparent',
    bgHover:     'rgba(236, 244, 248, 0.85)',    // light tinted base for blobs
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
// Soft editorial liquid: pastel blobs (cyan, lavender, mint, coral) drift and
// breathe over a light tinted base — oceanic, fluid, polished. Two layers
// move at different speeds/directions for depth; a whisper of grain only.
// Light mood throughout — text stays dark and readable (no inversion).

const WORK_GRAIN = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
  "<filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter>" +
  "<rect width='200' height='200' filter='url(#g)' opacity='0.4'/>" +
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
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Layer 1 — pastel blobs drifting one way */}
      <span
        style={{
          position: 'absolute',
          inset: '-25%',
          background: [
            'radial-gradient(ellipse 55% 55% at 25% 30%, rgba(120,200,225,0.55) 0%, transparent 62%)',
            'radial-gradient(ellipse 50% 60% at 78% 35%, rgba(190,170,235,0.50) 0%, transparent 62%)',
            'radial-gradient(ellipse 60% 55% at 60% 80%, rgba(150,220,190,0.48) 0%, transparent 62%)',
          ].join(', '),
          backgroundSize: '200% 200%',
          filter: 'blur(14px)',
          animation: visible ? 'v2WorkDrift 12s ease-in-out infinite alternate' : 'none',
        }}
      />
      {/* Layer 2 — coral + sky accents drifting the other way, offset phase */}
      <span
        style={{
          position: 'absolute',
          inset: '-25%',
          mixBlendMode: 'multiply',
          background: [
            'radial-gradient(ellipse 50% 55% at 80% 75%, rgba(245,165,150,0.42) 0%, transparent 60%)',
            'radial-gradient(ellipse 55% 50% at 18% 78%, rgba(140,180,235,0.42) 0%, transparent 60%)',
            'radial-gradient(ellipse 45% 45% at 50% 18%, rgba(235,200,160,0.36) 0%, transparent 62%)',
          ].join(', '),
          backgroundSize: '210% 210%',
          filter: 'blur(16px)',
          animation: visible ? 'v2WorkDrift2 16s ease-in-out infinite alternate-reverse' : 'none',
        }}
      />
      {/* Whisper of grain — very subtle texture, soft-light on the light field */}
      <span
        style={{
          position: 'absolute',
          inset: '-8px',
          backgroundImage: `url("data:image/svg+xml,${WORK_GRAIN}")`,
          backgroundSize: '200px 200px',
          mixBlendMode: 'soft-light',
          opacity: 0.12,
        }}
      />
    </span>
  )
}

// ── AboutOverlay — About Me card only ─────────────────────────────────────────
// On hover the card becomes a playful digital self-portrait built entirely from
// the word "me" — a Game Boy / 8-bit terminal field of "me"/"ME"/"Me" at mixed
// sizes and opacities, streaming across the card from different directions.
// The composition is a deterministic grid (not random) so it reads as designed
// generative typography. Pure CSS transforms + opacity; clipped to card bounds.
// Reduced motion: the same field simply fades in, static.

// Deterministic pseudo-random so server + client render identically (no
// hydration mismatch) while looking organically scattered — never gridded.
function meRand(seed: number) {
  const x = Math.sin(seed * 99.71) * 43758.5453
  return x - Math.floor(x)
}

const ME_VARIANTS = ['me', 'ME', 'Me'] as const
const ME_DRIFTS = ['v2MeDriftA', 'v2MeDriftB', 'v2MeDriftC'] as const
// No-neon pastels: blue, mint, coral, yellow, lavender
const ME_PASTELS = ['#bcd8f0', '#bfe8d4', '#f6c3b8', '#f3e4b0', '#d9cdf0'] as const

interface MeWord {
  text: string
  size: number
  top: number
  left: number
  maxOpacity: number
  drift: string
  dur: number
  delay: number
}

// A flowing current of "me" — scattered start points, mixed sizes, drifting
// diagonally (bottom-left → top-right) at staggered speeds. Organic, not a grid.
const ME_WORDS: MeWord[] = Array.from({ length: 16 }, (_, i) => {
  const a = meRand(i + 1)
  const b = meRand(i + 8.3)
  const c = meRand(i + 17.1)
  return {
    text: ME_VARIANTS[i % ME_VARIANTS.length],
    size: 12 + Math.round(a * 20),     // 12–32px
    top: 8 + b * 80,                    // scattered vertical band
    left: -6 + c * 66,                  // biased left so they travel rightward
    maxOpacity: 0.24 + a * 0.32,        // varied peak (0.24–0.56)
    drift: ME_DRIFTS[i % ME_DRIFTS.length],
    dur: 7 + b * 7,                     // 7–14s, different speeds
    delay: -(c * 13),                   // negative stagger → already mid-flow
  }
})

interface Frag {
  size: number
  top: number
  left: number
  color: string
  dur: number
  delay: number
}

// Pastel pixel fragments riding the same diagonal current — little pieces of
// digital identity. Kept sparse and low-opacity so they never get noisy.
const ME_FRAGS: Frag[] = Array.from({ length: 26 }, (_, i) => {
  const a = meRand(i + 3.7)
  const b = meRand(i + 11.9)
  const c = meRand(i + 23.4)
  return {
    size: 2 + Math.round(a * 4),        // 2–6px
    top: 6 + b * 86,
    left: -4 + c * 70,
    color: ME_PASTELS[i % ME_PASTELS.length],
    dur: 5 + a * 6,                     // 5–11s
    delay: -(b * 11),
  }
})

function AboutOverlay({ visible, reducedMotion }: { visible: boolean; reducedMotion: boolean }) {
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
        transition: 'opacity 0.45s ease',
      }}
    >
      {/* Pastel pixel fragments — the trailing "digital fragments" of the stream */}
      {ME_FRAGS.map((f, i) => (
        <span
          key={`f${i}`}
          style={{
            position: 'absolute',
            top: `${f.top}%`,
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            background: f.color,
            imageRendering: 'pixelated',
            // reduced motion: a soft, static scatter
            opacity: reducedMotion ? 0.5 : undefined,
            animation: !reducedMotion ? `v2FragDrift ${f.dur}s linear ${f.delay}s infinite` : 'none',
          }}
        />
      ))}

      {/* The current of "me" — nested: wrapper sets scattered position + peak
          opacity, inner span drifts/fades/rotates (opacity multiplies). */}
      {ME_WORDS.map((w, i) => (
        <span
          key={`w${i}`}
          style={{
            position: 'absolute',
            top: `${w.top}%`,
            left: `${w.left}%`,
            opacity: w.maxOpacity,
            lineHeight: 1,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              fontFamily: "'Courier New', ui-monospace, 'SFMono-Regular', monospace",
              fontWeight: 700,
              fontSize: `${w.size}px`,
              lineHeight: 1,
              letterSpacing: '0.05em',
              color: '#1a1a18',
              whiteSpace: 'nowrap',
              // reduced motion: composed static pose, fully shown
              transform: reducedMotion ? 'rotate(-2deg)' : undefined,
              animation: !reducedMotion ? `${w.drift} ${w.dur}s linear ${w.delay}s infinite` : 'none',
            }}
          >
            {w.text}
          </span>
        </span>
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
        boxShadow:
          id === 'playground' && on
            ? 'inset 0 0 32px rgba(99,102,241,0.10), inset 0 0 8px rgba(99,102,241,0.08)'
            : id === 'work' && on
            ? '0 8px 28px rgba(90,130,160,0.18)'
            : id === 'about' && on
            ? '0 10px 32px rgba(160,90,40,0.16)'
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
      {/* Typographic "me" field — About Me only. Rendered even under reduced
          motion so it can fade in statically on hover. */}
      {id === 'about' && (
        <AboutOverlay visible={hovered} reducedMotion={reducedMotion} />
      )}

      {/* Label — playground glitches; all worlds keep dark readable text */}
      <span
        style={{
          fontSize: '18px',
          fontWeight: 400,
          color: '#111110',
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
    <RoomFrame
      contentStyle={{
        alignItems: 'center',
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
        @keyframes v2WorkDrift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 50% 100%; }
        }
        @keyframes v2WorkDrift2 {
          0%   { background-position: 100% 50%; }
          50%  { background-position: 0% 0%; }
          100% { background-position: 50% 100%; }
        }
        /* "me" current — words drift diagonally bottom-left → top-right, fading
           in and out with a touch of rotation/scale. Three variants give the
           stream organic variety; overflow:hidden keeps it inside the card. */
        @keyframes v2MeDriftA {
          0%   { transform: translate(-26px, 26px) scale(0.85) rotate(-3deg); opacity: 0; }
          22%  { opacity: 1; }
          78%  { opacity: 1; }
          100% { transform: translate(54px, -54px) scale(1.08) rotate(3deg); opacity: 0; }
        }
        @keyframes v2MeDriftB {
          0%   { transform: translate(-18px, 22px) scale(0.95) rotate(2deg); opacity: 0; }
          26%  { opacity: 1; }
          74%  { opacity: 1; }
          100% { transform: translate(62px, -66px) scale(1.0) rotate(-4deg); opacity: 0; }
        }
        @keyframes v2MeDriftC {
          0%   { transform: translate(-34px, 30px) scale(0.8) rotate(4deg); opacity: 0; }
          30%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translate(46px, -50px) scale(1.12) rotate(-2deg); opacity: 0; }
        }
        /* Pastel pixel fragments ride the same diagonal current and fade out */
        @keyframes v2FragDrift {
          0%   { transform: translate(-12px, 12px) scale(0.8); opacity: 0; }
          30%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translate(42px, -44px) scale(1); opacity: 0; }
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
    </RoomFrame>
  )
}
