'use client'

import Image from 'next/image'
import CaseStudyLayout from '@/components/CaseStudyLayout'

/* ── Shared sub-components ──────────────────────── */

function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-16 my-12">
      {stats.map((stat) => (
        <div key={stat.label}>
          <div className="cs-stat-value">{stat.value}</div>
          <div className="cs-stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

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
  const cols = images.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'
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
      <h2 className="cs-heading">20,000 teams. One platform. Launched March 2026.</h2>

      <p className="cs-body">
        Prosperity 04 opened for sign-up in March 2026: the fourth edition of
        IMC's annual student trading competition, now running on a fully
        redesigned platform with a space exploration theme. Client response to
        the designs was very positive. The finished platform supports a
        large-scale competition with a more mature visual direction and a game
        structure aligned to the new theme.
      </p>

      <StatRow
        stats={[
          { value: '~20K', label: 'competing teams' },
          { value: '04', label: 'edition of Prosperity' },
          { value: '4', label: 'core game phases designed' },
        ]}
      />

      <div className="cs-divider" />

      {/* ── PROBLEM ─────────────────────────────────── */}
      <h2 className="cs-heading">More than a visual refresh.</h2>

      <p className="cs-body">
        For its fourth edition, IMC wanted to move Prosperity beyond its earlier
        island-themed identity (bright blues, cartoon buildings, tropical energy)
        and create something more mature and immersive. That thematic shift
        from island to space affected both the visual design and the game
        mechanics, requiring a platform experience that felt genuinely different
        without losing clarity for players navigating complex trading rounds.
      </p>

      <p className="cs-body">
        The scale of the challenge was significant: nearly 20,000 teams from
        across the world participate, each moving through a structured sequence
        of tutorial, trading rounds, intermissions, and finals. Every screen
        needed to hold dense information including scores, algorithmic challenges,
        leaderboards and timers, while remaining engaging and navigable.
      </p>

      <ImageGrid
        images={[
          { src: 'prosperity-island.png', alt: 'Prosperity 3 — island world theme' },
          { src: 'prosperity-outpost.png', alt: 'Prosperity 04 — space exploration theme' },
        ]}
        caption="From Prosperity 3's island world to the space-exploration theme of Prosperity 04."
      />

      <div className="cs-divider" />

      {/* ── APPROACH ─────────────────────────────────── */}
      <h2 className="cs-heading">Wireframes first, then the universe.</h2>

      <p className="cs-body">
        I joined the project after the discovery phase and took ownership of the
        wireframes for the core game flows. From there, I worked closely with the
        visual designer to translate those wireframes into high-fidelity designs
        and prototypes that balanced playfulness with usability.
      </p>

      <p className="cs-body">
        The work was structured around the full player journey, from sign-up and
        tutorial through trading rounds, intermission, and supporting features
        like leaderboards, crew honours, and the onboard advisor.
      </p>

      <FullBleedImage
        src="prosperity-tutorial.png"
        alt="Prosperity tutorial round screen"
        caption="Tutorial round — introducing new players to the game mechanics before live rounds begin."
      />

      <p className="cs-body">Core flows designed:</p>
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
          'Trading rounds (with algorithmic + manual challenge structure)',
          'Round results and intermission',
          'Leaderboard',
          'Crew honours and badge system',
          'Onboard advisor interaction',
        ].map((item) => (
          <li key={item} style={{ paddingLeft: '16px', position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: 0,
                color: 'var(--faint)',
              }}
            >
              •
            </span>
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
        I also collaborated across design and development to ensure correct
        implementation of the core structure, and supported design system QA as
        the experience moved toward build and review.
      </p>

      <FullBleedImage
        src="prosperity-advisor.png"
        alt="The onboard advisor giving strategic guidance"
        caption="The onboard advisor, a narrative feature that gives teams strategic guidance during rounds."
      />

      <div className="cs-divider" />

      {/* ── SOLUTION ─────────────────────────────────── */}
      <h2 className="cs-heading">Dense information, immersive skin.</h2>

      <p className="cs-body">
        The core design challenge was finding the balance between engagement and
        usability: making a game that felt visually rich and immersive while
        still supporting clear navigation, dense information, and practical user
        needs across rounds.
      </p>

      <p className="cs-body">
        The solution was to use the space narrative as a framing layer rather
        than a visual override. The UI still prioritised legibility and structure:
        clean card components, clear hierarchy, consistent round navigation,
        wrapped in a world that felt distinctly new.
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

      {/* ── TAKEAWAYS ─────────────────────────────────── */}
      <h2 className="cs-heading">What I learned.</h2>

      <p className="cs-body">
        The biggest learning was about the relationship between immersion and
        usability. In a game context, it's tempting to let the world-building
        lead, but with 20,000 players navigating real trading logic under time
        pressure, clarity always had to win. The visual richness needed to serve
        the structure, not compete with it.
      </p>

      <p className="cs-body">
        This project also reinforced the value of owning the wireframe phase. By
        establishing clear flows before any visual design began, we gave the
        visual designer room to push the aesthetic without losing the underlying
        logic.
      </p>


    </CaseStudyLayout>
  )
}
