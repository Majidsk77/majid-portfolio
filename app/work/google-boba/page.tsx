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
      heroAlt="Google Boba kiosk screen — 'Discover how we're making AI accessible'"
      nextProject={{ label: 'IMC Prosperity', href: '/work/imc-prosperity' }}
    >

      {/* ── OUTCOME ─────────────────────────────────── */}
      <h2 className="cs-heading">Launched. Paris, Munich. Rolling out globally.</h2>

      <p className="cs-body">
        The Google Boba design system launched across event spaces in Paris and
        Munich in February 2026, marking the first release of a scalable
        foundation built to carry Google's design principles into physical environments.
        Stakeholder reception was positive, and the system has set the foundation
        for rollout in additional cities throughout 2026.
      </p>

      <StatRow
        stats={[
          { value: '2', label: 'cities at launch' },
          { value: 'v1.0', label: 'first foundation release' },
        ]}
      />

      <div className="cs-divider" />

      {/* ── PROBLEM ─────────────────────────────────── */}
      <h2 className="cs-heading">Standard tools weren't built for this.</h2>

      <p className="cs-body">
        Google's event spaces use interactive Boba screens: large-format
        touchscreens that showcase products and host presentations across a range
        of sizes, layouts, and physical contexts. The challenge was that Material
        3 alone wasn't sufficient for this environment.
      </p>

      <p className="cs-body">
        Screens varied significantly in scale and placement. Implementation needs
        differed across locations. The existing components and patterns weren't
        built with spatial contexts in mind. A tailored system was needed, one
        that stayed aligned with Google's broader design language while adapting
        to a fundamentally different physical-digital environment.
      </p>

      <FullBleedImage
        src="boba-people.png"
        alt="People interacting with Boba screens at a Google event space"
        caption="Boba screens in Google event spaces vary significantly in size and physical context."
      />

      <div className="cs-divider" />

      {/* ── APPROACH ─────────────────────────────────── */}
      <h2 className="cs-heading">Building the foundation for v1.0.</h2>

      <p className="cs-body">
        I joined the project in a later phase and focused on building the design
        system foundation for the first release. My core responsibility was
        defining the tokens, components, and variants needed to support scalable
        application across event-space screens.
      </p>

      <p className="cs-body">
        Working closely with the design system specialist who led the template
        layer, I owned the design system structure itself, shaping it into a
        production-ready foundation that aligned with Google's broader design
        language while adapting it for a unique spatial use case.
      </p>

      <ImageGrid
        images={[
          { src: 'boba-components-1.png', alt: 'Boba component sheet — slider variants' },
          { src: 'boba-components-2.png', alt: 'Boba component sheet — chips' },
          { src: 'boba-components-3.png', alt: 'Boba component sheet — organic shape tokens' },
        ]}
        caption="Core component definitions: slider variants, chips, and organic shape tokens."
      />

      <p className="cs-body">Key responsibilities:</p>
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
          'Defining core system tokens (color, spacing, shape, motion)',
          'Building component foundations and variant structures',
          'Aligning with Material 3 while extending for spatial needs',
          'Collaborating on the template layer with the design system specialist',
          'Supporting design system QA as the experience moved toward build',
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
        The result was a reusable design system tailored to interactive event
        environments. The system introduced an organic shape language: soft
        blobs and rounded forms that distinguish the Boba context from standard
        Material surfaces, alongside a purple token system that could flex
        across dark and light screen environments.
      </p>

      <p className="cs-body">
        Components were designed to scale gracefully across the range of screen
        sizes present in Google event spaces, with clear documentation to support
        implementation across locations.
      </p>

      <FullBleedImage
        src="boba-hero.png"
        alt="Interactive kiosk experience at a Google event space"
        caption="The system in context: interactive kiosk experience at a Google event space."
      />

      <div className="cs-divider" />

      {/* ── TAKEAWAYS ─────────────────────────────────── */}
      <h2 className="cs-heading">What I learned.</h2>

      <p className="cs-body">
        This project strengthened my ability to work within an established design
        ecosystem while still introducing meaningful structure for a genuinely
        new context. The biggest design challenge wasn't creating something novel
        it was creating something coherent: a system that felt unmistakably
        Google while serving a fundamentally different environment.
      </p>

      <p className="cs-body">
        Working in a later phase of a live project also required clarity about
        scope and ownership. Understanding where the system ended and the
        template layer began, and collaborating tightly across that boundary,
        was as important as the design work itself.
      </p>


    </CaseStudyLayout>
  )
}
