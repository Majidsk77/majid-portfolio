# Portfolio Redesign — AI Working Context

Reference for Claude Code prompts on the `redesign/v2` branch.
Keep prompts scoped to relevant files only; avoid repo-wide scans.

---

## 1. Goal

**Primary:** land Product Designer and UX Designer interviews.
**Secondary:** show personality and experimentation without reducing recruiter usability.

---

## 2. Current Workflow

| Thing | Detail |
|---|---|
| `main` | stable production (majidkareem.com) |
| `redesign/v2` | active redesign branch |
| `/v2` route | redesign sandbox (`app/v2/`) |
| Source of truth | GitHub (`Majidsk77/majid-portfolio`, SSH origin) |
| Previews | Vercel GitHub integration — push branch, get preview URL |
| CLI deploys | only when explicitly requested |

Do not merge `redesign/v2` into `main` without explicit instruction.

---

## 3. Design Direction

The homepage is a **lobby** containing three distinct worlds.
These are destinations, not generic navigation cards.

| World | Purpose |
|---|---|
| AI Playground | experimental side projects and AI explorations |
| Selected Work | professional case studies |
| About Me | personal context |

---

## 4. World Personalities

**AI Playground** — experimental, playful, digital, exploratory
**Selected Work** — professional, editorial, product-focused, calm
**About Me** — warm, personal, human

Each world should feel visually and atmospherically distinct on hover.
The distinction is personality, not gimmickry.

---

## 5. Design Principles

- Minimal and intentional
- Memorable without being loud
- Calm by default, personality on interaction
- Authored — feels like a specific person made this

**Avoid:**
- excessive or decorative animation
- portfolio clichés (gradients for no reason, floating blobs, hero countdown timers)
- startup-generic aesthetics (Inter everywhere, card grids, "Let's work together" CTAs)
- gimmicks that slow down recruiters

---

## 6. Interaction Philosophy

**Default state:** calm, clear, recruiter-friendly. Everything findable in seconds.

**Hover state:** reveal personality, atmosphere, and destination character.
Transitions should feel smooth and intentional, not performative.

---

## 7. Portfolio Priorities

1. Work must remain easy to find
2. Personality should support credibility, not undermine it
3. Homepage should feel authored by a specific designer
4. Case studies must stay concise and scannable
5. Fast load — no heavy dependencies added for cosmetic reasons

---

## 8. Technical Preferences

- Prefer existing components and patterns
- Avoid unnecessary refactors
- Avoid new npm dependencies
- Respect `prefers-reduced-motion` on all animations
- Preserve keyboard navigation and focus states
- Mobile-first QA (hamburger menu, card stacking, font scaling)
- Inline styles for per-component color tokens; Tailwind for layout/spacing utilities
- `next/font/google` for font loading — Hanken Grotesk scoped to `/v2` only

---

## 9. Claude Working Style

**For implementation tasks:**
- Inspect only files relevant to the task
- Avoid repository-wide scans
- Avoid large refactors unless explicitly requested
- Keep response summaries concise
- List files changed
- Call out manual QA items

**When uncertain:**
- Ask before redesigning major concepts
- Preserve existing design direction — improve, don't replace
- If Figma design and code diverge, flag it rather than silently resolving it

**Scoping shortcuts:**
- `/v2` work lives in `app/v2/` — start there
- Shared components: `components/Nav.tsx`, `components/Footer.tsx`, `components/EmailCopy.tsx`
- Do not modify production pages (`app/page.tsx`, `app/work/**`) during `/v2` iterations
