import type { Metadata } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
import NavV2 from '../NavV2'
import FooterV2 from '../FooterV2'
import Notepad from './Notepad'
import Mirror from './Mirror'

// About Me room — entered from the /v2 lobby's About Me world.
// Reuses the /v2 nav, footer, and framed container. Inside, a warm teal
// line-art room with objects to discover. Matches Figma node 6:2897.
// Notepad fun-fact cycling (Notepad.tsx) and the mirror reflection + About
// panel (Mirror.tsx) are live. Remaining object interactions (vinyl song
// hover, painting note reveal) are intentionally NOT built yet.

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'About Me',
  description: 'A small room of objects — a little about who I am.',
}

// Decorative (non-interactive) room art. Positions/sizes are % of the
// container box, mapped directly from the Figma frame (8:3168) — the image
// boxes there match the PNGs' native ratios, so this reproduces the layout
// 1:1. Interactive objects (notepad, mirror) are separate client islands.
// Listed back-to-front so the table sits on the rug, etc.
interface RoomArt {
  id: string
  src: string
  left: string
  top: string
  width: string
  ratio: string
}

const ART: RoomArt[] = [
  { id: 'rug',      src: '/images/about/pixel-art-rug.png',         left: '1.8%',  top: '62.1%', width: '50.7%', ratio: '1536 / 1024' },
  { id: 'vinyl',    src: '/images/about/pixel-art-vinyl-table.png', left: '1.8%',  top: '40.8%', width: '49%',   ratio: '1536 / 1024' },
  { id: 'painting', src: '/images/about/pixel-art-painting.png',    left: '12.8%', top: '15.6%', width: '26.8%', ratio: '1536 / 1024' },
]

export default function AboutRoom() {
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
            /* no padding — room art is positioned against the full box, as in Figma */
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div className="ab-scene">
            {/* Floor line */}
            <div className="ab-floor" aria-hidden="true" />

            {/* Decorative room art — non-interactive, grounded (back-to-front) */}
            {ART.map(a => (
              <img
                key={a.id}
                src={a.src}
                alt=""
                aria-hidden="true"
                className="ab-art"
                style={{ left: a.left, top: a.top, width: a.width, aspectRatio: a.ratio }}
              />
            ))}

            {/* Notepad — click/Enter/Space cycles short notes (client island) */}
            <Notepad />

            {/* Mirror — click opens About panel (client island) */}
            <Mirror />
          </div>
        </div>
      </main>

      <FooterV2 />

      <style>{`
        .ab-scene {
          position: relative;
          width: 100%;
          flex: 1;
          min-height: 0;
        }
        /* Teal floor line running across the room (Figma: top 649 of frame) */
        .ab-floor {
          position: absolute;
          left: 0;
          right: 0;
          top: 76.5%;
          height: 0;
          border-top: 1.5px solid rgba(121, 175, 182, 0.85);
        }

        /* Decorative room art — positioned, grounded, never interactive */
        .ab-art {
          position: absolute;
          height: auto;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
        }

        /* Shared interactive object button — transparent, just the artwork.
           No hover lift/elevation: objects stay grounded in the room. */
        .ab-obj {
          position: absolute;
          padding: 0;
          border: none;
          background: none;
          cursor: pointer;
          line-height: 0;
          outline: none;
        }
        .ab-obj img {
          width: 100%;
          height: auto;            /* derived from aspect-ratio, never forced */
          object-fit: contain;     /* belt-and-suspenders against stretch */
          display: block;
          user-select: none;
        }
        .ab-obj:focus-visible {
          outline: 2px solid rgba(121,175,182,0.9);
          outline-offset: 6px;
          border-radius: 6px;
        }

        /* Notepad placement + prompt text overlay (Figma 8:3301).
           Landscape PNG with margins; pad sits centre, so inset is tight. */
        .ab-notepad {
          left: 38.2%;
          top: 16.9%;
          width: 24.9%;
          z-index: 1;
        }
        .ab-notepad-text {
          position: absolute;
          /* writable area of the pad within the PNG (centre, below the binding) */
          inset: 34% 38% 22% 38%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          font-size: clamp(9px, 0.95vw, 14px);
          line-height: 1.25;
          color: #111110;
          text-align: center;
          pointer-events: none;
        }

        /* Mobile — drop the absolute stage, stack the objects */
        @media (max-width: 760px) {
          .ab-scene {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 32px;
            padding: 12px 0;
          }
          .ab-floor { display: none; }
          .ab-art {
            position: static !important;
            left: auto !important; top: auto !important;
            width: 260px !important;
          }
          .ab-obj {
            position: static !important;
            left: auto !important;
            top: auto !important;
            width: 220px !important;
          }
          .ab-notepad { width: 200px !important; }
          .ab-notepad-text { font-size: 13px; }
        }
      `}</style>
    </div>
  )
}
