'use client'

// V2 Exact.com case study — same editorial system as the Google Boba V2 page
// (shared gb-* classes + style block, NavV2 flow + FooterV2, identical spacing,
// typography, image treatment and reveals). Content is recomposed/condensed
// from the existing case study (app/work/exact) — no new information invented.

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

// Two-up image pair (wireframe → design comparisons) — same treatment as the
// Google Boba 3-up grid, just two columns.
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

const PROCESS = [
  { title: 'Journey mapping', body: 'I mapped journeys across four customer types: accountants, CFOs, small business owners, and large business owners. For each, I surfaced how they moved through the site, which pages they hit, and where the experience failed them.' },
  { title: 'Page identification', body: 'From the journey maps I identified the core pages within those journeys that needed the most attention, and defined which were in scope.' },
  { title: 'Template definition', body: 'I defined page templates to structure content and functionality, each establishing a content hierarchy and narrative logic for its page type: the architecture the visual layer would later carry.' },
  { title: 'Wireframing', body: 'I developed wireframes through iterative client review cycles, translating templates into detailed layouts ready to hand to the visual design team.' },
]

const DECISIONS = [
  { title: 'Architecture as the argument', body: 'On a platform this complex, the page structure is the experience. Before wireframing a screen, I mapped what each page type needed to do, in what order, and for whom. Template logic came first; individual page decisions followed from it.' },
  { title: 'Four audiences, without losing specificity', body: 'Accountants, CFOs, small business owners, and large business owners share one platform but need fundamentally different entry points. Journey mapping made those distinctions explicit in the structure, so each audience got a path built for them, without four separate sites.' },
  { title: 'Wireframes as alignment tools', body: 'Review ran across stakeholders with different priorities, so I built wireframes to be read by non-designers: decisions explicit, hierarchy visible, rationale embedded. The goal was shared understanding of structure before visual design.' },
]

