import type { Metadata } from 'next'
import Link from 'next/link'
import RoomFrame from '../RoomFrame'

// AI Playground room — entered from the /v2 lobby's AI Playground world.
// Reuses the shared RoomFrame (nav, footer, bordered container). Inside, the
// container becomes the room: a pixel title + four 8-bit objects, each a
// link to a (to-be-decided) page. Matches Figma node 1:23.

export const metadata: Metadata = {
  title: 'AI Playground',
  description: 'Experiments, side projects, and AI explorations.',
}

// Each object's position is expressed as a % of the scene (aspect 1360×797),
// derived from the Figma absolute coordinates. href is a placeholder until
// the individual experiment pages are decided.
interface Toy {
  id: string
  label: string
  src: string
  href: string
  left: string
  top: string
  width: string
  bubble: string
  // which side of the toy the dialogue pointer emerges from
  bubbleDir: 'left' | 'right'
}

const TOYS: Toy[] = [
  { id: 'bunny',    label: '8-bit bunny',         src: '/images/playground/bunny.png',    href: '#',                              left: '3.9%',  top: '16.9%', width: '18.3%', bubble: "I'm just here for the vibes",                                   bubbleDir: 'right' },
  { id: 'coin',     label: 'Boundaries: an AI Playground experiment', src: '/images/playground/coin.png', href: '/v2/ai-playground/boundaries', left: '43.6%', top: '40.5%', width: '12.8%', bubble: 'Track your boundaries in one place',                           bubbleDir: 'right' },
  { id: 'building', label: '8-bit building',      src: '/images/playground/building.png', href: '#',                              left: '67.6%', top: '41.3%', width: '23.5%', bubble: 'Faster model editing\nfor prototyping\n(Coming soon)',              bubbleDir: 'left'  },
  { id: 'farewell', label: '8-bit farewell card', src: '/images/playground/farewell.png', href: '#',                              left: '22.2%', top: '62.4%', width: '14.9%', bubble: 'Create a meaningful and\nlifelong present\n(Coming soon)',          bubbleDir: 'right' },
]

// Twinkling pixel "stars" — purely decorative ambient, scattered in the gaps
// between toys. Indigo + coral tie to the lobby's AI Playground palette.
const IN = 'rgba(99,102,241,0.7)'
const CO = 'rgba(232,92,92,0.7)'
const STARS = [
  { left: '14%', top: '8%',  size: '6px', color: IN, delay: '0s',    dur: '2.4s' },
  { left: '52%', top: '14%', size: '4px', color: CO, delay: '0.5s',  dur: '3.1s' },
  { left: '88%', top: '12%', size: '5px', color: IN, delay: '1.1s',  dur: '2.7s' },
  { left: '30%', top: '34%', size: '4px', color: CO, delay: '0.8s',  dur: '3.4s' },
  { left: '62%', top: '28%', size: '6px', color: IN, delay: '0.2s',  dur: '2.9s' },
  { left: '93%', top: '40%', size: '4px', color: CO, delay: '1.4s',  dur: '2.5s' },
  { left: '8%',  top: '52%', size: '5px', color: IN, delay: '0.6s',  dur: '3.2s' },
  { left: '47%', top: '58%', size: '4px', color: CO, delay: '1.0s',  dur: '2.6s' },
  { left: '78%', top: '68%', size: '6px', color: IN, delay: '0.3s',  dur: '3.0s' },
  { left: '38%', top: '82%', size: '4px', color: IN, delay: '1.2s',  dur: '2.8s' },
  { left: '60%', top: '88%', size: '5px', color: CO, delay: '0.4s',  dur: '3.3s' },
  { left: '90%', top: '80%', size: '4px', color: IN, delay: '0.9s',  dur: '2.7s' },
]

