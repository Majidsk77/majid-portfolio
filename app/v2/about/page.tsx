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

// Each object is positioned as a % of the stage (derived from Figma absolute
// coords). They are future-interactive, so they render as accessible buttons
// with aria-labels even though the interactions are placeholders for now.
interface RoomObject {
  id: string
  label: string
  src: string
  left: string
  top: string
  width: string
  ratio: string  // width/height from the SVG viewBox — keeps natural proportions
}

const OBJECTS: RoomObject[] = [
  // Painting has no PNG replacement yet — keep the existing teal line-art SVG.
  { id: 'painting', label: 'Amsterdam painting',      src: '/images/about/painting.svg',              left: '19.5%', top: '20.6%', width: '11.2%', ratio: '153.814 / 143.155' },
  { id: 'vinyl',    label: 'Vinyl player on a table', src: '/images/about/pixel-art-vinyl-table.png', left: '6%',    top: '46%',   width: '42%',   ratio: '1536 / 1024' },
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
            padding: 'clamp(20px, 4vh, 48px) clamp(20px, 4vw, 56px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div className="ab-scene">
            {/* Floor line */}
            <div className="ab-floor" aria-hidden="true" />

            {/* Rug — decorative room surface beneath the table (non-interactive) */}
            <img
              src="/images/about/pixel-art-rug.png"
              alt=""
              aria-hidden="true"
              className="ab-rug"
              style={{ aspectRatio: '1536 / 1024' }}
            />

            {/* Notepad — click/Enter/Space cycles short notes (client island) */}
            <Notepad />

            {/* Mirror — hover reveals reflection, click opens About panel (client island) */}
            <Mirror />

            {/* Object buttons */}
            {OBJECTS.map(o => (
              <button
                key={o.id}
                type="button"
                className="ab-obj"
                aria-label={o.label}
                style={{ left: o.left, top: o.top, width: o.width }}
              >
                <img src={o.src} alt="" style={{ aspectRatio: o.ratio }} />
              </button>
            ))}
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
        /* Teal floor line running across the room */
        .ab-floor {
          position: absolute;
          /* bleed slightly into the container padding so it spans wider */
          left: -3%;
          right: -3%;
          top: 86%;
          height: 0;
          border-top: 1.5px solid rgba(121, 175, 182, 0.85);
        }

        /* Rug — decorative floor surface beneath the table */
        .ab-rug {
          position: absolute;
          left: 0%;
          top: 60%;
          width: 52%;
          height: auto;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        /* Shared object button — transparent, just the artwork */
        .ab-obj {
          position: absolute;
          padding: 0;
          border: none;
          background: none;
          cursor: pointer;
          line-height: 0;
          outline: none;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      filter 0.35s ease;
        }
        .ab-obj img {
          width: 100%;
          height: auto;            /* derived from aspect-ratio, never forced */
          object-fit: contain;     /* belt-and-suspenders against stretch */
          display: block;
          user-select: none;
        }
        .ab-obj:hover, .ab-obj:focus-visible {
          transform: translateY(-4px) scale(1.03);
          filter: drop-shadow(0 6px 12px rgba(121,175,182,0.30));
        }
        .ab-obj:focus-visible {
          outline: 2px solid rgba(121,175,182,0.9);
          outline-offset: 6px;
          border-radius: 6px;
        }

        /* Notepad placement + prompt text overlay.
           The PNG is landscape with wide transparent margins; the pad itself
           sits in the centre, so the box is wide and the text inset is tight. */
        .ab-notepad {
          left: 38%;
          top: 10%;
          width: 28%;
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
          .ab-rug {
            position: static !important;
            left: auto; top: auto;
            width: 240px !important;
            order: 99;            /* sit at the bottom of the stack */
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
