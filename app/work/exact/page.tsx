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

export default function ExactPage() {
  return (
    <CaseStudyLayout
      title="Exact .com"
      subtitle="Redesigning a marketing platform to tell a clearer, more human story"
      tags={['UX Strategy', 'UX Design', 'Discovery']}
      client="Exact"
      year="2025"
      role="UX Designer & UX Strategist"
      heroImage="exact-homepage-design.png"
      heroAlt="Exact.com hi-fi homepage design"
      heroPosition="top"
      nextProject={{ label: 'Google Boba', href: '/work/google-boba' }}
    >

      {/* ── OUTCOME ─────────────────────────────────── */}
      <h2 className="cs-heading">A new foundation. Launching 2026.</h2>

      <p className="cs-body">
        The redesign was well received by stakeholders and is set to launch in
        2026 alongside updated branding. The project delivered the full UX
        foundation for a major website overhaul, defining the structure,
        templates, and key pages that will underpin Exact's new digital presence.
      </p>

      <StatRow
        stats={[
          { value: '4', label: 'audience types mapped' },
          { value: '4', label: 'core page templates defined' },
        ]}
      />

      <div className="cs-divider" />

      {/* ── PROBLEM ─────────────────────────────────── */}
      <h2 className="cs-heading">A site built for experts, not for everyone.</h2>

      <p className="cs-body">
        Exact's existing website was highly information-dense, with heavy
        cross-linking and limited narrative structure. While effective for
        existing users who already understood the product landscape, it lacked
        clarity for new visitors, particularly those outside Exact's traditional
        accountant audience.
      </p>

      <p className="cs-body">
        The challenge was threefold: restructure the platform to communicate
        product value more clearly, support a broader audience including CFOs and
        entrepreneurs, and align with an upcoming brand direction, while
        respecting existing content and avoiding disruption to live product pages.
      </p>

      <FullBleedImage
        src="exact-journey-accountant.png"
        alt="User journey map — accountant moving through the existing site"
        caption="User journey mapping: understanding how an accountant moves through the existing site."
      />

      <div className="cs-divider" />

      {/* ── APPROACH ─────────────────────────────────── */}
      <h2 className="cs-heading">From workshops to wireframes.</h2>

      <p className="cs-body">
        I led the UX process from early discovery through to handover. We started
        with a scoping workshop to align on audiences, business goals, and
        constraints, establishing a shared understanding of what the redesign
        needed to achieve before any design work began.
      </p>

      <p className="cs-body">
        From there, the process moved through four key phases:
      </p>

      <ImageGrid
        images={[
          { src: 'exact-journey-cfo.png', alt: 'User journey — CFO value journey' },
          { src: 'exact-journey-small-biz.png', alt: 'User journey — Small Business Owner self-service journey' },
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
            body: 'I defined page templates to structure content and functionality across the site. Each template established a content hierarchy and narrative logic for its page type.',
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
          { src: 'exact-template-homepage.png', alt: 'Page template — homepage narrative structure' },
          { src: 'exact-template-capability.png', alt: 'Page template — capability page' },
        ]}
        caption="Page templates: homepage and capability page — defining the narrative structure before visual design."
      />

      <FullBleedImage
        src="exact-homepage-wireframe.jpg"
        alt="Exact homepage wireframe"
        caption="Homepage wireframe — establishing structure and hierarchy before visual design."
      />

      <div className="cs-divider" />

      {/* ── SOLUTION ─────────────────────────────────── */}
      <h2 className="cs-heading">Structure first. Story second.</h2>

      <p className="cs-body">
        I designed the core structure and key pages of the new platform across
        four page types:
      </p>

      <ImageGrid
        images={[
          { src: 'exact-homepage-design.png', alt: 'Hi-fi homepage design' },
          { src: 'exact-capability-design.png', alt: 'Hi-fi capability page design' },
        ]}
        caption="Hi-fi homepage and capability page — visual design applied to the UX structure."
      />

      <p className="cs-body">
        <strong style={{ fontWeight: 400, color: 'var(--text)' }}>Homepage</strong>
        {': '}Introducing Exact, communicating core value, and guiding different
        audience types toward the right product area. The redesign introduced a
        clearer narrative flow: set the stage, show what's on offer, demonstrate
        who it's for, and prove why Exact is the expert.
      </p>

      <p className="cs-body">
        <strong style={{ fontWeight: 400, color: 'var(--text)' }}>Capability pages</strong>
        {': '}Showing what the software enables customers to do, proving its
        importance, and connecting it to specific products. These pages bridge
        the gap between problem-awareness and product consideration.
      </p>

      <ImageGrid
        images={[
          { src: 'exact-knowledge-hub-wireframe.png', alt: 'Knowledge hub wireframe' },
          { src: 'exact-knowledge-hub-design.png', alt: 'Knowledge hub hi-fi design' },
        ]}
        caption="Knowledge hub — wireframe to hi-fi. A content destination for thought leadership across audience types."
      />

      <p className="cs-body">
        <strong style={{ fontWeight: 400, color: 'var(--text)' }}>Knowledge hub</strong>
        {': '}A content destination for thought leadership, articles, and videos.
        The redesign structured the hub around audience needs and content formats
        rather than a flat chronological feed.
      </p>

      <ImageGrid
        images={[
          { src: 'exact-product-detail-wireframe.png', alt: 'Product detail page wireframe' },
          { src: 'exact-product-detail-design.png', alt: 'Product detail page hi-fi design' },
        ]}
        caption="Product detail page — wireframe to hi-fi. From product promise to plans and pricing."
      />

      <p className="cs-body">
        <strong style={{ fontWeight: 400, color: 'var(--text)' }}>Product detail pages</strong>
        {': '}Connecting Exact's value proposition to specific software features,
        showing impact through customer stories, and guiding users toward trial
        or purchase.
      </p>

      <div className="cs-divider" />

      {/* ── TAKEAWAYS ─────────────────────────────────── */}
      <h2 className="cs-heading">What I learned.</h2>

      <p className="cs-body">
        This project strengthened my ability to lead UX work end-to-end, from
        shaping the initial brief and running workshops to structuring complex
        content and collaborating across disciplines.
      </p>

      <p className="cs-body">
        The most valuable lesson was about the relationship between structure and
        story. On a large marketing site, the architecture is the argument.
        Getting the page templates right, understanding what each page needs to
        do, in what order and for whom, was more impactful than any individual
        design decision.
      </p>

      <p className="cs-body">
        Working across four distinct audience types also sharpened my ability to
        hold multiple perspectives simultaneously without letting any single one
        dominate the solution.
      </p>


    </CaseStudyLayout>
  )
}