export default function ExactV2() {
  return (
    <div className={hanken.className} style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <NavV2 flow />

      <main className="gb-main">
        {/* ── Hero ─────────────────────────────────────── */}
        <Reveal>
          <header className="gb-hero">
            <span className="gb-kicker">Case study</span>
            <h1 className="gb-title">Exact.com</h1>
            <p className="gb-subtitle">Redesigning a marketing platform to tell a clearer, more human story.</p>
            <dl className="gb-meta">
              <div><dt>Role</dt><dd>UX Designer &amp; UX Strategist</dd></div>
              <div><dt>Client</dt><dd>Exact</dd></div>
              <div><dt>Year</dt><dd>2025</dd></div>
            </dl>
          </header>
        </Reveal>

        <WideImage src="exact-hero.png" alt="Exact.com hi-fi capability page design" />

        {/* ── Overview ─────────────────────────────────── */}
        <Section kicker="Overview" heading="17 templates. 4 audiences. Launching 2026.">
          <p className="gb-body">
            I led the UX process end-to-end for Exact&apos;s full website overhaul: from scoping
            workshops and journey mapping through template definition, wireframing, and client
            handover. The work delivered the complete UX foundation for a major platform redesign,
            now approved by stakeholders and launching in 2026 alongside a new brand direction.
          </p>
          <div className="gb-stats">
            {[
              { value: '4', label: 'audience types mapped' },
              { value: '17', label: 'page templates defined' },
              { value: '2026', label: 'launching with new brand' },
            ].map(s => (
              <div key={s.label} className="gb-stat">
                <span className="gb-stat-value">{s.value}</span>
                <span className="gb-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Challenge ────────────────────────────────── */}
        <Section kicker="Challenge" heading="A site built for experts, not for everyone.">
          <p className="gb-body">
            Exact&apos;s existing website was highly information-dense, with heavy cross-linking and
            limited narrative structure. It worked for existing users who already understood the
            product landscape, but lacked clarity for new visitors, especially those outside
            Exact&apos;s traditional accountant audience.
          </p>
          <p className="gb-body">
            The challenge was threefold: restructure the platform to communicate value more
            clearly, support a broader audience including CFOs and entrepreneurs, and align with an
            upcoming brand direction, all while respecting existing content and avoiding
            disruption to live product pages.
          </p>
        </Section>

        <WideImage
          src="exact-journey-accountant.png"
          alt="User journey map: accountant moving through the existing site"
          caption="Journey mapping: understanding how an accountant moves through the existing site."
        />

        {/* ── Process ──────────────────────────────────── */}
        <Section kicker="Process" heading="Discovery to architecture.">
          <p className="gb-body">
            The work moved through four phases, each building the foundation for the next.
          </p>
          <div className="gb-decisions">
            {PROCESS.map(p => (
              <div key={p.title} className="gb-decision">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Grid2
          images={[
            { src: 'exact-journey-cfo.png', alt: 'User journey: CFO value journey' },
            { src: 'exact-journey-small-biz.png', alt: 'User journey: small business owner self-service journey' },
          ]}
          caption="Journeys for the CFO (value journey) and small business owner (self-service journey)."
        />

        <Grid2
          images={[
            { src: 'exact-template-homepage.png', alt: 'Page template: homepage narrative structure' },
            { src: 'exact-template-capability.png', alt: 'Page template: capability page' },
          ]}
          caption="Homepage and capability templates: defining narrative structure before visual design."
        />

        <WideImage
          src="exact-homepage-wireframe.jpg"
          alt="Exact homepage wireframe"
          caption="Homepage wireframe: establishing structure and hierarchy before visual design."
        />

        {/* ── Key design decisions ─────────────────────── */}
        <Section kicker="Design decisions" heading="Three decisions that shaped the platform.">
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
        <Section kicker="Final solution" heading="Structure first. Story second.">
          <p className="gb-body">
            I designed the core structure and key pages of the new platform, applying visual design
            on top of the UX architecture.
          </p>
        </Section>

        <Grid2
          images={[
            { src: 'exact-homepage-design.png', alt: 'Hi-fi homepage design' },
            { src: 'exact-capability-design.png', alt: 'Hi-fi capability page design' },
          ]}
          caption="Homepage and capability page: visual design applied to the UX structure."
        />

        <Section kicker="" heading="">
          <p className="gb-body">
            <strong className="gb-strong">Homepage:</strong> introduces Exact, communicates core
            value, and guides each audience toward the right product area. Set the stage, show
            what&apos;s on offer, demonstrate who it&apos;s for, prove why Exact is the expert.
          </p>
          <p className="gb-body">
            <strong className="gb-strong">Capability pages:</strong> show what the software enables,
            prove its importance, and connect it to specific products, bridging problem-awareness
            and product consideration.
          </p>
        </Section>

        <Grid2
          images={[
            { src: 'exact-knowledge-hub-wireframe.png', alt: 'Knowledge hub wireframe' },
            { src: 'exact-knowledge-hub-design.png', alt: 'Knowledge hub hi-fi design' },
          ]}
          caption="Knowledge hub, wireframe to hi-fi: a content destination structured around audience needs and formats."
        />

        <Grid2
          images={[
            { src: 'exact-product-detail-wireframe.png', alt: 'Product detail page wireframe' },
            { src: 'exact-product-detail-design.png', alt: 'Product detail page hi-fi design' },
          ]}
          caption="Product detail page, wireframe to hi-fi: from product promise to plans and pricing."
        />

        <Section kicker="" heading="">
          <p className="gb-body">
            <strong className="gb-strong">Knowledge hub:</strong> a destination for thought
            leadership, articles, and videos, structured around audience needs and content formats
            rather than a flat chronological feed.
          </p>
          <p className="gb-body">
            <strong className="gb-strong">Product detail pages:</strong> connect Exact&apos;s value
            proposition to specific features, show impact through customer stories, and guide users
            toward trial or purchase.
          </p>
        </Section>

        {/* ── Reflection ───────────────────────────────── */}
        <Section kicker="Reflection" heading="What this scale of work clarified.">
          <p className="gb-body">
            Leading this end-to-end made one thing concrete: on a marketing platform of this
            complexity, the information architecture is the product strategy. Getting the template
            logic right (what each page needed to do, and in what sequence) was more consequential
            than any single design decision. The structure either earns attention or loses it before
            the visual layer ever gets a chance.
          </p>
          <p className="gb-body">
            Working across four distinct audiences also sharpened something less visible: holding
            competing priorities without collapsing them into one compromise. Each audience had
            legitimate, different needs. The design work was making those distinctions explicit and
            buildable, not smoothing them over.
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
        .gb-heading:empty { display: none; }
        .gb-kicker:empty { display: none; }
        .gb-body { font-size: 17px; line-height: 1.75; color: #56564f; margin: 0 0 18px; }
        .gb-strong { font-weight: 500; color: #111110; }

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

        .gb-grid3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin: clamp(40px, 7vh, 80px) 0 0;
        }
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
          background: #c9b9ef;
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
          outline: 2px solid rgba(121,175,182,0.7); outline-offset: 4px; border-radius: 6px;
        }

        @media (max-width: 640px) {
          .gb-grid3 { grid-template-columns: 1fr; gap: 12px; }
          .gb-grid2 { grid-template-columns: 1fr; gap: 12px; }
        }
      `}</style>
    </div>
  )
}
