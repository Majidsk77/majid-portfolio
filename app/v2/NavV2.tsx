'use client'

// NavV2 — /v2-specific navigation matching the Figma homepage design (node 1:5).
// Figma spec: Hanken Grotesk 400 16px, pill borders rgba(217,217,217,0.7), radius 30px,
// pt-32 pb-24 px-40, logo left / Work+About+Contact right.
// Do NOT use this in any other route — this is a /v2 sandbox component.

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useEmailCopy, EmailCopyToast } from '@/components/EmailCopy'

// ── Selected work — projects shown in the Work dropdown ───────────────────────
// No dedicated company logos exist in /public, so each item uses a tasteful
// initials avatar as a fallback (see summary).
const WORK_PROJECTS: { name: string; href: string; initials: string; color: string }[] = [
  { name: 'Google Boba',    href: '/v2/work/google-boba',    initials: 'GB',  color: '#eef2f8' },
  { name: 'Exact.com',      href: '/v2/work/exact',          initials: 'E',   color: '#eaf3ee' },
  { name: 'IMC Prosperity', href: '/v2/work/imc-prosperity', initials: 'IMC', color: '#f3eef7' },
]

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

// Shared pill styling — used by Pill and the Work dropdown trigger so they
// stay visually identical.
function pillStyle(active: boolean): React.CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    borderRadius: '30px',
    border: `1px solid ${active ? 'rgba(217,217,217,1)' : 'rgba(217,217,217,0.7)'}`,
    background: active ? 'rgba(17,17,16,0.03)' : 'transparent',
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
}

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

  const style = pillStyle(hovered)

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

// ── Initials avatar — logo fallback for a project ─────────────────────────────

function ProjectAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '8px',
        background: color,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: initials.length > 2 ? '9px' : '11px',
        fontWeight: 600,
        letterSpacing: '0.02em',
        color: '#3a3a37',
        flexShrink: 0,
      }}
    >
      {initials}
    </span>
  )
}

// ── WorkDropdown — click-to-open list of selected work (desktop nav) ───────────

function WorkDropdown() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Escape closes (returns focus to trigger); click outside closes
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus() }
    }
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (
        panelRef.current && !panelRef.current.contains(t) &&
        btnRef.current && !btnRef.current.contains(t)
      ) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onDown)
    }
  }, [open])

  // arrow-key navigation between items
  const onPanelKey = (e: React.KeyboardEvent) => {
    const items = Array.from(
      panelRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]') ?? []
    )
    const idx = items.indexOf(document.activeElement as HTMLAnchorElement)
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length]?.focus() }
    else if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length]?.focus() }
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOpen(true)
            requestAnimationFrame(() =>
              panelRef.current?.querySelector<HTMLAnchorElement>('[role="menuitem"]')?.focus()
            )
          }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        style={pillStyle(hovered || open)}
      >
        Work
        <span style={{ display: 'inline-flex', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
          <ChevronDown />
        </span>
      </button>

      <div
        ref={panelRef}
        role="menu"
        aria-label="Selected work"
        aria-hidden={!open}
        onKeyDown={onPanelKey}
        style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          minWidth: '232px',
          background: '#fffefb',
          border: '1px solid rgba(217,217,217,0.7)',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(17,17,16,0.10)',
          padding: '6px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          zIndex: 60,
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.98)',
          transformOrigin: 'top right',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.2s ease, transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {WORK_PROJECTS.map(p => (
          <Link
            key={p.href}
            href={p.href}
            role="menuitem"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="v2-work-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '11px',
              padding: '9px 10px',
              borderRadius: '10px',
              textDecoration: 'none',
              color: '#111110',
              fontSize: '15px',
              outline: 'none',
            }}
          >
            <ProjectAvatar initials={p.initials} color={p.color} />
            <span>{p.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Small icons for the Contact items ────────────────────────────────────────

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="8" height="8" rx="1.6" stroke="#3a3a37" strokeWidth="1.3" />
      <path d="M10 5V3.2A1.5 1.5 0 0 0 8.5 1.7h-5A1.5 1.5 0 0 0 2 3.2v5A1.5 1.5 0 0 0 3.5 9.7H5" stroke="#3a3a37" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function ResumeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="2.5" y="1.5" width="10" height="12" rx="1.5" stroke="#3a3a37" strokeWidth="1.3" />
      <path d="M5 5h5M5 7.5h5M5 10h3" stroke="#3a3a37" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M3.2 5.6v6M3.2 3.3v.01M6.2 11.6v-3.4a1.8 1.8 0 0 1 3.6 0v3.4M6.2 5.6v6" stroke="#3a3a37" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── ContactDropdown — click-to-open Email (copy) + LinkedIn (desktop nav) ──────

function ContactDropdown({ onCopyEmail }: { onCopyEmail: () => void }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus() }
    }
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (
        panelRef.current && !panelRef.current.contains(t) &&
        btnRef.current && !btnRef.current.contains(t)
      ) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onDown)
    }
  }, [open])

  const onPanelKey = (e: React.KeyboardEvent) => {
    const items = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []
    )
    const idx = items.indexOf(document.activeElement as HTMLElement)
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length]?.focus() }
    else if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length]?.focus() }
  }

  const iconHolder: React.CSSProperties = {
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    background: '#f1f0ec',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  }

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '11px',
    padding: '9px 10px',
    borderRadius: '10px',
    textDecoration: 'none',
    color: '#111110',
    fontSize: '15px',
    outline: 'none',
    width: '100%',
    background: 'none',
    border: 'none',
    fontFamily: 'inherit',
    cursor: 'pointer',
    textAlign: 'left',
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOpen(true)
            requestAnimationFrame(() =>
              panelRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus()
            )
          }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        style={pillStyle(hovered || open)}
      >
        Contact
        <span style={{ display: 'inline-flex', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
          <ChevronDown />
        </span>
      </button>

      <div
        ref={panelRef}
        role="menu"
        aria-label="Contact"
        aria-hidden={!open}
        onKeyDown={onPanelKey}
        style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          minWidth: '260px',
          background: '#fffefb',
          border: '1px solid rgba(217,217,217,0.7)',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(17,17,16,0.10)',
          padding: '6px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          zIndex: 60,
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.98)',
          transformOrigin: 'top right',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.2s ease, transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <button
          type="button"
          role="menuitem"
          tabIndex={open ? 0 : -1}
          onClick={() => { onCopyEmail(); setOpen(false) }}
          className="v2-work-item"
          style={itemStyle}
        >
          <span aria-hidden="true" style={iconHolder}><CopyIcon /></span>
          <span>majidsajid@outlook.com</span>
        </button>
        <a
          href="https://drive.google.com/file/d/1-40FvUisOKLs-e9uVBAJ3Ftg8TM9EUVK/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          role="menuitem"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className="v2-work-item"
          style={itemStyle}
        >
          <span aria-hidden="true" style={iconHolder}><ResumeIcon /></span>
          <span>Resume ↗</span>
        </a>
        <a
          href="https://www.linkedin.com/in/majid-kareem/"
          target="_blank"
          rel="noopener noreferrer"
          role="menuitem"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className="v2-work-item"
          style={itemStyle}
        >
          <span aria-hidden="true" style={iconHolder}><LinkedInIcon /></span>
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  )
}

