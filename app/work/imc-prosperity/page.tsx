'use client'

import Image from 'next/image'
import CaseStudyLayout from '@/components/CaseStudyLayout'
import { StatRow, OverviewGrid } from '@/components/CaseStudyMeta'

function FullBleedImage({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}) {
  return (
    <figure className="cs-full-bleed">
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image src={`/images/${src}`} alt={alt} fill className="object-cover object-top" />
      </div>
      {caption && (
        <figcaption className="cs-caption px-6 md:px-12">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function ImageGrid({
  images,
  caption,
}: {
  images: { src: string; alt: string }[]
  caption?: string
}) {
  const cols =
    images.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'
  return (
    <figure className="my-12">
      <div className={`grid ${cols} gap-3`}>
        {images.map((img) => (
          <div
            key={img.src}
            className="relative overflow-hidden rounded-[2px]"
            style={{ aspectRatio: '4/3' }}
          >
            <Image
              src={`/images/${img.src}`}
              alt={img.alt}
              fill
              className="object-cover object-top"
            />
          </div>
        ))}
      </div>
      {caption && <figcaption className="cs-caption">{caption}</figcaption>}
    </figure>
  )
}

function DecisionBlock({ title, body }: { title: string; body: string }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 md:gap-10 py-7"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <h3 className="text-[13px] font-normal text-[var(--text)] leading-[1.5] tracking-[-0.005em] md:pt-[3px]">
        {title}
      </h3>
      <p className="text-[15px] text-[var(--muted)] font-light leading-[1.75] mt-1 md:mt-0">
        {body}
      </p>
    </div>
  )
}

/* ── Page ──────────────────────────────────────── */

export default function IMCProsperityPage() {
  return (
    <CaseStudyLayout
      title="IMC Prosperity"
      subtitle="A space-themed trading game for IMC's annual global student competition"
      tags={['UX Design', 'Product Design', 'Game Design']}
      client="IMC"
      year="2025–26"
      role="UX Designer"
      heroImage="prosperity-outpost.png"
      heroAlt="Prosperity 04 Mars outpost — team score card view"
      nextProject={{ label: 'Exact .com', href: '/work/exact' }}
    >

      {/* ── OUTCOME ─────────────────────────────────── */}
      <h2 className="cs-heading">30,703 players. 117 countries. Launched 2026.</h2>

      <p className="cs-body">
        Prosperity 04 launched in March 2026 — the fourth edition of IMC&apos;s annual
        student trading competition, fully redesigned around a space exploration theme.
        As the sole UX Designer on the project, I owned the experience from wireframes
        through design QA, contributing to a platform that scaled to a record-breaking
        competition.
      </p>

      <StatRow
        stats={[
          { value: '30,703', label: 'registered players' },
          { value: '~45%', label: 'participation increase' },
          { value: '18,803', label: 'competing teams' },
          { value: '117', label: 'countries represented' },
        ]}
      />

      <OverviewGrid
        rows={[
          { label: 'Role', value: 'UX Designer' },
          { label: 'Timeline', value: '4 Months' },
          { label: 'Team', value: '1 UX Designer · 1 Creative Director · 1 Visual Designer · 3 Developers · 1 Product Manager' },
          { label: 'Responsibilities', value: 'UX Wireframing · User Flows · Interaction Design · UI Translation · Design QA · Design System Enhancement' },
        ]}
        outcomes={[
          'Shipped live for IMC Prosperity 2026',
          'Supported 30,703 players across 117 countries',
          'Increased participation by nearly 45%',
          'Designed experiences for 18,803 competing teams',
          'Redesigned 4 core gameplay systems',
        ]}
      />

      <div className="cs-divider" />

      {/* ── THE CHALLENGE ───────────────────────────── */}
      <h2 className="cs-heading">A game that had to work.</h2>

      <p className="cs-body">
        IMC Prosperity sits at the intersection of competitive gameplay and high-density
        financial information. The platform needed to feel immersive and engaging while
        still supporting fast comprehension, strategic decision-making, and usability
        during live trading events.
      </p>

      <p className="cs-body">
        One of the core UX challenges was balancing cinematic visual direction with
        functional clarity. Players needed to quickly navigate gameplay phases, monitor
        rankings, and understand progression systems without becoming overwhelmed by
        information complexity.
      </p>

      <p className="cs-body">
        The platform also had to hold together across multiple gameplay phases for 30,000+
        concurrent participants — from first-time tutorial players to teams competing for
        finals spots.
      </p>

      <ImageGrid
        images={[
          { src: 'prosperity-island.png', alt: 'Prosperity 3 — island world theme' },
          { src: 'prosperity-outpost.png', alt: 'Prosperity 04 — space exploration theme' },
        ]}
        caption="From Prosperity 3's island world to the space-exploration theme of Prosperity 04."
      />

      <div className="cs-divider" />

      {/* ── KEY DESIGN DECISIONS ────────────────────── */}
      <h2 className="cs-heading">Key Design Decisions.</h2>

      <DecisionBlock
        title="Balancing immersion with usability"
        body="The interface had to feel game-like without trading clarity for excitement. Working with the creative director to keep visual ambition grounded in function, I established a system of clear hierarchy and modular layouts that let players act quickly under pressure."
      />
      <DecisionBlock
        title="Designing for high information density"
        body="Players continuously monitored rankings, gameplay systems, and progression states. Wireframes focused heavily on scannability — reducing cognitive overload while maintaining visual excitement. Every layout decision was tested against a single question: can a player act on this in seconds?"
      />
      <DecisionBlock
        title="Creating scalable UX patterns"
        body="The competition's multi-phase structure meant the UX system had to flex across contexts rather than be rebuilt for each one. I partnered with the visual designer to ensure the visual layer extended — not replaced — the underlying UX architecture."
      />

      <div className="cs-divider" />

      {/* ── PROCESS ─────────────────────────────────── */}
      <h2 className="cs-heading">Wireframes first, then the universe.</h2>

      <p className="cs-body">
        I joined the project after the discovery phase and took ownership of wireframes
        for the core game flows — working closely with developers to ensure feasible
        implementation from the start.
      </p>

      <p className="cs-body">
        I focused on simplifying gameplay navigation, clarifying progression systems, and
        improving information hierarchy across multiple event phases. Early wireframes
        explored ways to balance high-density trading information with approachable
        interaction patterns for a global audience.
      </p>

      <FullBleedImage
        src="prosperity-tutorial.png"
        alt="Prosperity tutorial round screen"
        caption="Tutorial round — introducing new players to the game mechanics before live rounds begin."
      />

      <p className="cs-body">The full player journey, end to end:</p>
      <ul
        className="cs-body"
        style={{
          listStyle: 'none',
          paddingLeft: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {[
          'Sign-up and onboarding',
          'Tutorial round',
          'Trading rounds (algorithmic + manual challenge structure)',
          'Round results and intermission',
          'Leaderboard',
          'Crew honours and badge system',
          'Onboard advisor interaction',
        ].map((item) => (
          <li key={item} style={{ paddingLeft: '16px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--faint)' }}>•</span>
            {item}
          </li>
        ))}
      </ul>

      <ImageGrid
        images={[
          { src: 'prosperity-leaderboard.png', alt: 'Prosperity leaderboard screen' },
          { src: 'prosperity-badge.png', alt: 'First Responder badge — crew honours system' },
        ]}
        caption="Leaderboard structure and the crew honours badge system."
      />

      <p className="cs-body">
        I supported design system QA as the experience moved toward build and review,
        and collaborated with developers to ensure correct implementation of the core
        interaction structure throughout.
      </p>

      <FullBleedImage
        src="prosperity-advisor.png"
        alt="The onboard advisor giving strategic guidance"
        caption="The onboard advisor — a narrative feature that gives teams strategic guidance during rounds."
      />

      <div className="cs-divider" />

      {/* ── SOLUTION ─────────────────────────────────── */}
      <h2 className="cs-heading">Dense information, immersive skin.</h2>

      <p className="cs-body">
        The solution was to use the space narrative as a framing layer rather than a
        visual override. The UI prioritised legibility and structure — clean card
        components, clear hierarchy, consistent round navigation — wrapped in a world
        that felt genuinely new.
      </p>

      <p className="cs-body">
        Working closely with the visual designer, we iterated on structure before applying
        the visual layer — making sure the information hierarchy held up before the
        world-building was applied on top.
      </p>

      <FullBleedImage
        src="prosperity-countdown.png"
        alt="Phase countdown screen"
        caption="Phase countdown and round holding screens — moments of tension built into the experience."
      />

      <ImageGrid
        images={[
          { src: 'prosperity-signup.png', alt: 'Join the Challenge sign-up screen' },
          { src: 'prosperity-tutorial.png', alt: 'Tutorial round screen' },
        ]}
        caption="Sign-up and tutorial flows — reducing friction for first-time players."
      />

      <div className="cs-divider" />

      {/* ── REFLECTION ───────────────────────────────── */}
      <h2 className="cs-heading">Reflection.</h2>

      <p className="cs-body">
        Designing for this competition made the tension between immersion and usability
        concrete. With 30,000 players navigating live trading logic under time pressure,
        the decisions that mattered most weren&apos;t about aesthetics — they were about
        clarity, speed, and structure.
      </p>

      <p className="cs-body">
        It also reinforced that systems built for scale need modular thinking from the
        start. Trying to retrofit coherence into a multi-phase experience is expensive;
        designing it in from wireframes is not.
      </p>

    </CaseStudyLayout>
  )
}
