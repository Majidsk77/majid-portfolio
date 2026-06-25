import type { Metadata } from 'next'
import RoomFrame from '../RoomFrame'
import Notepad from './Notepad'
import Mirror from './Mirror'
import VinylPlayer from './VinylPlayer'

// About Me room — entered from the /v2 lobby's About Me world.
// Reuses the shared RoomFrame (nav, footer, bordered container). Inside, an
// aspect-locked stage holds a warm teal line-art room that scales as one scene
// so object relationships never drift. Matches Figma node 6:2897.
// Notepad fun-fact cycling, the mirror reflection + About panel, and the vinyl
// Now Playing card are live (separate client islands).

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
  { id: 'painting', src: '/images/about/pixel-art-painting.png',    left: '12.8%', top: '15.6%', width: '26.8%', ratio: '1536 / 1024' },
]

export default function AboutRoom() {
  return (
    <RoomFrame contentStyle={{ alignItems: 'center', justifyContent: 'center' }}>
          {/* The room — a fixed-aspect-ratio stage (Figma 1360×681) centered
              inside the shared frame, scaling as one scene so object
              relationships never drift across screens */}
          <div className="ab-stage">
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

            {/* Vinyl player — hover/focus reveals a Now Playing card (client island) */}
            <VinylPlayer />

            {/* Notepad — click/Enter/Space cycles short notes (client island) */}
            <Notepad />

            {/* Mirror — click opens About panel (client island) */}
            <Mirror />
          </div>

      <style>{`
        /* Aspect-locked room stage — fixed Figma ratio (1360×681) so the whole
           scene scales uniformly inside the shared RoomFrame. On desktop the
           width is also bounded by available height so it never overflows the
           frame on short/wide windows. */
        .ab-stage {
          position: relative;
          width: 100%;
          max-width: 1360px;
          aspect-ratio: 1360 / 681;
        }
        @media (min-width: 761px) {
          .ab-stage {
            /* 1360/681 ≈ 1.997; 320px ≈ nav + footer + main padding + frame padding */
            width: min(100%, (100dvh - 320px) * 1.997);
          }
        }
        /* Teal floor line running across the room (Figma: top 649 of frame).
           The stage is centered and narrower than the room container, so the
           line is extended far past the stage on both sides; the RoomFrame's
           overflow:hidden clips it exactly to the container's inner edges,
           giving a full-width floor line regardless of stage width. */
        .ab-floor {
          position: absolute;
          left: -50vw;
          right: -50vw;
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
          /* Measured writing area of the pad PNG (1536x1024): cream paper is
             x 33.7-66.1%, y 9.8-74.8%; we sit below the spiral binding with
             padding -> inset top/right/bottom/left. */
          inset: 31% 36% 30% 36%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          /* intentionally undersized so it reads as written on the pad */
          font-size: clamp(6px, 0.6vw, 9.5px);
          line-height: 1.32;
          letter-spacing: -0.01em;
          color: #1a1a18;
          text-align: center;
          text-wrap: balance;
          overflow-wrap: break-word;
          pointer-events: none;
        }
        .ab-notepad-text > span { max-width: 100%; }

        /* Mobile — drop the fixed-aspect stage, stack the objects (not optimised).
           Let the shared frame grow/scroll instead of clipping the tall stack. */
        @media (max-width: 760px) {
          .v2-room-frame { overflow: visible; }
          .ab-stage {
            aspect-ratio: auto;
            width: 100%;
            position: static;
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
    </RoomFrame>
  )
}
