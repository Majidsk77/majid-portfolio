'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

const EMAIL = 'majidsajid@outlook.com'
const RESUME_URL =
  'https://drive.google.com/file/d/1-40FvUisOKLs-e9uVBAJ3Ftg8TM9EUVK/view?usp=sharing'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Clean up the toast timer on unmount
  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current)
    }
  }, [])

  const close = () => setMenuOpen(false)

  const showCopied = () => {
    setCopied(true)
    if (copyTimer.current) clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopied(false), 2000)
  }

  // Copy email to clipboard (Clipboard API + legacy fallback). Never opens mailto.
  const copyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL)
        showCopied()
        return
      }
    } catch {
      // fall through to the legacy fallback below
    }
    try {
      const ta = document.createElement('textarea')
      ta.value = EMAIL
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.top = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      showCopied()
    } catch {
      // Last resort: nothing destructive, no mailto fallback per spec
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-12 py-5 md:py-7 backdrop-blur-sm transition-all duration-300 ${
          scrolled ? 'border-b border-[var(--border)]' : ''
        }`}
        style={{ background: 'rgba(247,245,240,0.85)' }}
      >
        <Link
          href="/"
          onClick={close}
          className="font-serif text-[15px] tracking-[-0.01em] text-[var(--text)]"
        >
          Majid Kareem
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#work"
            className="text-[11px] uppercase tracking-[0.1em] font-normal text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
          >
            Work
          </Link>
          <Link
            href="/#about"
            className="text-[11px] uppercase tracking-[0.1em] font-normal text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
          >
            About
          </Link>
          <a
            href="https://drive.google.com/file/d/1-40FvUisOKLs-e9uVBAJ3Ftg8TM9EUVK/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.1em] font-normal text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="text-[11px] uppercase tracking-[0.1em] font-normal text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200 cursor-pointer"
          >
            Contact
          </button>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden relative z-50 flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className="block w-5 h-[1.5px] bg-[var(--text)] transition-all duration-300 origin-center"
            style={{ transform: menuOpen ? 'rotate(45deg) translateY(6.5px)' : 'none' }}
          />
          <span
            className="block w-5 h-[1.5px] bg-[var(--text)] transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none' }}
          />
          <span
            className="block w-5 h-[1.5px] bg-[var(--text)] transition-all duration-300 origin-center"
            style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none' }}
          />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-10 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(247,245,240,0.97)', backdropFilter: 'blur(12px)' }}
      >
        {[
          { label: 'Work', href: '/#work', external: false, copy: false },
          { label: 'About', href: '/#about', external: false, copy: false },
          { label: 'Resume', href: RESUME_URL, external: true, copy: false },
          { label: 'Contact', href: '', external: false, copy: true },
        ].map((item, i) =>
          item.copy ? (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                copyEmail()
                close()
              }}
              className="font-serif italic text-[42px] tracking-[-0.01em] text-[var(--text)] hover:text-[var(--muted)] transition-colors duration-200 cursor-pointer"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.35s ease ${i * 70}ms, transform 0.35s ease ${i * 70}ms, color 0.2s`,
              }}
            >
              {item.label}
            </button>
          ) : item.external ? (
            <a
              key={item.label}
              href={item.href}
              onClick={close}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-serif italic text-[42px] tracking-[-0.01em] text-[var(--text)] hover:text-[var(--muted)] transition-colors duration-200"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.35s ease ${i * 70}ms, transform 0.35s ease ${i * 70}ms, color 0.2s`,
              }}
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              onClick={close}
              className="font-serif italic text-[42px] tracking-[-0.01em] text-[var(--text)] hover:text-[var(--muted)] transition-colors duration-200"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.35s ease ${i * 70}ms, transform 0.35s ease ${i * 70}ms, color 0.2s`,
              }}
            >
              {item.label}
            </Link>
          )
        )}
      </div>

      {/* Copy-email toast — aria-live, fixed, never shifts layout */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] pointer-events-none transition-all duration-300 ${
          copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {copied && (
          <span
            className="inline-flex items-center px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.08em] text-[var(--text)]"
            style={{
              border: '1px solid var(--border)',
              background: 'rgba(247,245,240,0.95)',
              backdropFilter: 'blur(8px)',
            }}
          >
            Email copied
          </span>
        )}
      </div>
    </>
  )
}
