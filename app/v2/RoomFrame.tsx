import type { CSSProperties, ReactNode } from 'react'
import { Hanken_Grotesk } from 'next/font/google'
import NavV2 from './NavV2'
import FooterV2 from './FooterV2'

// Shared outer frame for every /v2 room — the lobby (/v2), /v2/about,
// /v2/ai-playground, and future /v2/selected-work. Single source of truth for:
//   - the page wrapper (height, background, scroll behavior)
//   - spacing from the nav and footer (the <main> padding)
//   - the rounded bordered container (width, max-width, border, radius,
//     padding, stretch-to-fill height, overflow)
//
// Rooms supply ONLY their inner content as children. `contentStyle` lets a room
// tune content layout (e.g. centering, gap) WITHOUT changing any of the
// standardized frame dimensions above. Do not move sizing values back into the
// individual pages — change them here so every room stays in lockstep.

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

export default function RoomFrame({
  children,
  contentStyle,
}: {
  children: ReactNode
  contentStyle?: CSSProperties
}) {
  return (
    <div
      className={hanken.className}
      style={{
        // Exact viewport height so nav + room + footer fit without page scroll
        // on desktop; the container scrolls on short/mobile viewports instead.
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
        overflowY: 'auto',
      }}
    >
      <NavV2 />

      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Top clears the fixed nav (~88px); vh values scale with height.
          padding: 'clamp(88px, 11vh, 108px) clamp(16px, 2.8vw, 40px) clamp(16px, 2vh, 32px)',
          minHeight: 0,
        }}
      >
        {/* Outer rounded container — matches Figma panel (1360px, border, radius 30) */}
        <div
          className="v2-room-frame"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1360px',
            // Stretch to fill all available height between nav offset and footer.
            alignSelf: 'stretch',
            border: '1px solid rgba(217, 217, 217, 0.7)',
            borderRadius: '30px',
            overflow: 'hidden',
            padding: 'clamp(28px, 5vh, 64px) clamp(28px, 5vw, 72px)',
            display: 'flex',
            flexDirection: 'column',
            ...contentStyle,
          }}
        >
          {children}
        </div>
      </main>

      <FooterV2 />
    </div>
  )
}
