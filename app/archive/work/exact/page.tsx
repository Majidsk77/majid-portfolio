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

export default function ExactPage() {
  return (
    <CaseStudyLayout
      title="Exact .com"
      subtitle="Redesigning a marketing platform to tell a clearer, more human story"
      tags={['UX Strategy', 'UX Design', 'Discovery']}
      client="Exact"
      year="2025"
      role="UX Designer & UX Strategist"
      heroImage="exact-hero.png"
      heroAlt="Exact.com hi-fi capability page design"
      heroPosition="center"
      nextProject={{ label: 'Google Boba', href: '/work/google-boba' }}
    >

      {/* ── OUTCOME ─────────────────────────────────── */}
      <h2 className="cs-heading">17 templates. 4 audiences. Launching 2026.</h2>

      <p className="cs-body">
        I led the UX process end-to-end for Exact&apos;s full website overhaul, from scoping
        workshops and journey mapping through template definition, wireframing, and client
        handover. The project delivered the complete UX foundation for a major platform
        redesign, now approved by stakeholders and launching in 2026 alongside a new brand
        direction.
      </p>

      <StatRow
        stats={[
          { value: '4', label: 'audience types mapped' },
          { value: '17', label: 'page templates defined' },
        ]}
      />

      <OverviewGrid
        rows={[
          { label: 'Role', value: 'UX Designer & UX Strategist' },
          { label: 'Responsibilities', value: 'Discovery · Stakeholder Workshops · Journey Mapping · UX Strategy · Page Architecture · Wireframing · Template Definition · Client Iteration' },
        ]}
        outcomes={[
          "Full UX foundation for Exact's 2026 website overhaul",
          '17 page templates defined and designed',
          '4 audience types mapped end-to-end',
          'Approved by stakeholders, launching with new brand direction',
        ]}
      />

      <div className="cs-divider" />

      {/* ── PROBLEM ─────────────────────────────────── */}
      <h2 className="cs-heading">A site built for experts, not for everyone.</h2>

      <p className="cs-body">
        Exact&apos;s existing website was highly information-dense, with heavy cross-linking
        and limited narrative structure. While effective for existing users who already
        understood the product landscape, it lacked clarity for new visitors, particularly
        those outside Exact&apos;s traditional accountant audience.
      </p>

      <p className="cs-body">
        The challenge was threefold: restructure the platform to communicate product value
        more clearly, support a broader audience including CFOs and entrepreneurs, and align
        with an upcoming brand direction, while respecting existing content and avoiding
        disruption to live product pages.
      </p>

      <FullBleedImage
        src="exact-journey-accountant.png"
        alt="User journey map: accountant moving through the existing site"
        caption="User journey mapping: understanding how an accountant moves through the existing site."
      />

      <div className="cs-divider" />

      {/* ── KEY DESIGN DECISIONS ────────────────────── */}
      <h2 className="cs-heading">Key Design Decisions.</h2>

      <DecisionBlock
        title="Architecture as the argument"
        body="On a platform this complex, the page structure is the experience. Before wireframing a single screen, I mapped what each page type needed to do, in what order, and for whom. The template logic came first. Individual page decisions followed from that foundation, not the other way around."
      />
      <DecisionBlock
        title="Designing across four audiences without losing specificity"
        body="Accountants, CFOs, small business owners, and large business owners use the same platform but need fundamentally different entry points. Journey mapping gave me the evidence to make those distinctions explicit in the structure, so each audience found a path built for them, without requiring four separate sites."
      />
      <DecisionBlock
        title="Wireframes as alignment tools"
        body="Client review cycles ran across multiple stakeholders with different priorities. I structured wireframes to be readable by non-designers: decisions made explicit, hierarchy visible, rationale embedded. The goal was to get alignment on structure before visual design, not to present polished work, but to create shared understanding."
      />

      <div className="cs-divider" />

      {/* ── APPROACH ─────────────────────────────────── */}
      <h2 className="cs-heading">Discovery to architecture.</h2>

      <p className="cs-body">
        The process moved through four key phases, each one building the foundation for
        the next.
      </p>

      <ImageGrid
        images={[
          { src: 'exact-journey-cfo.png', alt: 'User journey: CFO value journey' },
          { src: 'exact-journey-small-biz.png', alt: 'User journey: Small Business Owner self-service journey' },
        ]}
        caption="User journeys for the CFO (value journey) and Small Business Owner (self-service journey)."
      />

      <ol
        className="cs-body"
        style={{
          listStyle: 'none',
          paddingLeft: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {[
          {
            n: '1.',
            title: 'Journey mapping',
            body: 'I mapped user journeys across four key customer types: accountants, CFOs, small business owners, and large business owners. This revealed how different audiences moved through the site, what pages they hit, and where the current experience was failing them.',
          },
          {
            n: '2.',
            title: 'Page identification',
            body: 'From the journey maps, I identified the core pages within those journeys that needed the most attention and defined which ones were within scope.',
          },
          {
            n: '3.',
            title: 'Template definition',
            body: 'I defined page templates to structure content and functionality across the site. Each template established a content hierarchy and narrative logic for its page type: the architecture that would carry the visual layer later.',
          },
          {
            n: '4.',
            title: 'Wireframing',
            body: 'I developed wireframes through iterative client review cycles, translating the templates into detailed layouts that could be handed to the visual design team.',
          },
        ].map((item) => (
          <li key={item.n} style={{ paddingLeft: '28px', position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: 0,
                color: 'var(--faint)',
                fontWeight: 400,
              }}
            >
              {item.n}
            </span>
            <strong
              style={{
                display: 'block',
                fontWeight: 400,
                color: 'var(--text)',
                marginBottom: '4px',
              }}
            >
              {item.title}
            </strong>
            {item.body}
          </li>
        ))}
      </ol>

      <ImageGrid
        images={[
          { src: 'exact-template-homepage.png', alt: 'Page template: homepage narrative structure' },
          { src: 'exact-template-capability.png', alt: 'Page template: capability page' },
        ]}
        caption="Homepage and capability page templates: defining narrative structure before visual design."
      />

      <FullBleedImage
        src="exact-homepage-wireframe.jpg"
        alt="Exact homepage wireframe"
        caption="Homepage wireframe: establishing structure and hierarchy before visual design."
      />

      <div className="cs-divider" />

      {/* ── SOLUTION ─────────────────────────────────── */}
      <h2 className="cs-heading">Structure first. Story second.</h2>

      <p className="cs-body">
        I designed the core structure and key pages of the new platform, including:
      </p>

      <ImageGrid
        images={[
          { src: 'exact-homepage-design.png', alt: 'Hi-fi homepage design' },
          { src: 'exact-capability-design.png', alt: 'Hi-fi capability page design' },
        ]}
        caption="Hi-fi homepage and capability page: visual design applied to the UX structure."
      />

      <p className="cs-body">
        <strong style={{ fontWeight: 400, color: 'var(--text)' }}>Homepage</strong>
        {': '}Introducing Exact, communicating core value, and guiding different audience
        types toward the right product area. The redesign introduced a clearer narrative
        flow: set the stage, show what&apos;s on offer, demonstrate who it&apos;s for,
        and prove why Exact is the expert.
      </p>

      <p className="cs-body">
        <strong style={{ fontWeight: 400, color: 'var(--text)' }}>Capability pages</strong>
        {': '}Showing what the software enables customers to do, proving its importance,
        and connecting it to specific products. These pages bridge the gap between
        problem-awareness and product consideration.
      </p>

      <ImageGrid
        images={[
          { src: 'exact-knowledge-hub-wireframe.png', alt: 'Knowledge hub wireframe' },
          { src: 'exact-knowledge-hub-design.png', alt: 'Knowledge hub hi-fi design' },
        ]}
        caption="Knowledge hub: wireframe to hi-fi. A content destination for thought leadership across audience types."
      />

      <p className="cs-body">
        <strong style={{ fontWeight: 400, color: 'var(--text)' }}>Knowledge hub</strong>
        {': '}A content destination for thought leadership, articles, and videos. The
        redesign structured the hub around audience needs and content formats rather than
        a flat chronological feed.
      </p>

      <ImageGrid
        images={[
          { src: 'exact-product-detail-wireframe.png', alt: 'Product detail page wireframe' },
          { src: 'exact-product-detail-design.png', alt: 'Product detail page hi-fi design' },
        ]}
        caption="Product detail page: wireframe to hi-fi. From product promise to plans and pricing."
      />

      <p className="cs-body">
        <strong style={{ fontWeight: 400, color: 'var(--text)' }}>Product detail pages</strong>
        {': '}Connecting Exact&apos;s value proposition to specific software features,
        showing impact through customer stories, and guiding users toward trial or purchase.
      </p>

      <div className="cs-divider" />

      {/* ── REFLECTION ───────────────────────────────── */}
      <h2 className="cs-heading">What this scale of work clarified.</h2>

      <p className="cs-body">
        Leading this project end-to-end, from scoping workshops through client handover,
        made one thing concrete: on a marketing platform of this complexity, the information
        architecture is the product strategy. Getting the template logic right, understanding
        what each page needed to do and in what sequence, was more consequential than any
        single design decision. The structure either earns attention or it loses it before
        the visual layer ever gets a chance.
      </p>

      <p className="cs-body">
        Working across four distinct audience types simultaneously also sharpened something
        less visible: the ability to hold competing priorities without collapsing them into
        a single compromise. Each audience had legitimate, different needs. The design work
        was in making those distinctions explicit and buildable, not smoothing over them.
      </p>

    </CaseStudyLayout>
  )
}
