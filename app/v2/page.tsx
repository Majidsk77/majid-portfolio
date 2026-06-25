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
// The portrait enters like a small reveal rather than a decorative effect:
// quick ease-out, a warm halo, and two restrained pixel sparkles.

function AboutOverlay({ visible, reducedMotion }: { visible: boolean; reducedMotion: boolean }) {
  const transition = reducedMotion
    ? 'none'
    : `opacity 240ms ${EASE}, transform 240ms ${EASE}`

  return (
    <span
      aria-hidden="true"
      className="v2-about-portrait"
      style={{
        position: 'absolute',
        inset: '39px 0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: 'none',
        borderRadius: 'inherit',
      }}
    >
      <span
        className="v2-about-glow"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.9)',
          transition,
        }}
      />
      <span
        className="v2-about-frame"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(-3px) scale(1)' : 'translateY(0) scale(0.96)',
          transition,
        }}
      >
        <img
          src="/images/pixel-art-mirror-person-smiling-thumbnail.png"
          alt=""
          className="v2-about-image"
        />
      </span>
      <span
        className="v2-about-spark v2-about-spark-a"
        style={{
          opacity: visible ? 1 : 0,
          animation: visible && !reducedMotion ? 'v2AboutTwinkle 1.7s steps(2, end) 220ms infinite' : 'none',
        }}
      />
      <span
        className="v2-about-spark v2-about-spark-b"
        style={{
          opacity: visible ? 0.72 : 0,
          animation: visible && !reducedMotion ? 'v2AboutTwinkle 1.7s steps(2, end) 950ms infinite' : 'none',
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
      {/* Portrait reveal — About Me only. Reduced motion reveals it statically. */}
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
        /* ── About card: portrait reveal ─────────────────────────────── */
        .v2-about-glow {
          position: absolute;
          width: 78px;
          height: 78px;
          border-radius: 10px;
          background: rgba(246, 184, 148, 0.22);
          box-shadow: 0 0 18px rgba(221, 132, 83, 0.18);
        }
        .v2-about-frame {
          position: relative;
          width: 58px;
          height: 86px;
          overflow: hidden;
          border: 1px solid rgba(160, 90, 40, 0.24);
          border-radius: 7px;
          background: #fffdfa;
          box-shadow:
            0 5px 12px rgba(112, 66, 39, 0.13),
            inset 0 0 0 2px rgba(255, 247, 238, 0.8);
          will-change: transform, opacity;
        }
        .v2-about-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          image-rendering: pixelated;
        }
        .v2-about-spark {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #e2a263;
          box-shadow:
            0 -3px 0 #e2a263,
            0 3px 0 #e2a263,
            -3px 0 0 #e2a263,
            3px 0 0 #e2a263;
          transition: opacity 180ms ease-out;
        }
        .v2-about-spark-a { left: calc(50% - 42px); top: 19px; }
        .v2-about-spark-b { left: calc(50% + 37px); top: 54px; }
        @keyframes v2AboutTwinkle {
          0%, 48%, 100% { transform: scale(1); opacity: 0.72; }
          50%, 72% { transform: scale(1.35); opacity: 0.18; }
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
