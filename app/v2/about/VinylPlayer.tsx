'use client'

import { useState } from 'react'

// Vinyl player — pixel-art room object with a desktop-only "Now Playing" overlay.
// The overlay appears on hover/focus (mouse devices only — CSS hover guard prevents
// it on touch). Mobile gets the bare art with no interaction.

export default function VinylPlayer() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="ab-vinyl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="img"
      aria-label="Pixel-art vinyl player"
    >
      <img
        src="/images/about/pixel-art-vinyl-table.png"
        alt=""
        aria-hidden="true"
        className="av-art"
        style={{ aspectRatio: '1536 / 1024' }}
      />

      {/* Now Playing card — desktop hover only (CSS guard below) */}
      <div
        className={`av-nowplaying${hovered ? ' is-visible' : ''}`}
        aria-hidden="true"
      >
        {/* Top row: dot + track info */}
        <div className="av-np-row">
          <span className="av-np-dot" />
          <div className="av-np-text">
            <span className="av-np-label">Now Playing</span>
            <span className="av-np-track">Paradise — Sade</span>
          </div>
        </div>
        {/* Spotify CTA */}
        <a
          className="av-np-spotify"
          href="https://open.spotify.com/track/4tReFKumS5bcFahdXDiM1b?si=4221855a1d55404f"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Listen on Spotify (opens in a new tab)"
        >
          Spotify <span className="av-np-arrow" aria-hidden="true">↗</span>
        </a>
      </div>

      <style>{`
        .ab-vinyl {
          position: absolute;
          left: 1.8%;
          top: 40.8%;
          width: 49%;
          z-index: 1;
          line-height: 0;
          /* No lift/translate on hover — object stays grounded in the room */
        }
        .av-art {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
          user-select: none;
          pointer-events: none;
        }

        /* ── Now Playing card ─────────────────────────────────────────────────
           Floats above the record. Desktop hover/focus only (see media query).
           Uses the room's teal + cream palette. No shadow — stays flat/grounded. */
        .av-nowplaying {
          display: none; /* hidden on mobile and non-hover devices */
          position: absolute;
          bottom: 62%;
          left: 14%;
          flex-direction: column;
          gap: 10px;
          padding: 10px 14px 10px 10px;
          background: #fffefb;
          border: 1.5px solid rgba(121, 175, 182, 0.55);
          border-radius: 10px;
          white-space: nowrap;
          z-index: 2;
          /* Hidden state */
          opacity: 0;
          transform: translateY(4px) scale(0.96);
          transform-origin: bottom left;
          transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .av-nowplaying.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .av-nowplaying { transition: opacity 0.12s ease; transform: none; }
          .av-nowplaying.is-visible { transform: none; }
        }

        /* Top row: dot + track text side by side */
        .av-np-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Pulsing green dot — "record is spinning" indicator */
        .av-np-dot {
          display: block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4caa88;
          flex-shrink: 0;
          animation: avDotPulse 1.8s ease-in-out infinite;
        }
        @keyframes avDotPulse {
          0%, 100% { opacity: 0.55; transform: scale(1);   }
          50%       { opacity: 1;    transform: scale(1.25); }
        }
        @media (prefers-reduced-motion: reduce) {
          .av-np-dot { animation: none; opacity: 1; }
        }

        .av-np-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .av-np-label {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          font-size: 9px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(121, 175, 182, 0.9);
          line-height: 1;
        }
        .av-np-track {
          font-family: var(--font-dm-sans, ui-sans-serif, sans-serif);
          font-size: 12px;
          font-weight: 400;
          color: #1a1a18;
          line-height: 1;
          letter-spacing: -0.01em;
        }

        /* Spotify CTA — sits below the track row, flush left */
        .av-np-spotify {
          display: inline-flex;
          align-items: baseline;
          gap: 3px;
          font-family: var(--font-dm-sans, ui-sans-serif, sans-serif);
          font-size: 11px;
          font-weight: 400;
          color: rgba(17, 17, 16, 0.50);
          text-decoration: none;
          letter-spacing: -0.01em;
          line-height: 1;
          transition: color 0.15s ease, text-decoration-color 0.15s ease;
          text-underline-offset: 2px;
        }
        .av-np-spotify:hover {
          color: rgba(17, 17, 16, 0.88);
          text-decoration: underline;
          text-decoration-color: rgba(17, 17, 16, 0.30);
        }
        .av-np-arrow {
          display: inline-block;
          transition: transform 0.15s ease;
        }
        .av-np-spotify:hover .av-np-arrow {
          transform: translate(1.5px, -1.5px);
        }
        @media (prefers-reduced-motion: reduce) {
          .av-np-spotify { transition: none; }
          .av-np-arrow   { transition: none; }
          .av-np-spotify:hover .av-np-arrow { transform: none; }
        }

        /* Show only on pointer-capable desktop — never on touch */
        @media (hover: hover) and (pointer: fine) {
          .av-nowplaying { display: flex; }
        }

        @media (max-width: 760px) {
          .ab-vinyl {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 200px !important;
          }
          .av-nowplaying { display: none !important; }
        }
      `}</style>
    </div>
  )
}
