export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] px-6 md:px-12 py-8 md:py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <span className="font-serif text-[14px] text-[var(--text)]">
          Majid Kareem
        </span>

        <span className="text-[11px] text-[var(--muted)]">
          © {new Date().getFullYear()} Majid Kareem
        </span>

        <div className="flex items-center gap-6 md:justify-end">
          <a
            href="mailto:majidsajid@outlook.com"
            className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
          >
            Email
          </a>
          <span className="text-[var(--faint)] text-[11px]">·</span>
          <a
            href="https://www.linkedin.com/in/majid-kareem/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
