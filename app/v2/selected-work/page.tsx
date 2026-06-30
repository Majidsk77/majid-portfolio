import type { Metadata } from 'next'
import Link from 'next/link'
import RoomFrame from '../RoomFrame'

// Selected Work room — entered from the /v2 lobby's Selected Work world.
// The professional/editorial room: each project is a thumbnail card with a
// tactile 3D pill button below carrying the project name. Reuses the shared
// RoomFrame (nav, footer, bordered container). Matches Figma node 26:3384.

export const metadata: Metadata = {
  title: 'Selected Work',
  description: 'Selected product & UX case studies.',
}

interface Project {
  name: string
  href: string
  thumb: string
  // 3D pill palette per project (matches the Figma reference)
  fill: string
  lip: string   // darker "key cap" lip that gives the button depth
}

const PROJECTS: Project[] = [
  { name: 'Google Boba',    href: '/v2/work/google-boba', thumb: '/images/boba-hero.png',        fill: '#d9c9f6', lip: '#b69fe6' },
  { name: 'Exact.com',      href: '/v2/work/exact',      thumb: '/images/exact-hero.png',       fill: '#f8c4bf', lip: '#e89a92' },
  { name: 'IMC Prosperity', href: '/work/imc-prosperity', thumb: '/images/prosperity-outpost.png', fill: '#bdd9f1', lip: '#90bce2' },
]

