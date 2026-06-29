'use client'

// Boundaries — an AI Playground experiment case study. Lighter and more playful
// than the main work case studies: phone-screen gallery, indigo playground
// accent, subtle reveals. Reuses the /v2 nav + footer, flows with content.
// Content is provided verbatim by the project owner — no facts invented.

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Hanken_Grotesk } from 'next/font/google'
import NavV2 from '../../NavV2'
import FooterV2 from '../../FooterV2'

const hanken = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500'], display: 'swap' })

const PROTOTYPE_URL = 'https://boundaries-app-five.vercel.app/'
const PHONE_RATIO = '1206 / 2622'
const IMG = '/images/playground/boundaries'

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
      es => es.forEach(e => { if (e.isIntersecting) { setShown(true); io.disconnect() } }),
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

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bd-phone" style={{ aspectRatio: PHONE_RATIO }}>
      <Image src={`${IMG}/${src}`} alt={alt} fill className="bd-phone-img" sizes="(max-width: 700px) 70vw, 280px" />
    </div>
  )
}

const FEATURES = [
  { title: 'Habit boundary tracking', body: 'Track the things you want to stop doing — social media, alcohol, impulse buys, anything.' },
  { title: 'Streaks & monthly achievements', body: 'Stay motivated with streaks and monthly milestones.' },
  { title: 'Immediate distraction tools', body: 'A quick redirect the moment temptation strikes.' },
  { title: 'Breathing exercises', body: 'Calm the urge in the moment.' },
  { title: 'Physical challenges', body: 'Move through a craving instead of giving in.' },
  { title: 'Friend accountability', body: 'Add friends to stay on track and celebrate progress together.' },
]

function Section({ kicker, heading, children }: { kicker: string; heading: string; children?: React.ReactNode }) {
  return (
    <Reveal>
      <section className="bd-section">
        <span className="bd-kicker">{kicker}</span>
        <h2 className="bd-heading">{heading}</h2>
        {children}
      </section>
    </Reveal>
  )
}