export default function AiPlaygroundRoom() {
  return (
    <RoomFrame>
          {/* Ambient 8-bit atmosphere — pixel-grid floor + twinkling pixels.
              Purely decorative, sits behind the scene. */}
          <div className="pg-ambient" aria-hidden="true">
            <div className="pg-floor" />
            {STARS.map((s, i) => (
              <span
                key={i}
                className="pg-star"
                style={{
                  left: s.left,
                  top: s.top,
                  width: s.size,
                  height: s.size,
                  background: s.color,
                  animationDelay: s.delay,
                  animationDuration: s.dur,
                }}
              />
            ))}
          </div>

          {/* Scene — absolute on desktop, stacked grid on mobile */}
          <div className="pg-scene">
            {/* Title */}
            <img
              src="/images/playground/title.png"
              alt="AI Playground"
              className="pg-title"
            />

            {/* 8-bit object links */}
            {TOYS.map(t => (
              <Link
                key={t.id}
                href={t.href}
                aria-label={t.label}
                className={`pg-toy pg-toy--${t.id}`}
                style={{ left: t.left, top: t.top, width: t.width }}
              >
                <img src={t.src} alt={t.label} />
                <span
                  className={`pg-bubble pg-bubble--${t.bubbleDir}`}
                  aria-hidden="true"
                >
                  {t.bubble}
                </span>
              </Link>
            ))}
          </div>

      <style>{`
        /* Ambient layer — behind the scene, fills the whole room */
        .pg-ambient {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          border-radius: inherit;
          overflow: hidden;
        }
        /* Pixel-grid floor — fades up from the bottom, drifts slowly */
        .pg-floor {
          position: absolute;
          inset: 40% 0 0 0;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(99,102,241,0.06) 23px, rgba(99,102,241,0.06) 24px),
            repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(99,102,241,0.06) 23px, rgba(99,102,241,0.06) 24px);
          background-size: 24px 24px;
          -webkit-mask-image: linear-gradient(to top, #000 0%, transparent 100%);
          mask-image: linear-gradient(to top, #000 0%, transparent 100%);
        }
        .pg-star {
          position: absolute;
          display: block;
          image-rendering: pixelated;
        }
        @media (prefers-reduced-motion: no-preference) {
          .pg-floor { animation: pgFloorDrift 6s linear infinite; }
          .pg-star  { animation-name: pgTwinkle; animation-timing-function: steps(1); animation-iteration-count: infinite; }
        }
        @keyframes pgFloorDrift {
          from { background-position: 0 0, 0 0; }
          to   { background-position: 0 24px, 24px 0; }
        }
        @keyframes pgTwinkle {
          0%, 100% { opacity: 0; }
          50%      { opacity: 1; }
        }

        /* Desktop scene — aspect-locked stage, objects positioned absolutely */
        .pg-scene {
          position: relative;
          z-index: 1;
          width: 100%;
          flex: 1;
          margin-top: 8px;
          min-height: 0;
        }
        .pg-title {
          position: absolute;
          left: 50%;
          top: 2%;
          transform: translateX(-50%);
          width: 40%;
          max-width: 544px;
          height: auto;
          image-rendering: pixelated;
          pointer-events: none;
          user-select: none;
        }
        .pg-toy {
          position: absolute;
          display: block;
          line-height: 0;
          outline: none;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      filter 0.35s ease;
        }
        .pg-toy img {
          width: 100%;
          height: auto;
          image-rendering: pixelated;
          display: block;
        }
        .pg-toy:hover, .pg-toy:focus-visible {
          transform: translateY(-6px) scale(1.05);
          filter: drop-shadow(0 8px 14px rgba(17,17,16,0.14));
        }

        /* Idle float on the inner image (kept off the link so it never
           conflicts with the link's hover transform) — staggered per toy */
        @media (prefers-reduced-motion: no-preference) {
          .pg-toy img { animation: pgFloat 5s ease-in-out infinite; }
          .pg-toy:nth-child(3) img { animation-delay: 0.6s; animation-duration: 6s; }
          .pg-toy:nth-child(4) img { animation-delay: 1.1s; animation-duration: 5.5s; }
          .pg-toy:nth-child(5) img { animation-delay: 0.3s; animation-duration: 6.5s; }
          .pg-toy:hover img, .pg-toy:focus-visible img { animation-play-state: paused; }
        }
        @keyframes pgFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }

        /* ── Pokémon-style dialogue bubble ───────────────────────────────────
           Hidden by default; revealed on desktop hover/focus only.
           Pixel border via box-shadow outline trick for crisp rendering. */
        .pg-bubble {
          display: none; /* hidden on mobile — shown only on desktop hover below */
          position: absolute;
          bottom: calc(100% + 14px);
          white-space: pre-line;
          width: max-content;
          max-width: 180px;
          padding: 9px 12px 9px 12px;
          background: #fefcf6;
          color: #1a1a18;
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          font-size: 12px;
          line-height: 1.45;
          letter-spacing: 0;
          text-align: left;
          pointer-events: none;
          user-select: none;
          /* Crisp pixel border: 3px solid #1a1a18, no blur */
          box-shadow:
            0 0 0 3px #1a1a18,
            4px 4px 0 3px #1a1a18;
          image-rendering: pixelated;
          /* Hidden state */
          opacity: 0;
          transform: translateY(5px) scale(0.95);
          transform-origin: bottom left;
          transition: opacity 0.18s ease-out, transform 0.18s ease-out;
          z-index: 10;
        }
        /* Right-side pointer: bubble anchors left of toy, pointer points down-left */
        .pg-bubble--right {
          left: 0;
          transform-origin: bottom left;
        }
        .pg-bubble--right::after {
          content: '';
          position: absolute;
          bottom: -9px;
          left: 12px;
          width: 0; height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid #1a1a18;
        }
        .pg-bubble--right::before {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 13px;
          width: 0; height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid #fefcf6;
          z-index: 1;
        }
        /* Left-side pointer: bubble anchors right of toy, pointer points down-right */
        .pg-bubble--left {
          right: 0;
          left: auto;
          transform-origin: bottom right;
        }
        .pg-bubble--left::after {
          content: '';
          position: absolute;
          bottom: -9px;
          right: 14px;
          left: auto;
          width: 0; height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid #1a1a18;
        }
        .pg-bubble--left::before {
          content: '';
          position: absolute;
          bottom: -6px;
          right: 15px;
          left: auto;
          width: 0; height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid #fefcf6;
          z-index: 1;
        }

        /* Show bubble on desktop hover/focus */
        @media (min-width: 761px) {
          .pg-bubble { display: block; }
          .pg-toy:hover .pg-bubble,
          .pg-toy:focus-visible .pg-bubble {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @media (min-width: 761px) and (prefers-reduced-motion: reduce) {
          .pg-bubble { transition: none; }
        }

        /* Mobile — vertical stack, title at top, frame grows to fit */
        @media (max-width: 760px) {
          .pg-scene {
            display: flex;
            flex-direction: column;
            flex: none;
            align-items: center;
            gap: 24px;
            padding: 8px 0 24px;
          }
          .pg-title {
            position: static;
            transform: none;
            width: 70%;
            max-width: 280px;
            margin: 0 auto 4px;
          }
          .pg-toy {
            position: static !important;
            left: auto !important;
            top: auto !important;
            width: 120px !important;
            min-height: 44px; /* tap target */
          }
          .pg-toy img { animation: none !important; }
          .pg-bubble { display: none !important; }
        }
      `}</style>
    </RoomFrame>
  )
}
