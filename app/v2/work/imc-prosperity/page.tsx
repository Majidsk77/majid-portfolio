'use client'

// V2 IMC Prosperity case study — same editorial system as Google Boba and
// Exact.com V2 pages (shared gb-* classes + style block, NavV2 flow +
// FooterV2, identical spacing, typography, image treatment and reveals).
// Content sourced from app/work/imc-prosperity — no new information invented.

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Hanken_Grotesk } from 'next/font/google'
import NavV2 from '../../NavV2'
import FooterV2 from '../../FooterV2'

const hanken = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500'], display: 'swap' })

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

function Grid2({ images, caption }: { images: { src: string; alt: string }[]; caption?: string }) {
  return (
    <Reveal>
      <div className="gb-grid2">
        {images.map(img => (
          <div key={img.src} className="gb-img" style={{ aspectRatio: '4 / 3' }}>
            <Image src={`/images/${img.src}`} alt={img.alt} fill className="gb-img-el" sizes="(max-width: 980px) 100vw, 520px" />
          </div>
        ))}
      </div>
      {caption && <p className="gb-caption gb-caption--grid">{caption}</p>}
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
    title: 'Balancing immersion with usability',
    body: 'The interface had to feel game-like without trading clarity for excitement. Working with the creative director to keep visual ambition grounded in function, I established a system of clear hierarchy and modular layouts that let players act quickly under pressure.',
  },
  {
    title: 'Designing for high information density',
    body: 'Players continuously monitored rankings, gameplay systems, and progression states. Wireframes focused heavily on scannability, reducing cognitive overload while maintaining visual excitement. Every layout decision was tested against a single question: can a player act on this in seconds?',
  },
  {
    title: 'Creating scalable UX patterns',
    body: "The competition's multi-phase structure meant the UX system had to flex across contexts rather than be rebuilt for each one. I partnered with the visual designer to ensure the visual layer extended, not replaced, the underlying UX architecture.",
  },
]

const JOURNEY = [
  'Sign-up and onboarding',
  'Tutorial round',
  'Trading rounds (algorithmic and manual challenge structure)',
  'Round results and intermission',
  'Leaderboard',
  'Crew honours and badge system',
  'Onboard advisor interaction',
]