export default function BoundariesPage() {
  return (
    <div className={hanken.className} style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <NavV2 flow />

      <main className="bd-main">
        {/* ── Hero ─────────────────────────────────────── */}
        <Reveal>
          <header className="bd-hero">
            <span className="bd-kicker">AI Playground · Experiment</span>
            <h1 className="bd-title">Boundaries</h1>
            <p className="bd-subtitle">
              An experimental mobile app for building healthier boundaries around habits people want to stop.
            </p>
            <a className="bd-cta" href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer">
              Open Prototype <span className="bd-cta-arrow" aria-hidden="true">↗</span>
            </a>
          </header>
        </Reveal>

        {/* Device showcase */}
        <Reveal>
          <div className="bd-stage">
            <div className="bd-stage-phone bd-stage-side"><Phone src="Chip-onboarding-1.PNG" alt="Boundaries onboarding screen" /></div>
            <div className="bd-stage-phone bd-stage-center"><Phone src="Chip-homepage.PNG" alt="Boundaries home screen with active boundaries" /></div>
            <div className="bd-stage-phone bd-stage-side"><Phone src="Chip-existingchip-overview.PNG" alt="Boundaries habit overview screen" /></div>
          </div>
        </Reveal>

        {/* ── Overview ─────────────────────────────────── */}
        <Reveal>
          <dl className="bd-meta">
            <div><dt>Role</dt><dd>Designer &amp; Builder</dd></div>
            <div><dt>Type</dt><dd>AI-assisted prototype</dd></div>
            <div><dt>Tools</dt><dd>GPT-4 · Claude Code · Supabase</dd></div>
            <div><dt>Status</dt><dd>Published prototype</dd></div>
          </dl>
        </Reveal>

        {/* ── Product idea ─────────────────────────────── */}
        <Section kicker="The idea" heading="A friendlier way to quit.">
          <p className="bd-body">
            Boundaries helps people build healthier habits by tracking the things they want to
            stop doing — reducing social media, quitting alcohol, avoiding impulse purchases, or
            breaking any other habit. The focus is on making boundary-setting a consistent,
            engaging practice rather than a chore.
          </p>
          <p className="bd-body">
            Alongside streaks and monthly achievements, the app offers immediate distractions when
            temptation strikes — breathing exercises and physical challenges — and lets users add
            friends to keep each other accountable and celebrate progress together.
          </p>
        </Section>

        {/* ── Key features ─────────────────────────────── */}
        <Section kicker="Key features" heading="What's inside.">
          <div className="bd-features">
            {FEATURES.map(f => (
              <div key={f.title} className="bd-feature">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Reveal>
          <div className="bd-gallery">
            <Phone src="Chip-createnewchip.PNG" alt="Creating a new boundary" />
            <Phone src="Chip-friendspage.PNG" alt="Friends and accountability screen" />
            <Phone src="Chip-homepage-menu-open.PNG" alt="Home screen with menu open" />
          </div>
        </Reveal>

        {/* ── Build process ────────────────────────────── */}
        <Section kicker="Build process" heading="Designed and built solo, with AI.">
          <p className="bd-body">
            I designed and built the entire prototype myself — using GPT-4 for ideation and
            prompting, Claude Code for implementation, and Supabase for authentication and user
            management. The biggest challenge was balancing a simple, intuitive experience with
            enough personality to make the product stand out.
          </p>
        </Section>

        {/* ── Reflection / next phase ──────────────────── */}
        <Section kicker="Next phase" heading="From prototype to native.">
          <p className="bd-body">
            Boundaries is currently a published prototype. The next phase focuses on developing a
            stronger visual identity and rebuilding it as a native app — enabling features like
            real-time accountability notifications when users need support most.
          </p>
          <a className="bd-cta bd-cta--inline" href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer">
            Open Prototype <span className="bd-cta-arrow" aria-hidden="true">↗</span>
          </a>
        </Section>

        {/* ── Bottom nav ───────────────────────────────── */}
        <Reveal>
          <nav className="bd-nav" aria-label="Playground navigation">
            <Link href="/v2/ai-playground" className="bd-nav-back">← Back to AI Playground</Link>
          </nav>
        </Reveal>
      </main>

      <FooterV2 />

      <style>{`
        .bd-main {
          flex: 1;
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          padding: clamp(24px, 4vh, 44px) clamp(20px, 5vw, 48px) clamp(40px, 6vh, 72px);
        }
        .bd-kicker {
          display: block;
          font-size: 12px; font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: #6366f1;          /* AI Playground indigo */
          margin-bottom: 16px;
        }
        /* Hero */
        .bd-hero { max-width: 680px; margin-bottom: clamp(36px, 6vh, 64px); }
        .bd-title {
          font-size: clamp(40px, 7vw, 76px); font-weight: 500;
          line-height: 1.02; letter-spacing: -0.03em; color: #111110; margin: 0 0 18px;
        }
        .bd-subtitle { font-size: clamp(17px, 2vw, 21px); line-height: 1.5; color: #4a4a47; margin: 0 0 28px; max-width: 560px; }

        /* Tactile prototype CTA — indigo, playground flavour */
        .bd-cta {
          display: inline-flex; align-items: baseline; gap: 7px;
          padding: 13px 24px; border-radius: 30px;
          font-size: 16px; font-weight: 500; color: #fff; text-decoration: none;
          background: #6366f1;
          box-shadow: 0 4px 0 #4a4cd1, 0 8px 16px rgba(99,102,241,0.28);
          transform: translateY(0);
          transition: transform 0.14s ease, box-shadow 0.14s ease;
        }
        .bd-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 0 #4a4cd1, 0 12px 22px rgba(99,102,241,0.34); }
        .bd-cta:active { transform: translateY(3px); box-shadow: 0 1px 0 #4a4cd1, 0 3px 8px rgba(99,102,241,0.3); }
        .bd-cta:focus-visible { outline: 2px solid rgba(99,102,241,0.55); outline-offset: 3px; }
        .bd-cta-arrow { transition: transform 0.2s ease; }
        .bd-cta:hover .bd-cta-arrow { transform: translate(2px, -2px); }
        .bd-cta--inline { margin-top: 26px; }

        /* Device showcase + galleries */
        .bd-stage {
          display: flex; align-items: center; justify-content: center;
          gap: clamp(14px, 3vw, 32px);
          margin: clamp(40px, 7vh, 80px) 0;
          flex-wrap: wrap;
        }
        .bd-stage-phone { width: clamp(180px, 24vw, 248px); }
        .bd-stage-center { transform: translateY(-14px); }
        .bd-phone {
          position: relative; width: 100%; overflow: hidden;
          border-radius: 28px; background: #ece7df;
          border: 1px solid rgba(17,17,16,0.08);
          box-shadow: 0 10px 26px rgba(17,17,16,0.12);
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s ease;
        }
        .bd-phone-img { object-fit: cover; object-position: top; }
        .bd-phone:hover { transform: translateY(-6px); box-shadow: 0 18px 36px rgba(17,17,16,0.18); }

        .bd-gallery {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2.6vw, 28px);
          justify-items: center;
          max-width: 860px; margin: clamp(40px, 7vh, 80px) auto 0;
        }
        .bd-gallery .bd-phone { width: 100%; max-width: 260px; }

        /* Meta */
        .bd-meta {
          display: flex; flex-wrap: wrap; gap: clamp(24px, 5vw, 56px);
          margin: clamp(32px, 5vh, 56px) 0 0; padding-top: 28px;
          border-top: 1px solid rgba(17,17,16,0.10);
        }
        .bd-meta div { display: flex; flex-direction: column; gap: 4px; }
        .bd-meta dt { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #a8a8a3; }
        .bd-meta dd { margin: 0; font-size: 15px; color: #111110; }

        /* Sections */
        .bd-section { max-width: 660px; margin: clamp(64px, 10vh, 120px) auto clamp(24px, 4vh, 40px); }
        .bd-heading { font-size: clamp(26px, 3.4vw, 38px); font-weight: 500; line-height: 1.15; letter-spacing: -0.02em; color: #111110; margin: 0 0 20px; }
        .bd-body { font-size: 17px; line-height: 1.75; color: #56564f; margin: 0 0 18px; }

        /* Feature cards */
        .bd-features {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 14px; margin-top: 6px;
        }
        .bd-feature {
          padding: 20px 20px 22px; border-radius: 16px;
          background: #fffdf8; border: 1px solid rgba(99,102,241,0.18);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .bd-feature:hover { transform: translateY(-3px); box-shadow: 0 10px 22px rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.4); }
        .bd-feature h3 { font-size: 16px; font-weight: 500; color: #111110; margin: 0 0 6px; letter-spacing: -0.01em; }
        .bd-feature p { font-size: 14px; line-height: 1.6; color: #6b6b64; margin: 0; }

        /* Bottom nav */
        .bd-nav { margin-top: clamp(64px, 10vh, 120px); padding-top: 28px; border-top: 1px solid rgba(17,17,16,0.10); }
        .bd-nav-back { font-size: 15px; color: #56564f; text-decoration: none; transition: color 0.2s ease; }
        .bd-nav-back:hover { color: #111110; }
        .bd-nav-back:focus-visible { outline: 2px solid rgba(99,102,241,0.55); outline-offset: 4px; border-radius: 6px; }

        @media (prefers-reduced-motion: reduce) {
          .bd-cta, .bd-cta-arrow, .bd-phone, .bd-feature { transition: none; }
          .bd-cta:hover, .bd-cta:active, .bd-phone:hover, .bd-feature:hover { transform: none; }
          .bd-cta:hover .bd-cta-arrow { transform: none; }
        }
        @media (max-width: 640px) {
          .bd-features { grid-template-columns: 1fr; }
          .bd-gallery { grid-template-columns: 1fr; }
          .bd-stage-center { transform: none; }
        }
      `}</style>
    </div>
  )
}
