import type { Metadata } from 'next'
import Link from 'next/link'
import { Hanken_Grotesk } from 'next/font/google'
import NavV2 from '../NavV2'
import FooterV2 from '../FooterV2'

// AI Playground room — entered from the /v2 lobby's AI Playground world.
// Reuses the /v2 nav, footer, and outer framed container. Inside, the
// container becomes the room: a pixel title + four 8-bit objects, each a
// link to a (to-be-decided) page. Matches Figma node 1:23.

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

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
}

const TOYS: Toy[] = [
  { id: 'bunny',    label: '8-bit bunny',         src: '/images/playground/bunny.png',    href: '#', left: '3.9%',  top: '16.9%', width: '18.3%' },
  { id: 'coin',     label: '8-bit alert coin',    src: '/images/playground/coin.png',     href: '#', left: '43.6%', top: '40.5%', width: '12.8%' },
  { id: 'building', label: '8-bit building',      src: '/images/playground/building.png', href: '#', left: '67.6%', top: '41.3%', width: '23.5%' },
  { id: 'farewell', label: '8-bit farewell card', src: '/images/playground/farewell.png', href: '#', left: '22.2%', top: '62.4%', width: '14.9%' },
]

export default function AiPlaygroundRoom() {
  return (
    <div
      className={hanken.className}
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
      }}
    >
      <NavV2 />

      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(88px, 11vh, 108px) clamp(16px, 2.8vw, 40px) clamp(16px, 2vh, 32px)',
          minHeight: 0,
        }}
      >
        {/* The room — same framed container as the lobby */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1360px',
            alignSelf: 'stretch',
            border: '1px solid rgba(217, 217, 217, 0.7)',
            borderRadius: '30px',
            padding: 'clamp(20px, 4vh, 48px) clamp(20px, 4vw, 56px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Back to lobby */}
          <Link href="/v2" className="pg-back" aria-label="Back to lobby">
            <span aria-hidden="true">←</span> Lobby
          </Link>

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
                className="pg-toy"
                style={{ left: t.left, top: t.top, width: t.width }}
              >
                <img src={t.src} alt={t.label} />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <FooterV2 />

      <style>{`
        /* Back-to-lobby pill */
        .pg-back {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 30px;
          border: 1px solid rgba(217, 217, 217, 0.7);
          font-size: 14px;
          color: #111110;
          text-decoration: none;
          z-index: 2;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .pg-back:hover { border-color: rgba(217,217,217,1); background: rgba(17,17,16,0.03); }

        /* Desktop scene — aspect-locked stage, objects positioned absolutely */
        .pg-scene {
          position: relative;
          width: 100%;
          flex: 1;
          margin-top: 8px;
          min-height: 0;
        }
        .pg-title {
          position: absolute;
          left: 30%;
          top: 1.6%;
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

        /* Mobile — drop the absolute stage, stack into a clean grid */
        @media (max-width: 760px) {
          .pg-scene {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 28px;
            padding: 8px 0 12px;
          }
          .pg-title {
            position: static;
            width: 80%;
            max-width: 320px;
            margin: 0 auto 4px;
          }
          .pg-toy {
            position: static !important;
            left: auto !important;
            top: auto !important;
            width: 130px !important;
          }
          .pg-toy img { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
