'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Nav from './Nav'
import Footer from './Footer'

interface Props {
  title: string
  subtitle: string
  tags: string[]
  client: string
  year: string
  role: string
  heroImage: string
  heroAlt: string
  heroPosition?: 'center' | 'top'
  nextProject: { label: string; href: string }
  children: React.ReactNode
}

export default function CaseStudyLayout({
  title,
  subtitle,
  tags,
  client,
  year,
  role,
  heroImage,
  heroAlt,
  heroPosition = 'center',
  nextProject,
  children,
}: Props) {
  return (
    <>
      <Nav />

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full"
        style={{ height: '65vh', marginTop: 0 }}
      >
        <Image
          src={`/images/${heroImage}`}
          alt={heroAlt}
          fill
          className={`object-cover ${heroPosition === 'top' ? 'object-top' : 'object-center'}`}
          priority
        />
      </motion.div>

      {/* Header block */}
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] uppercase tracking-[0.08em] bg-black/5 px-3 py-1 rounded-full text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-serif text-[clamp(38px,5vw,62px)] tracking-[-0.02em] mt-4 leading-[1.05]">
          {title}
        </h1>

        <p className="text-[18px] text-[var(--muted)] mt-3 font-light leading-[1.6]">
          {subtitle}
        </p>

        <hr className="border-[var(--border)] my-8" />

        <div className="flex flex-wrap gap-8">
          <span className="text-[12px] uppercase tracking-[0.1em] text-[var(--muted)]">
            {client}
          </span>
          <span className="text-[12px] uppercase tracking-[0.1em] text-[var(--muted)]">
            {year}
          </span>
          <span className="text-[12px] uppercase tracking-[0.1em] text-[var(--muted)]">
            {role}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-[760px] mx-auto px-6 pb-24">
        {children}
      </div>

      {/* Next project strip */}
      <div className="w-full border-t border-[var(--border)] px-6 md:px-12 py-10 md:py-16 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
          Next Project
        </span>
        <Link
          href={nextProject.href}
          className="font-serif text-[24px] md:text-[32px] tracking-[-0.01em] group flex items-center gap-3 hover:gap-5 transition-all duration-300"
        >
          {nextProject.label}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </Link>
      </div>

      <Footer />
    </>
  )
}