export default function IMCProsperityV2() {
  return (
    <div className={hanken.className} style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <NavV2 flow />

      <main className="gb-main">
        {/* ── Hero ─────────────────────────────────────── */}
        <Reveal>
          <header className="gb-hero">
            <span className="gb-kicker">Case study</span>
            <h1 className="gb-title">IMC Prosperity</h1>
            <p className="gb-subtitle">A space-themed trading game for IMC&apos;s annual global student competition.</p>
            <dl className="gb-meta">
              <div><dt>Role</dt><dd>UX Designer</dd></div>
              <div><dt>Client</dt><dd>IMC</dd></div>
              <div><dt>Year</dt><dd>2025–26</dd></div>
              <div><dt>Timeline</dt><dd>4 months</dd></div>
            </dl>
          </header>
        </Reveal>

        <WideImage src="prosperity-outpost.png" alt="Prosperity 04 Mars outpost: team score card view" />

        {/* ── Overview ─────────────────────────────────── */}
        <Section kicker="Overview" heading="30,703 players. 117 countries. Launched 2026.">
          <p className="gb-body">
            Prosperity 04 launched in March 2026, the fourth edition of IMC&apos;s annual
            student trading competition, fully redesigned around a space exploration theme.
            As the sole UX Designer on the project, I owned the experience from wireframes
            through design QA, contributing to a platform that scaled to a record-breaking
            competition.
          </p>
          <div className="gb-stats">
            {[
              { value: '30,703', label: 'registered players' },
              { value: '~45%', label: 'participation increase' },
              { value: '18,803', label: 'competing teams' },
              { value: '117', label: 'countries represented' },
            ].map(s => (
              <div key={s.label} className="gb-stat">
                <span className="gb-stat-value">{s.value}</span>
                <span className="gb-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Challenge ────────────────────────────────── */}
        <Section kicker="Challenge" heading="A game that had to work.">
          <p className="gb-body">
            IMC Prosperity sits at the intersection of competitive gameplay and high-density
            financial information. The platform needed to feel immersive and engaging while
            still supporting fast comprehension, strategic decision-making, and usability
            during live trading events.
          </p>
          <p className="gb-body">
            One of the core UX challenges was balancing cinematic visual direction with
            functional clarity. Players needed to quickly navigate gameplay phases, monitor
            rankings, and understand progression systems without becoming overwhelmed by
            information complexity.
          </p>
          <p className="gb-body">
            The platform also had to hold together across multiple gameplay phases for 30,000+
            concurrent participants, from first-time tutorial players to teams competing for
            finals spots.
          </p>
        </Section>

        <Grid2
          images={[
            { src: 'prosperity-island.png', alt: 'Prosperity 3: island world theme' },
            { src: 'prosperity-outpost.png', alt: 'Prosperity 04: space exploration theme' },
          ]}
          caption="From Prosperity 3's island world to the space exploration theme of Prosperity 04."
        />

        {/* ── Key design decisions ─────────────────────── */}
        <Section kicker="Design decisions" heading="Three decisions that shaped the experience.">
          <div className="gb-decisions">
            {DECISIONS.map(d => (
              <div key={d.title} className="gb-decision">
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Process ──────────────────────────────────── */}
        <Section kicker="Process" heading="Wireframes first, then the universe.">
          <p className="gb-body">
            I joined after the discovery phase and took ownership of wireframes for the core
            game flows, working closely with developers to ensure feasible implementation from
            the start.
          </p>
          <p className="gb-body">
            I focused on simplifying gameplay navigation, clarifying progression systems, and
            improving information hierarchy across multiple event phases. Early wireframes
            explored ways to balance high-density trading information with approachable
            interaction patterns for a global audience.
          </p>
        </Section>

        <WideImage
          src="prosperity-tutorial.png"
          alt="Prosperity tutorial round screen"
          caption="Tutorial round: introducing new players to game mechanics before live rounds begin."
        />

        <Reveal>
          <ul className="gb-list">
            {JOURNEY.map(item => <li key={item}>{item}</li>)}
          </ul>
        </Reveal>

        <Grid2
          images={[
            { src: 'prosperity-leaderboard.png', alt: 'Prosperity leaderboard screen' },
            { src: 'prosperity-badge.png', alt: 'First Responder badge: crew honours system' },
          ]}
          caption="Leaderboard structure and the crew honours badge system."
        />

        <WideImage
          src="prosperity-advisor.png"
          alt="The onboard advisor giving strategic guidance"
          caption="The onboard advisor: a narrative feature that gives teams strategic guidance during rounds."
        />

        {/* ── Final experience ─────────────────────────── */}
        <Section kicker="Final experience" heading="Dense information, immersive skin.">
          <p className="gb-body">
            The solution was to use the space narrative as a framing layer rather than a
            visual override. The UI prioritised legibility and structure: clean card
            components, clear hierarchy, consistent round navigation, wrapped in a world
            that felt genuinely new.
          </p>
          <p className="gb-body">
            Working closely with the visual designer, we iterated on structure before applying
            the visual layer, making sure the information hierarchy held up before the
            world-building was applied on top.
          </p>
        </Section>

        <WideImage
          src="prosperity-countdown.png"
          alt="Phase countdown screen"
          caption="Phase countdown and round holding screens: moments of tension built into the experience."
        />

        <Grid2
          images={[
            { src: 'prosperity-signup.png', alt: 'Join the Challenge sign-up screen' },
            { src: 'prosperity-holding.png', alt: 'Round holding screen between phases' },
          ]}
          caption="Sign-up and round holding screens: friction reduction at entry, tension between rounds."
        />

        {/* ── Reflection ───────────────────────────────── */}
        <Section kicker="Reflection" heading="Clarity under pressure.">
          <p className="gb-body">
            Designing for this competition made the tension between immersion and usability
            concrete. With 30,000 players navigating live trading logic under time pressure,
            the decisions that mattered most weren&apos;t about aesthetics. They were about
            clarity, speed, and structure.
          </p>
          <p className="gb-body">
            It also reinforced that systems built for scale need modular thinking from the
            start. Trying to retrofit coherence into a multi-phase experience is expensive;
            designing it in from wireframes is not.
          </p>
        </Section>

        {/* ── Bottom navigation ────────────────────────── */}
        <Reveal>
          <nav className="gb-nav" aria-label="Case study navigation">
            <Link href="/v2/selected-work" className="gb-nav-back">← Back to Selected Work</Link>
            <Link href="/v2/work/google-boba" className="gb-nav-next">
              <span className="gb-nav-next-label">Next project</span>
              <span className="gb-nav-next-name">Google Boba →</span>
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
          padding: clamp(24px, 4vh, 44px) clamp(20px, 5vw, 48px) clamp(40px, 6vh, 72px);
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

        .gb-stats { display: flex; flex-wrap: wrap; gap: clamp(28px, 6vw, 72px); margin-top: 30px; }
        .gb-stat { display: flex; flex-direction: column; gap: 4px; }
        .gb-stat-value { font-size: clamp(30px, 4vw, 44px); font-weight: 500; letter-spacing: -0.02em; color: #111110; line-height: 1; }
        .gb-stat-label { font-size: 13px; color: #8a8a85; }

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

        .gb-grid2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin: clamp(40px, 7vh, 80px) 0 0;
        }

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
          background: #90bce2;
        }

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
          outline: 2px solid rgba(144,188,226,0.7); outline-offset: 4px; border-radius: 6px;
        }

        @media (max-width: 640px) {
          .gb-grid2 { grid-template-columns: 1fr; gap: 12px; }
          .gb-stats { gap: clamp(20px, 8vw, 40px); }
        }
      `}</style>
    </div>
  )
}
