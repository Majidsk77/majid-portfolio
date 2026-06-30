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

export default function GoogleBobaPage() {
  return (
    <CaseStudyLayout
      title="Google Boba"
      subtitle="A design system for Google's interactive event spaces"
      tags={['Design Systems', 'Spatial Design', 'Google']}
      client="Google"
      year="2026"
      role="Design Systems Designer"
      heroImage="boba-hero.png"
      heroAlt="Google Boba kiosk screen: 'Discover how we're making AI accessible'"
      nextProject={{ label: 'IMC Prosperity', href: '/work/imc-prosperity' }}
    >

      {/* ── OUTCOME ─────────────────────────────────── */}
      <h2 className="cs-heading">Launched. Paris, Munich. Rolling out globally.</h2>

      <p className="cs-body">
        The Google Boba design system launched across event spaces in Paris and Munich in
        February 2026, the first release of a scalable foundation built to carry Google&apos;s
        design principles into physical interactive environments. As the Design Systems
        Designer on the project, I owned the system architecture: tokens, components, and
        spatial variants that now underpin every Boba screen across Google&apos;s global
        event spaces.
      </p>

      <StatRow
        stats={[
          { value: '2', label: 'cities at launch' },
          { value: 'v1.0', label: 'first foundation release' },
          { value: '2026', label: 'global rollout ongoing' },
        ]}
      />

      <OverviewGrid
        rows={[
          { label: 'Role', value: 'Design Systems Designer' },
          { label: 'Responsibilities', value: 'System Architecture · Token Design · Component Library · Material 3 Adaptation · Spatial UX · Design QA' },
        ]}
        outcomes={[
          'Shipped to Paris and Munich, February 2026',
          'v1.0 design system foundation released',
          'Global rollout in progress throughout 2026',
          'System foundation for all future Boba deployments',
        ]}
      />

      <div className="cs-divider" />

      {/* ── PROBLEM ─────────────────────────────────── */}
      <h2 className="cs-heading">Standard tools weren&apos;t built for this.</h2>

      <p className="cs-body">
        Google&apos;s event spaces use interactive Boba screens: large-format touchscreens
        that showcase products and host presentations across a range of sizes, layouts, and
        physical contexts. The challenge was that Material 3 alone wasn&apos;t sufficient
        for this environment.
      </p>

      <p className="cs-body">
        Screens varied significantly in scale and placement. Implementation needs differed
        across locations. The existing components and patterns weren&apos;t built with
        spatial contexts in mind. A tailored system was needed, one that stayed aligned
        with Google&apos;s broader design language while adapting to a fundamentally
        different physical-digital environment.
      </p>

      <FullBleedImage
        src="boba-people.png"
        alt="People interacting with Boba screens at a Google event space"
        caption="Boba screens in Google event spaces vary significantly in size and physical context."
      />

      <div className="cs-divider" />

      {/* ── KEY DESIGN DECISIONS ────────────────────── */}
      <h2 className="cs-heading">Key Design Decisions.</h2>

      <DecisionBlock
        title="Extending Material 3 for physical space"
        body="Boba screens aren't web or mobile. They're architectural. The system had to feel unmistakably Google while working in an environment Material 3 was never designed for. Rather than overriding Google's design language, I extended it: adapting tokens, shapes, and components for spatial scale without breaking the underlying system logic."
      />
      <DecisionBlock
        title="Tokens as the scaling mechanism"
        body="The token layer carries all the context-switching work: dark and light environments, different screen sizes, varying placements across spaces. Components stay stable; the token system adapts them. Getting this architecture right from the start was what made the system genuinely scalable rather than just flexible."
      />
      <DecisionBlock
        title="Scope clarity in a live project"
        body="Joining mid-phase required tight scope discipline. The system ended at the component level; the template layer was owned by the design system specialist I collaborated with. Understanding that boundary, and designing tightly within it, meant we could ship a clean v1.0 without bleeding scope into each other's work."
      />

      <div className="cs-divider" />

      {/* ── APPROACH ─────────────────────────────────── */}
      <h2 className="cs-heading">Owning the system foundation.</h2>

      <p className="cs-body">
        I joined the project in a later phase and took ownership of the design system
        foundation for v1.0. Working closely with the design system specialist who led
        the template layer, I defined the tokens, components, and variants needed to
        support scalable application across event-space screens.
      </p>

      <ImageGrid
        images={[
          { src: 'boba-components-1.png', alt: 'Boba component sheet: slider variants' },
          { src: 'boba-components-2.png', alt: 'Boba component sheet: chips' },
          { src: 'boba-components-3.png', alt: 'Boba component sheet: organic shape tokens' },
        ]}
        caption="Core component definitions: slider variants, chips, and organic shape tokens."
      />

      <p className="cs-body">The system foundation I built included:</p>
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
          'Core system tokens: color, spacing, shape, motion',
          'Component foundations and variant structures',
          'Material 3 extension for spatial and physical-screen contexts',
          'Organic shape language: soft blob forms that distinguish Boba from standard Material surfaces',
          'Design system QA as the experience moved toward build',
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

      <FullBleedImage
        src="boba-template.png"
        alt="Google DeepMind template showing components across screen configurations"
        caption="Template layer showing how components adapt across different screen configurations."
      />

      <div className="cs-divider" />

      {/* ── SOLUTION ─────────────────────────────────── */}
      <h2 className="cs-heading">A system built for space.</h2>

      <p className="cs-body">
        The result was a reusable design system tailored to interactive event environments.
        The system introduced an organic shape language (soft blobs and rounded forms that
        distinguish the Boba context from standard Material surfaces) alongside a purple
        token system that flexes across dark and light screen environments.
      </p>

      <p className="cs-body">
        Components were designed to scale gracefully across the range of screen sizes
        present in Google event spaces, with clear documentation to support implementation
        across locations. The system shipped at v1.0 and is the foundation all future
        Boba deployments will build on.
      </p>

      <FullBleedImage
        src="boba-hero.png"
        alt="Interactive kiosk experience at a Google event space"
        caption="The system in context: interactive kiosk experience at a Google event space."
      />

      <div className="cs-divider" />

      {/* ── REFLECTION ───────────────────────────────── */}
      <h2 className="cs-heading">Coherence over novelty.</h2>

      <p className="cs-body">
        The constraint here wasn&apos;t freedom. It was coherence. Building a system that
        extended Material 3 into a genuinely new physical context required knowing exactly
        which decisions were mine to make and which ones had to stay anchored to
        Google&apos;s existing design language. Getting that balance right, distinctive
        enough to serve the spatial environment, consistent enough to feel unmistakably
        Google, was the central design challenge.
      </p>

      <p className="cs-body">
        Joining a live project mid-phase also made scope clarity concrete as a design
        skill. The work wasn&apos;t just about building the right components. It was
        about understanding exactly where the system ended and collaborating tightly
        across that boundary. A system that tries to do everything ends up owning nothing.
      </p>

    </CaseStudyLayout>
  )
}