// ── NavV2 ─────────────────────────────────────────────────────────────────────

export default function NavV2({ flow = false }: { flow?: boolean } = {}) {
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
          // `flow` makes the nav static (scrolls with the page) — used on V2
          // case study pages; default stays fixed for the lobby/room pages.
          position: flow ? 'static' : 'fixed',
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
          <WorkDropdown />
          <Pill href="/v2/about">
            About
          </Pill>
          <ContactDropdown onCopyEmail={copyEmail} />
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
        {/* Primary links */}
        {[
          { label: 'Work',    href: '/v2/selected-work' },
          { label: 'About',   href: '/v2/about' },
        ].map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={close}
            style={{
              fontSize: '36px',
              fontWeight: 400,
              color: '#111110',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity 0.3s ease ${i * 60}ms, transform 0.3s ease ${i * 60}ms`,
            }}
          >
            {item.label}
          </Link>
        ))}

        {/* Case study sub-links */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.3s ease 120ms, transform 0.3s ease 120ms',
          }}
        >
          {WORK_PROJECTS.map(p => (
            <Link
              key={p.href}
              href={p.href}
              onClick={close}
              style={{
                fontSize: '16px',
                color: '#6b6b67',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                padding: '6px 14px',
                borderRadius: '20px',
                border: '1px solid rgba(17,17,16,0.12)',
              }}
            >
              {p.name}
            </Link>
          ))}
        </div>

        {/* Contact — copies email */}
        <button
          type="button"
          onClick={() => { copyEmail(); close() }}
          style={{
            fontSize: '36px',
            fontWeight: 400,
            color: '#111110',
            letterSpacing: '-0.02em',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.3s ease 180ms, transform 0.3s ease 180ms',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Contact
        </button>
      </div>

      <EmailCopyToast copied={copied} />

      <style>{`
        .v2-work-item:hover { background: rgba(17, 17, 16, 0.05); }
        .v2-work-item:focus-visible {
          background: rgba(17, 17, 16, 0.05);
          outline: 2px solid rgba(121, 175, 182, 0.6);
          outline-offset: 1px;
        }
      `}</style>
    </>
  )
}
