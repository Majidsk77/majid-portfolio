import type { Metadata } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
import PasswordForm from './PasswordForm'

// Password gate — redesigned in the /v2 portfolio language: the same bordered,
// rounded RoomFrame-style panel, Hanken Grotesk type, warm cream backdrop.
// Intentionally without the /v2 nav/footer — a locked door shouldn't surface
// navigation back into the protected work. Auth logic is unchanged.

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Almost inside',
  description: 'A little locked door before the work.',
}

interface Props {
  searchParams: Promise<{ from?: string }>
}

export default async function EnterPage({ searchParams }: Props) {
  const params = await searchParams
  const from = params.from ?? '/'

  return (
    <div
      className={hanken.className}
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        padding: 'clamp(20px, 5vh, 48px) clamp(16px, 2.8vw, 40px)',
      }}
    >
      {/* Bordered room panel — same container language as the /v2 rooms */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1360px',
          minHeight: 'min(78vh, 660px)',
          border: '1px solid rgba(217, 217, 217, 0.7)',
          borderRadius: '30px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(28px, 5vh, 64px) clamp(28px, 5vw, 72px)',
        }}
      >
        {/* Warm ambient wash — the glow of a room behind the door */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(58% 54% at 50% 42%, rgba(246, 184, 148, 0.16), transparent 72%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '430px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#8a8a85',
              marginBottom: '20px',
            }}
          >
            Private studio
          </span>

          <h1
            style={{
              fontSize: 'clamp(26px, 3.4vw, 40px)',
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: '#111110',
              margin: 0,
            }}
          >
            This project lives behind a little door.
          </h1>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#6b6b67',
              margin: '16px 0 36px',
              maxWidth: '360px',
            }}
          >
            One quick step before you step inside — these case studies are shared
            with potential employers and collaborators.
          </p>

          <PasswordForm from={from} />
        </div>
      </div>
    </div>
  )
}