export default function SelectedWorkRoom() {
  return (
    <RoomFrame contentStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      {/* Decorative 8-bit clouds — atmospheric, sit behind the cards */}
      <div className="sw-clouds" aria-hidden="true">
        <span className="sw-cloud sw-cloud--1" />
        <span className="sw-cloud sw-cloud--2" />
        <span className="sw-cloud sw-cloud--3" />
        <span className="sw-cloud sw-cloud--4" />
        <span className="sw-cloud sw-cloud--5" />
        <span className="sw-cloud sw-cloud--6" />
      </div>

      <div className="sw-grid">
        {PROJECTS.map(p => (
          <Link
            key={p.href}
            href={p.href}
            className="sw-card"
            aria-label={`${p.name}, open case study`}
            style={{ ['--fill' as string]: p.fill, ['--lip' as string]: p.lip }}
          >
            {/* Character-select arrow — appears above the active project */}
            <span className="sw-arrow" aria-hidden="true" />
            <span className="sw-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.thumb} alt="" aria-hidden="true" />
            </span>
            <span className="sw-btn">{p.name}</span>
          </Link>
        ))}
      </div>

      <style>{`
        .sw-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 3vw, 44px);
          width: 100%;
          max-width: 1040px;
          margin: 0 auto;
        }
        .sw-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
          text-decoration: none;
          outline: none;
        }

        /* ── 8-bit clouds — pixel silhouettes drawn with box-shadow ────────── */
        .sw-clouds {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
          border-radius: inherit;
        }
        .sw-cloud {
          position: absolute;
          width: 6px; height: 6px;
          background: transparent;
          opacity: 0.6;
          image-rendering: pixelated;
          --c: #c4def0;
          box-shadow:
            0 18px 0 var(--c), 6px 18px 0 var(--c), 12px 18px 0 var(--c), 18px 18px 0 var(--c), 24px 18px 0 var(--c), 30px 18px 0 var(--c), 36px 18px 0 var(--c), 42px 18px 0 var(--c), 48px 18px 0 var(--c), 54px 18px 0 var(--c),
            6px 12px 0 var(--c), 12px 12px 0 var(--c), 18px 12px 0 var(--c), 24px 12px 0 var(--c), 30px 12px 0 var(--c), 36px 12px 0 var(--c), 42px 12px 0 var(--c), 48px 12px 0 var(--c),
            12px 6px 0 var(--c), 18px 6px 0 var(--c), 24px 6px 0 var(--c), 30px 6px 0 var(--c), 36px 6px 0 var(--c), 42px 6px 0 var(--c),
            18px 0 0 var(--c), 24px 0 0 var(--c), 30px 0 0 var(--c);
        }
        .sw-cloud--1 { left: 4%;  top: 15%; transform: scale(1); }
        .sw-cloud--2 { left: 84%; top: 11%; transform: scale(1.1); }
        .sw-cloud--3 { left: 1%;  top: 47%; transform: scale(0.8); opacity: 0.5; }
        .sw-cloud--4 { left: 9%;  top: 80%; transform: scale(1); }
        .sw-cloud--5 { left: 60%; top: 72%; transform: scale(0.9); opacity: 0.5; }
        .sw-cloud--6 { left: 82%; top: 82%; transform: scale(1.05); }
        @media (prefers-reduced-motion: no-preference) {
          .sw-cloud { animation: swDrift 9s ease-in-out infinite alternate; }
          .sw-cloud--2 { animation-duration: 11s; }
          .sw-cloud--3 { animation-duration: 7.5s; }
          .sw-cloud--4 { animation-duration: 10s; }
          .sw-cloud--5 { animation-duration: 8.5s; }
          .sw-cloud--6 { animation-duration: 12s; }
        }
        @keyframes swDrift {
          from { translate: 0 0; }
          to   { translate: 6px 0; }
        }

        /* ── Character-select arrow — pixel down-triangle above the card ───── */
        .sw-arrow {
          position: absolute;
          top: -32px;
          left: 50%;
          margin-left: -18px;     /* half the ~36px triangle width */
          width: 6px; height: 6px;
          background: var(--lip);
          image-rendering: pixelated;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s steps(2, end);
          box-shadow:
            0 0 0 var(--lip), 6px 0 0 var(--lip), 12px 0 0 var(--lip), 18px 0 0 var(--lip), 24px 0 0 var(--lip), 30px 0 0 var(--lip), 36px 0 0 var(--lip),
            6px 6px 0 var(--lip), 12px 6px 0 var(--lip), 18px 6px 0 var(--lip), 24px 6px 0 var(--lip), 30px 6px 0 var(--lip),
            12px 12px 0 var(--lip), 18px 12px 0 var(--lip), 24px 12px 0 var(--lip),
            18px 18px 0 var(--lip);
        }
        .sw-card:hover .sw-arrow,
        .sw-card:focus-visible .sw-arrow { opacity: 1; }
        @media (prefers-reduced-motion: no-preference) {
          .sw-card:hover .sw-arrow,
          .sw-card:focus-visible .sw-arrow { animation: swArrowBounce 0.6s steps(2, end) infinite alternate; }
        }
        @keyframes swArrowBounce {
          from { transform: translateY(0); }
          to   { transform: translateY(6px); }
        }
        /* Thumbnail */
        .sw-thumb {
          display: block;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 18px;
          overflow: hidden;
          background: #ece7df;
          border: 1px solid rgba(17,17,16,0.06);
          box-shadow: 0 6px 18px rgba(17,17,16,0.08);
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s ease;
        }
        .sw-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .sw-card:hover .sw-thumb,
        .sw-card:focus-visible .sw-thumb {
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(17,17,16,0.14);
        }

        /* Tactile 3D pill button */
        .sw-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 26px;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 500;
          color: #1c1a17;
          letter-spacing: -0.01em;
          white-space: nowrap;
          background: var(--fill);
          /* the "lip" is a hard offset shadow → reads as a raised key cap */
          box-shadow: 0 5px 0 var(--lip), 0 8px 14px rgba(17,17,16,0.14);
          transform: translateY(0);
          transition: transform 0.14s ease, box-shadow 0.14s ease;
        }
        .sw-card:hover .sw-btn,
        .sw-card:focus-visible .sw-btn {
          transform: translateY(-2px);
          box-shadow: 0 7px 0 var(--lip), 0 12px 18px rgba(17,17,16,0.18);
        }
        /* pressed / selected — the cap travels down onto its lip */
        .sw-card:active .sw-btn {
          transform: translateY(4px);
          box-shadow: 0 1px 0 var(--lip), 0 3px 6px rgba(17,17,16,0.16);
        }
        .sw-card:focus-visible .sw-btn {
          outline: 2px solid rgba(17,17,16,0.6);
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .sw-thumb, .sw-btn { transition: none; }
          .sw-card:hover .sw-thumb, .sw-card:focus-visible .sw-thumb { transform: none; }
          .sw-card:hover .sw-btn, .sw-card:focus-visible .sw-btn,
          .sw-card:active .sw-btn { transform: none; }
        }

        /* Responsive — 2 up on tablet, stacked on mobile */
        @media (max-width: 860px) {
          .sw-grid { grid-template-columns: repeat(2, 1fr); max-width: 560px; }
        }
        @media (max-width: 560px) {
          .sw-grid { grid-template-columns: 1fr; max-width: 360px; gap: 28px; }
        }
      `}</style>
    </RoomFrame>
  )
}
