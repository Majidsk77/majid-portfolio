'use client'

// NavV2 — /v2-specific navigation matching the Figma homepage design (node 1:5).
// Figma spec: Hanken Grotesk 400 16px, pill borders rgba(217,217,217,0.7), radius 30px,
// pt-32 pb-24 px-40, logo left / Work+About+Contact right.
// Do NOT use this in any other route — this is a /v2 sandbox component.

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useEmailCopy, EmailCopyToast } from '@/components/EmailCopy'

// ── Chevron-down icon (matches Figma ionicons chevron-down-outline) ───────────

function ChevronDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M3.5 5.25L7 8.75L10.5 5.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ── Pill — shared pill wrapper for all nav items ──────────────────────────────

function Pill({
  href,
  onClick,
  children,
}: {
  href?: string
  onClick?: () => void
  children: React.ReactNode
}) {
  const [hovered, setHovered] = useState(false)

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    borderRadius: '30px',
    border: `1px solid ${hovered ? 'rgba(217,217,217,1)' : 'rgba(217,217,217,0.7)'}`,
    background: hovered ? 'rgba(17,17,16,0.03)' : 'transparent',
    fontSize: '16px',
    fontWeight: 400,
    color: '#111110',
    textDecoration: 'none',
    cursor: 'pointer',
    lineHeight: 'normal',
    whiteSpace: 'nowrap',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease, background 0.2s ease',
    outline: 'none',
  }

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus:      () => setHovered(true),
    onBlur:       () => setHovered(false),
  }

  if (href) {
    return (
      <Link href={href} style={style} {...handlers}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} style={style} {...handlers}>
      {children}
    </button>
  )
}

// ── NavV2 ─────────────────────────────────────────────────────────────────────

export default function NavV2() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { copied, copyEmail } = useEmailCopy()

  // Escape closes mobile menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      {/* ── Navbar ────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          // Figma: pt-32 pb-24 px-40 — scale px with viewport
          paddingTop: '32px',
          paddingBottom: '24px',
          paddingLeft: 'clamp(20px, 2.78vw, 40px)',
          paddingRight: 'clamp(20px, 2.78vw, 40px)',
          background: 'transparent',
        }}
      >
        {/* Logo pill */}
        <Pill href="/v2">Majid Kareem</Pill>

        {/* Desktop nav — Work / About / Contact */}
        <div
          style={{ gap: '16px', alignItems: 'center' }}
          className="hidden md:flex"
        >
          <Pill href="/#work">
            Work <ChevronDown />
          </Pill>
          <Pill href="/#about">
            About
          </Pill>
          <Pill onClick={copyEmail}>
            Contact <ChevronDown />
          </Pill>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="md:hidden"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            color: '#111110',
            zIndex: 51,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="16" y2="16" stroke="#111110" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="16" y1="4" x2="4" y2="16" stroke="#111110" strokeWidth="1.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="4" y1="6" x2="16" y2="6" stroke="#111110" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="4" y1="10" x2="16" y2="10" stroke="#111110" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="4" y1="14" x2="16" y2="14" stroke="#111110" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* ── Mobile fullscreen menu ─────────────────────── */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          background: 'rgba(247, 245, 240, 0.97)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        {[
          { label: 'Work',    href: '/#work',  chevron: true,  copy: false },
          { label: 'About',   href: '/#about', chevron: false, copy: false },
          { label: 'Contact', href: '',         chevron: true,  copy: true  },
        ].map((item, i) => {
          const itemStyle: React.CSSProperties = {
            fontSize: '36px',
            fontWeight: 400,
            color: '#111110',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity 0.3s ease ${i * 60}ms, transform 0.3s ease ${i * 60}ms`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }

          if (item.copy) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => { copyEmail(); close() }}
                style={itemStyle}
              >
                {item.label}
              </button>
            )
          }
          return (
            <Link key={item.label} href={item.href} onClick={close} style={itemStyle}>
              {item.label}
            </Link>
          )
        })}
      </div>

      <EmailCopyToast copied={copied} />
    </>
  )
}
