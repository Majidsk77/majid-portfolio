'use client'

// V2 Google Boba case study — a fresh editorial recomposition of the existing
// case study content (app/work/google-boba). Reuses the /v2 nav + footer and
// design language, but flows naturally with content (no fixed-height room).
// Content is reorganized/condensed only — no new project information invented.

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Hanken_Grotesk } from 'next/font/google'
import NavV2 from '../../NavV2'
import FooterV2 from '../../FooterV2'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

// ── Subtle scroll reveal — fade + slight rise, respects reduced motion ────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) { setReduced(true); setShown(true); return }
    const el = ref.current
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { setShown(true); io.disconnect() } }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    if (el) io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: reduced ? 'none' : shown ? 'translateY(0)' : 'translateY(16px)',
        transition: reduced ? 'none' : `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ── Building blocks ───────────────────────────────────────────────────────────
function WideImage({ src, alt, caption, ratio = '16 / 9' }: { src: string; alt: string; caption?: string; ratio?: string }) {
  return (
    <Reveal>
      <figure className="gb-figure">
        <div className="gb-img" style={{ aspectRatio: ratio }}>
          <Image src={`/images/${src}`} alt={alt} fill className="gb-img-el" sizes="(max-width: 980px) 100vw, 1080px" />
        </div>
        {caption && <figcaption className="gb-caption">{caption}</figcaption>}
      </figure>
    </Reveal>
  )
}

function Section({ kicker, heading, children }: { kicker: string; heading: string; children?: React.ReactNode }) {
  return (
    <Reveal>
      <section className="gb-section">
        <span className="gb-kicker">{kicker}</span>
        <h2 className="gb-heading">{heading}</h2>
        {children}
      </section>
    </Reveal>
  )
}

const DECISIONS = [
  {
    title: 'Extend Material 3 into physical space',
    body: 'Boba screens are architectural, not web or mobile. Rather than overriding Google’s design language, I extended it — adapting tokens, shapes, and components for spatial scale without breaking the system logic.',
  },
  {
    title: 'Tokens as the scaling mechanism',
    body: 'The token layer carries all the context-switching: dark and light environments, varying screen sizes and placements. Components stay stable; tokens adapt them. That architecture is what made the system scalable, not just flexible.',
  },
  {
    title: 'Scope clarity in a live project',
    body: 'Joining mid-phase demanded tight scope. The system ended at the component level; the template layer belonged to the design system specialist I collaborated with. Respecting that boundary let us ship a clean v1.0.',
  },
]

const FOUNDATION = [
  'Core system tokens — color, spacing, shape, motion',
  'Component foundations and variant structures',
  'A Material 3 extension for spatial, physical-screen contexts',
  'An organic shape language that sets Boba apart from standard Material surfaces',
]

export default function GoogleBobaV2() {
  return (
    <div className={hanken.className} style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <NavV2 />

      <main className="gb-main">
        {/* ── Hero ─────────────────────────────────────── */}
        <Reveal>
          <header className="gb-hero">
            <span className="gb-kicker">Case study</span>
            <h1 className="gb-title">Google Boba</h1>
            <p className="gb-subtitle">A design system for Google&apos;s interactive event spaces.</p>
            <dl className="gb-meta">
              <div><dt>Role</dt><dd>Design Systems Designer</dd></div>
              <div><dt>Client</dt><dd>Google</dd></div>
              <div><dt>Year</dt><dd>2026</dd></div>
            </dl>
          </header>
        </Reveal>

        <WideImage src="boba-hero.png" alt="Google Boba kiosk screen: 'Discover how we're making AI accessible'" />

        {/* ── Overview ─────────────────────────────────── */}
        <Section kicker="Overview" heading="Launched in Paris & Munich. Rolling out globally.">
          <p className="gb-body">
            The Google Boba design system launched across event spaces in Paris and Munich in
            February 2026 — the first release of a scalable foundation that carries Google&apos;s
            design principles into physical, interactive environments. I owned the system
            architecture: the tokens, components, and spatial variants behind every Boba screen.
          </p>
          <div className="gb-stats">
            {[
              { value: '2', label: 'cities at launch' },
              { value: 'v1.0', label: 'foundation release' },
              { value: '2026', label: 'global rollout ongoing' },
            ].map(s => (
              <div key={s.label} className="gb-stat">
                <span className="gb-stat-value">{s.value}</span>
                <span className="gb-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Challenge ────────────────────────────────── */}
        <Section kicker="Challenge" heading="Standard tools weren't built for this.">
          <p className="gb-body">
            Boba screens are large-format touchscreens that vary widely in scale, layout, and
            physical context. Material 3 alone couldn&apos;t carry that — its components were
            never designed with spatial environments in mind. The system had to stay
            unmistakably Google while adapting to a fundamentally different physical-digital space.
          </p>
        </Section>

        <WideImage
          src="boba-people.png"
          alt="People interacting with Boba screens at a Google event space"
          caption="Boba screens vary significantly in size and physical context."
        />

        {/* ── Process ──────────────────────────────────── */}
        <Section kicker="Process" heading="Owning the system foundation.">
          <p className="gb-body">
            I joined in a later phase and took ownership of the v1.0 design system foundation —
            defining the tokens, components, and variants needed to scale across event-space
            screens, working closely with the specialist who led the template layer.
          </p>
        </Section>

        <Reveal>
          <div className="gb-grid3">
            {[
              { src: 'boba-components-1.png', alt: 'Boba component sheet: slider variants' },
              { src: 'boba-components-2.png', alt: 'Boba component sheet: chips' },
              { src: 'boba-components-3.png', alt: 'Boba component sheet: organic shape tokens' },
            ].map(img => (
              <div key={img.src} className="gb-img" style={{ aspectRatio: '4 / 3' }}>
                <Image src={`/images/${img.src}`} alt={img.alt} fill className="gb-img-el" sizes="(max-width: 980px) 100vw, 360px" />
              </div>
            ))}
          </div>
          <p className="gb-caption gb-caption--grid">Core definitions: slider variants, chips, and organic shape tokens.</p>
        </Reveal>

        <Reveal>
          <ul className="gb-list">
            {FOUNDATION.map(item => <li key={item}>{item}</li>)}
          </ul>
        </Reveal>

        {/* ── Design decisions ─────────────────────────── */}
        <Section kicker="Design decisions" heading="Three decisions that shaped the system.">
          <div className="gb-decisions">
            {DECISIONS.map(d => (
              <div key={d.title} className="gb-decision">
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Final solution ───────────────────────────── */}
        <Section kicker="Final solution" heading="A system built for space.">
          <p className="gb-body">
            The result: a reusable design system tailored to interactive event environments. An
            organic shape language — soft blobs and rounded forms — distinguishes Boba from
            standard Material surfaces, while a purple token system flexes across dark and light
            screens. It shipped at v1.0 as the foundation for every future Boba deployment.
          </p>
        </Section>

        <WideImage
          src="boba-template.png"
          alt="Template showing components across screen configurations"
          caption="The template layer: components adapting across screen configurations."
        />

        {/* ── Reflection ───────────────────────────────── */}
        <Section kicker="Reflection" heading="Coherence over novelty.">
          <p className="gb-body">
            The constraint here wasn&apos;t freedom — it was coherence. Extending Material 3 into a
            new physical context meant knowing exactly which decisions were mine and which had to
            stay anchored to Google&apos;s design language. Joining mid-phase also made scope
            clarity concrete as a design skill: a system that tries to do everything ends up
            owning nothing.
          </p>
        </Section>

        {/* ── Bottom navigation ────────────────────────── */}
        <Reveal>
          <nav className="gb-nav" aria-label="Case study navigation">
            <Link href="/v2/selected-work" className="gb-nav-back">← Back to Selected Work</Link>
            <Link href="/v2/selected-work" className="gb-nav-next">
              <span className="gb-nav-next-label">Next project</span>
              <span className="gb-nav-next-name">IMC Prosperity →</span>
            </Link>
          </nav>
        </Reveal>
      </main>

      <FooterV2 />

      <style>{`
        .gb-main {
          flex: 1;
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          padding: clamp(104px, 13vh, 132px) clamp(20px, 5vw, 48px) clamp(40px, 6vh, 72px);
        }
        .gb-kicker {
          display: block;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #9a9a94;
          margin-bottom: 16px;
        }
        /* Hero */
        .gb-hero { max-width: 760px; margin-bottom: clamp(36px, 5vh, 56px); }
        .gb-title {
          font-size: clamp(40px, 7vw, 76px);
          font-weight: 500;
          line-height: 1.02;
          letter-spacing: -0.03em;
          color: #111110;
          margin: 0 0 18px;
        }
        .gb-subtitle {
          font-size: clamp(17px, 2vw, 21px);
          line-height: 1.5;
          color: #4a4a47;
          margin: 0 0 32px;
          max-width: 540px;
        }
        .gb-meta { display: flex; flex-wrap: wrap; gap: clamp(28px, 5vw, 64px); margin: 0; }
        .gb-meta div { display: flex; flex-direction: column; gap: 3px; }
        .gb-meta dt { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #a8a8a3; }
        .gb-meta dd { margin: 0; font-size: 15px; color: #111110; }

        /* Sections */
        .gb-section { max-width: 660px; margin: clamp(72px, 11vh, 132px) auto clamp(28px, 4vh, 44px); }
        .gb-heading {
          font-size: clamp(26px, 3.4vw, 38px);
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #111110;
          margin: 0 0 22px;
        }
        .gb-body { font-size: 17px; line-height: 1.75; color: #56564f; margin: 0 0 18px; }

        /* Stats */
        .gb-stats { display: flex; flex-wrap: wrap; gap: clamp(28px, 6vw, 72px); margin-top: 30px; }
        .gb-stat { display: flex; flex-direction: column; gap: 4px; }
        .gb-stat-value { font-size: clamp(30px, 4vw, 44px); font-weight: 500; letter-spacing: -0.02em; color: #111110; line-height: 1; }
        .gb-stat-label { font-size: 13px; color: #8a8a85; }

        /* Figures / images */
        .gb-figure { margin: clamp(40px, 7vh, 80px) 0; }
        .gb-img {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 18px;
          background: #ece7df;
          border: 1px solid rgba(17,17,16,0.06);
        }
        .gb-img-el { object-fit: cover; object-position: top; }
        .gb-caption { margin-top: 14px; font-size: 13px; line-height: 1.5; color: #8a8a85; max-width: 660px; }
        .gb-caption--grid { margin-top: 16px; }

        .gb-grid3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin: clamp(40px, 7vh, 80px) 0 0;
        }

        /* Foundation list */
        .gb-list {
          list-style: none;
          padding: 0;
          margin: 36px auto 0;
          max-width: 660px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .gb-list li {
          position: relative;
          padding-left: 22px;
          font-size: 16px;
          line-height: 1.6;
          color: #56564f;
        }
        .gb-list li::before {
          content: '';
          position: absolute;
          left: 2px;
          top: 9px;
          width: 7px;
          height: 7px;
          border-radius: 2px;
          background: #c9b9ef;
        }

        /* Decisions */
        .gb-decisions { display: flex; flex-direction: column; gap: 0; }
        .gb-decision {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
          padding: 26px 0;
          border-top: 1px solid rgba(17,17,16,0.10);
        }
        .gb-decision h3 { font-size: 17px; font-weight: 500; color: #111110; margin: 0; letter-spacing: -0.01em; }
        .gb-decision p { font-size: 15.5px; line-height: 1.7; color: #6b6b64; margin: 0; }

        /* Bottom nav */
        .gb-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-top: clamp(64px, 10vh, 120px);
          padding-top: 28px;
          border-top: 1px solid rgba(17,17,16,0.10);
        }
        .gb-nav-back {
          font-size: 15px; color: #56564f; text-decoration: none;
          transition: color 0.2s ease;
        }
        .gb-nav-back:hover { color: #111110; }
        .gb-nav-next { display: flex; flex-direction: column; gap: 3px; text-align: right; text-decoration: none; }
        .gb-nav-next-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #a8a8a3; }
        .gb-nav-next-name { font-size: 19px; font-weight: 500; color: #111110; transition: transform 0.2s ease; }
        .gb-nav-next:hover .gb-nav-next-name { transform: translateX(3px); }
        .gb-nav-back:focus-visible, .gb-nav-next:focus-visible {
          outline: 2px solid rgba(121,175,182,0.7); outline-offset: 4px; border-radius: 6px;
        }

        @media (max-width: 640px) {
          .gb-grid3 { grid-template-columns: 1fr; gap: 12px; }
        }
      `}</style>
    </div>
  )
}
