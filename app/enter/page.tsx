import PasswordForm from './PasswordForm'

interface Props {
  searchParams: Promise<{ from?: string }>
}

export default async function EnterPage({ searchParams }: Props) {
  const params = await searchParams
  const from = params.from ?? '/'

  return (
    <div className="relative min-h-screen bg-[var(--bg)] flex items-center justify-center px-6 overflow-hidden">

      {/* Background orb — matches hero aesthetic */}
      <div
        className="orb absolute pointer-events-none"
        style={{
          width: '560px',
          height: '460px',
          background:
            'radial-gradient(ellipse at 40% 40%, #c4b5f4 0%, #f0b897 50%, #e8a0b0 100%)',
          filter: 'blur(90px)',
          opacity: 0.4,
          borderRadius: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[400px]">
        <span className="block text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] mb-8">
          Protected
        </span>

        <h1
          className="font-serif italic leading-[1.05] tracking-[-0.02em] mb-4"
          style={{ fontSize: 'clamp(34px, 7vw, 52px)' }}
        >
          Enter to view work
        </h1>

        <p className="text-[14px] text-[var(--muted)] font-light leading-[1.7] mb-10 max-w-[320px]">
          These case studies are available for potential employers and collaborators.
        </p>

        <PasswordForm from={from} />
      </div>
    </div>
  )
}
