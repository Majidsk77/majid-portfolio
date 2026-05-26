'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const ABOUT_WORDS = ['product', 'strategic', 'spatial', 'happy', 'creative']

function AnimatedWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % ABOUT_WORDS.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    // The invisible ghost ("strategic" = longest word) fixes the container
    // width so "designer." never shifts position
    <span className="relative inline-block">
      <span className="invisible select-none" aria-hidden="true">
        strategic
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={ABOUT_WORDS[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-0"
        >
          {ABOUT_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const projects = [
  {
    index: '01',
    tag: 'Design Systems',
    name: 'Google Boba',
    desc: "A scalable design system and template library for Boba screens across Google's global event spaces, bridging Material 3 with the demands of physical-digital environments.",
    client: 'Google',
    year: '2026',
    image: 'boba-hero.png',
    href: '/work/google-boba',
  },
  {
    index: '02',
    tag: 'UX Design · Product Design',
    name: 'IMC Prosperity',
    desc: "A space-themed trading game platform for IMC's annual global student competition, designing an immersive experience for nearly 20,000 competing teams.",
    client: 'IMC',
    year: '2025–26',
    image: 'prosperity-outpost.png',
    href: '/work/imc-prosperity',
  },
  {
    index: '03',
    tag: 'UX Design · Discovery',
    name: 'Exact .com',
    desc: "Redesigning Exact's marketing platform from information-heavy pages to a story-driven experience, built around multiple audience types and a new brand direction.",
    client: 'Exact',
    year: '2025',
    image: 'exact-hero.png',
    href: '/work/exact',
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const isEven = index % 2 === 1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={project.href} className="block group">
        <div
          className="grid grid-cols-1 md:grid-cols-2 border-t border-[var(--border)] hover:bg-black/[0.02] transition-colors duration-300 md:min-h-[420px]"
        >
          {/* Image column — always on top on mobile, alternates on desktop */}
          <div
            className={`relative overflow-hidden h-64 md:h-auto order-first ${
              isEven ? 'md:order-first' : 'md:order-last'
            }`}
          >
            <Image
              src={`/images/${project.image}`}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
            />
          </div>

          {/* Info column */}
          <div
            className={`p-8 md:p-14 flex flex-col justify-center order-last ${
              isEven ? 'md:order-last' : 'md:order-first'
            }`}
          >
            <span className="text-[11px] text-[var(--muted)] tracking-[0.06em] mb-2 block">
              {project.index}
            </span>
            <span className="text-[11px] uppercase tracking-[0.09em] text-[var(--muted)] mb-5 block">
              {project.tag}
            </span>
            <h2 className="font-serif text-[clamp(28px,4vw,50px)] leading-[1.05] tracking-[-0.01em] mb-5">
              {project.name}
            </h2>
            <p className="text-[14px] text-[var(--muted)] leading-[1.7] font-light mb-8 max-w-[360px]">
              {project.desc}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
                {project.client}
              </span>
              <span className="text-[var(--faint)] text-[11px]">·</span>
              <span className="text-[11px] text-[var(--muted)]">{project.year}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function HomePage() {
  return (
    <>
      <Nav />

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative flex items-center justify-center overflow-hidden bg-[var(--bg)]" style={{ height: '100vh' }}>
        {/* Animated orb */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="orb"
            style={{
              width: '600px',
              height: '500px',
              background:
                'radial-gradient(ellipse at 40% 40%, #c4b5f4 0%, #f0b897 50%, #e8a0b0 100%)',
              filter: 'blur(80px)',
              opacity: 0.55,
              borderRadius: '50%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -60%)',
            }}
          />
        </div>

        {/* Text */}
        <div className="relative z-10 text-center px-6">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center mb-7"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] tracking-[0.05em] text-[var(--muted)]"
              style={{
                border: '1px solid rgba(17,17,16,0.13)',
                background: 'rgba(17,17,16,0.03)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#5a9e6f', opacity: 0.85 }}
                aria-hidden="true"
              />
              Available for Product Design roles
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-serif text-center tracking-[-0.025em] leading-[0.92]"
            style={{ fontSize: 'clamp(72px, 10vw, 110px)' }}
          >
            Majid Kareem
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-serif italic text-[var(--muted)] mt-6"
            style={{ fontSize: 'clamp(18px, 2.5vw, 26px)' }}
          >
            Creating strategic interactive experiences.
          </motion.p>

        </div>

        {/* Bottom fade — softens the orb into the next section */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '220px',
            background: 'linear-gradient(to bottom, transparent, var(--bg))',
          }}
        />

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bounce-indicator z-10">
          <span className="text-[var(--faint)] text-[12px] uppercase tracking-[0.12em]">
            ↓
          </span>
        </div>
      </section>

      {/* ── Selected Work ─────────────────────────────── */}
      <section id="work" className="pt-20">
        <div className="px-6 md:px-12 pb-10 flex items-center gap-8">
          <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] whitespace-nowrap shrink-0">
            Selected Work
          </span>
          <div className="flex-grow border-t border-[var(--border)]" />
        </div>

        {projects.map((project, i) => (
          <ProjectCard key={project.href} project={project} index={i} />
        ))}
      </section>

      {/* ── About ─────────────────────────────────────── */}
      <section id="about" className="px-6 md:px-12 py-16 md:py-20 border-t border-[var(--border)]">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-16 items-start">
          {/* Photo */}
          <div
            className="relative overflow-hidden rounded-[2px] max-w-[240px] md:max-w-none"
            style={{ aspectRatio: '3/4' }}
          >
            <Image
              src="/images/headshot.jpg"
              alt="Majid Kareem"
              fill
              className="object-cover"
              style={{ filter: 'grayscale(10%)' }}
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center gap-5 py-4">
            <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
              Amsterdam, Netherlands
            </span>

            <h2 className="font-serif text-[34px] leading-[1.15] tracking-[-0.01em]">
              Majid Kareem,
              <br />
              <em><AnimatedWord /> designer.</em>
            </h2>

            <p className="text-[16px] text-[var(--muted)] leading-[1.75] font-light max-w-[420px]">
              I'm interested in what digital experiences could be, not just what
              they are. Exploring new ideas, shaping them into something
              tangible, and making them feel intuitive and engaging to use.
              Especially curious about how emerging technologies can open up
              entirely new kinds of interactions.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="mailto:majidsajid@outlook.com"
                className="text-[12px] uppercase tracking-[0.08em] underline underline-offset-4 text-[var(--text)] hover:text-[var(--muted)] transition-colors duration-200"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/majid-kareem/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] uppercase tracking-[0.08em] underline underline-offset-4 text-[var(--text)] hover:text-[var(--muted)] transition-colors duration-200"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
